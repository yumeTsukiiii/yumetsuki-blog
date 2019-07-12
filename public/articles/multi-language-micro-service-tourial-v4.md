# 多语言微服务+docker架构应用搭建教程(四)：连接其它语言的微服务 (Python)

---

### 本节教程将创建一个基于Python Flask的服务，并利用Spring Cloud Sidecar将其注册进服务注册中心

* 编写一个基于Python Flask简单服务

> ps: 该部分代码来源于docker官网

> 新建目录python_demo，在其中新建一个app.py文件，复制粘贴以下代码


```
# coding=utf-8
from flask import Flask, Response
import json
import os
import socket

app = Flask(__name__)


@app.route("/")
def hello():
    html = "<h3>Hello {name}!</h3>" \
           "<b>Hostname:</b> {hostname}<br/>"
    return html.format(name=os.getenv("NAME", "world"), hostname=socket.gethostname())


# 稍后我们将解释这个接口的作用
@app.route("/health")
def health():

    return Response(json.dumps({
        "status": "UP"
    }), mimetype="application/json")


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=80)


```

> 在python_demo目录下，新建requirements.txt文件，复制粘贴以下代码

```
Flask
```

> 在python_demo目录下，新建Dockerfile文件，复制粘贴以下代码

```
# Use an official Python runtime as a parent image
FROM python:2.7-slim

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
RUN pip install --trusted-host pypi.python.org -r requirements.txt

# Make port 4000 available to the world outside this container
EXPOSE 4000

# Define environment variable
# 这个在这里可有可无
ENV NAME World

# Run app.py when the container launches
CMD ["python", "app.py"]
```

> 在python_demo目录下，依次运行下列命令

```
docker build --tag=friendlyhello .

docker run -p 4000:4000 friendlyhello
```

> 此时用浏览器输入localhost:4000，你应该能看到如下响应

![Z29fHO.png](https://s2.ax1x.com/2019/07/11/Z29fHO.png)

* 使用Spring Cloud Sidecar桥接Python服务 (Gradle)

> Spring Cloud Sidecar是Spring Cloud下的一个组件，用于构建多语言的微服务

> 你需要提供给它的，是一个能让它监听到其它服务运行的接口，它需要维持心跳包的连接

> 该接口应该返回下列json字串，并且Content-type为application/json

```
{
    "status": "UP"
}
```

1. 新建一个工程，在组件选择部分，选择 Web > Spring Web Starter

2. 在工程的build.gradle中，写入以下代码

> 读者请根据自己的工程，自行判断需要补充的部分，重点在于plugin、ext、dependencies和dependencyManagement部分

```
plugins {
    id 'org.springframework.boot' version '2.1.6.RELEASE'
    id 'java'
}

apply plugin: 'io.spring.dependency-management'

group = 'com.example'
version = '0.0.1-SNAPSHOT'
sourceCompatibility = '1.8'

repositories {
    mavenCentral()
}

ext {
    set('springCloudVersion', "Greenwich.SR1")
}

dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-web'
    testImplementation 'org.springframework.boot:spring-boot-starter-test'
    implementation 'org.springframework.cloud:spring-cloud-netflix-sidecar'
    implementation 'javax.xml.bind:jaxb-api'
    implementation 'com.sun.xml.bind:jaxb-impl:2.3.0'
    implementation 'org.glassfish.jaxb:jaxb-runtime:2.3.0'
    implementation 'javax.activation:activation:1.1.1'
}

dependencyManagement {
    imports {
        mavenBom "org.springframework.cloud:spring-cloud-dependencies:${springCloudVersion}"
    }
}

```

3. 在启动器类上，补充添加以下注解

```
@EnableSidecar
```

4. 在recourse > application.yaml中，写入以下部分

```
server:
  port: 8082
spring:
  application:
    name: python-sample-service
eureka:
  instance:
    preferIpAddress: true
  client:
    register-with-eureka: true
    fetch-registry: true
    # 服务注册中心地址，注意前篇教程中提到的服务注册中心docker的ip地址
    serviceUrl:
      defaultZone: ${EUREKA_SERVICE_URL:http://192.168.100.2:8080/eureka/}

# 这里是重点
sidecar:
  # 这里的port是服务注册中心用来检索服务时映射到第三方服务的端口号
  port: 4000
  # 其它语言服务的地址。这里用192.168.100.4
  home-page-uri: http://192.168.100.4:${sidecar.port}/
  # 用于sidecar发送心跳包的地址，这里在上述app.py中提供了该接口
  health-uri: http://192.168.100.4:${sidecar.port}/health
  # 这里的ip-address也要指定服务注册中心用来检索服务时映射到第三方服务的ip地址
  ip-address: 192.168.100.4
```

5. 编写Dockerfile

```
FROM openjdk:8-jdk-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY ./build/libs /app

EXPOSE 8082

# Run jar when the container launches
# 注意修改该部分jar名称
CMD java -jar demo-0.0.1-SNAPSHOT.jar
```

6. 打包jar

7. 打包镜像

```
docker build --tag=demo-python-sidecar .
```

* 运行项目

1. 使用docker运行服务注册中心(注意以下--net部分)

```
docker run -p 8080:8080 --net div-network --ip 192.168.100.2 demo-eureka-server
```

2. 使用docker运行python服务。

```
docker run -p 4000:4000 --net div-network --ip 192.168.100.4 friendlyhello
```

3. 使用docker运行Sidecar服务

```
docker run -p 8082:8082 --net div-network --ip 192.168.100.3 demo-python-sidecar
```

> 运行成功后，您将会在服务注册中心看到如下界面

[![Z2Vq7q.png](https://s2.ax1x.com/2019/07/11/Z2Vq7q.png)](https://imgchr.com/i/Z2Vq7q)

> 如果出现sidecar服务状态为down的情况，考虑是sidecar调用python服务的health接口失败，考虑sidecar配置文件中的sidecar属性下的配置

> home-page-uri: http://<python服务docker ip地址>:<python服务docker expose端口号>/

> 或者是 home-page-uri: http://<python服务docker 宿主机ip地址>:<python服务docker 宿主机的映射端口号>/

> health-uri同理

> 如果还是运行不起来，不用着急，在接下来的两篇教程中，会做统一处理