# 多语言微服务+docker架构应用搭建教程(五)：使用Spring Cloud Feign进行服务调度

---

### 本节教程将利用Spring Cloud Feign组件创建一个调度注册在服务注册中心的Python服务(实际上是Sidecar服务)

* 新建工程，选择Gradle模版，选择下列组件

> Web > String Web Starter

> Spring Cloud Discovery > Eureka Discovery Client

> Spring Cloud Routing > OpenFeign

* 在启动器类上，添加以下注解

> @EnableFeignClients

* 新建一个PythonService.java 写入以下内容

```
package com.example.demo;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

# 这个注解内的参数为需要调度的服务的名称
@FeignClient("demo-python-sidecar")
public interface PythonService {

    # 该注解表示这个方法对于调用demo-python-sidecar的"/"接口
    @GetMapping("/")
    String home();

}
```

> Spring Cloud Feign允许开发者定义访问服务注册中心内其它服务的接口，上述代码即为最基本的用法

> FeignClient注解用于接口上，告诉接口应该对应哪个服务

> GetMapping为Spring MVC中的注解，这里表示Get方法的"/"接口

* 新建一个DemoController.java 写入以下内容

```
package com.example.demo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class DemoController {

    final PythonService pythonService;

    public DemoController(PythonService pythonService) {
        this.pythonService = pythonService;
    }

    @GetMapping("/")
    Map<String, String> hello() {
        HashMap<String, String> response = new HashMap<>();
        response.put("message", pythonService.home());
        return response;
    }

}
```

> 这里用到了Spring MVC的RestController，用于定义控制器

> 还有关于Spring IoC相关的知识请读者自行学习

* 配置application.yml

```
server:
  port: 8083
spring:
  application:
    name: python-call-service

eureka:
  instance:
    preferIpAddress: true
  client:
    registerWithEureka: true
    fetchRegistry: true
    serviceUrl:
      defaultZone: ${EUREKA_SERVICE_URL:http://192.168.100.2:8080/eureka/}

# 这里的配置表示允许使用ribbon，feign内部其实是通过ribbon实现的服务调度
ribbon:
  eureka:
    enabled: true

```

* 配置Dockerfile

```
# 使用openjdk8作为父镜像
FROM openjdk:8-jdk-alpine

# Set the working directory to /app
# 设置运行时使用的工作目录
WORKDIR /app

# Copy the current directory contents into the container at /app
# 复制libs下的文件到/app目录
COPY ./build/libs /app

# Make port 8083 available to the world outside this container
# 暴露8083端口。
EXPOSE 8083

# Run jar when the container launches
# 设置容器运行时的指令，注意jar的名称
CMD java -jar demo-0.0.1-SNAPSHOT.jar
```

* 打包jar

* 打包镜像，运行以下命令

```
docker build --tag=python-call-service .
```

* 运行

```
docker run -p 8083:8083 --net div-network --ip 192.168.100.5 python-call-service
```

> 接下来最后一篇教程中，我们将使用docker-compose来管理这些docker，而不是每次运行都去指定它们的网段和ip