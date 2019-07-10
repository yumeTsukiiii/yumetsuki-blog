# 多语言微服务+docker架构应用搭建教程(二)：创建服务注册中心 (Java)
---
### 1. 描述

> 所谓微服务，就是一个小到难以再分割的服务单元，它只提供一个功能，或者提供一组相关的功能。
> 由微服务架构构建起来的系统相对于单体应用架构构建构建起来的系统，它显得更加灵活和易于扩展。
> 当系统需要添加新的功能时，可以不用改变原先的应用架构，只需要往系统中添加新的微服务即可。
> 当新的微服务添加进来后，需要改变的，仅仅只是微服务之间的组合关系，而不需要对整个系统大动干戈。

> 但这也产生了一个新的问题，微服务之间如何联系起来？

> 服务注册中心是一个很好的解决方案，服务注册中心作为一个基本的微服务，将其它微服务的实例，记录进其维护的服务注册表当中。
> 当一个微服务需要调度另一个微服务时，它只需要从服务注册表中去寻找到它即可。

> ps: 以上描述仅仅是简单的概述，便于读者理解服务注册中心的基本职责，不代表它的实际定义和作用。


### 2. 使用Spring Cloud创建一个服务注册中心 (使用Gradle)

> 该部分将介绍如何使用Spring Cloud框架中的Eureka Server创建服务注册中心

* 使用IDEA新建工程，选择Spring Cloud中对应的Eureka Server组件 

[![ZgeTHI.png](https://s2.ax1x.com/2019/07/10/ZgeTHI.png)](https://imgchr.com/i/ZgeTHI)

> ps：前面的步骤参考多语言微服务+docker架构应用搭建教程(一)：环境搭建

* 找到项目中的启动主入口 src > main > com > ... > xxxApplication.java

> 为该类添加@EnableEurekaServer注解，该注解能使它成为服务注册中心

[![ZgmDG8.png](https://s2.ax1x.com/2019/07/10/ZgmDG8.png)](https://imgchr.com/i/ZgmDG8)

* 配置application.yml 在 resource目录下

```
# 指定服务注册中心运行的端口号
server:
  port: 8080

eureka:
  # 指定服务注册中心的ip地址
  instance:
    hostname: localhost
  client:
    # 该属性为false则表示它不向服务注册中心注册自己
    registerWithEureka: false
    # 该属性为false则表示它不会检索其它服务
    fetchRegistry: false
    # 该属性指定服务注册中心的运行url地址
    serviceUrl:
      defaultZone: http://${eureka.instance.hostname}:${server.port}/eureka/
```

> ps：工程构建时生成的文件可能是application.properties，将其后缀改为yml，如果您更属性properties格式文件的写法，您也可以对上述配置稍作改动

* 运行服务注册中心

> 直接使用IDEA运行该项目，访问http://localhost:8080
> 您将会得到以下页面

[![ZguVB9.png](https://s2.ax1x.com/2019/07/10/ZguVB9.png)](https://imgchr.com/i/ZguVB9)

> 这表示服务注册中心已经成功运行了，其中Application条目，包含了注册进服务注册中心的服务实例

* 打包应用(以Gradle为例)

1. 在IDEA右侧栏中，选择Gradle > Tasks > build > clean，双击运行clean任务
2. 随后，选择Gradle > Tasks > build > build，双击运行build任务
3. 在工程目录下的 build > libs 中，可以发现打包好的jar包
4. 使用java -jar build/libs/*.jar 运行jar包，测试是否能运行

[![ZgKCVA.png](https://s2.ax1x.com/2019/07/10/ZgKCVA.png)](https://imgchr.com/i/ZgKCVA)

* 使用docker部署应用

> 关于docker在这里不在进行多余的描述，它能简化生产环境的配置，将应用打包成镜像，在任何安装了docker上的机器上运行

1. 配置Dockerfile

> 在工程的根目录下，新建Dockerfile文件，写入以下内容

```
# Use an official Python runtime as a parent image
# 使用openjdk8作为父镜像
FROM openjdk:8-jdk-alpine

# Set the working directory to /app
# 设置运行时使用的工作目录
WORKDIR /app

# Copy the current directory contents into the container at /app
# 复制libs下的文件到/app目录
COPY ./build/libs /app

# Make port 8080 available to the world outside this container
# 暴露8080端口，我们的服务注册中心是在8080端口运行的
EXPOSE 8080

# Define environment variable
# 配置环境变量(这里可有可无)
ENV NAME eureka-server-docker

# Run jar when the container launches
# 设置容器运行时的指令，这里的jar包是自己构建出来的jar包名称
CMD java -jar demo-0.0.1-SNAPSHOT.jar
```

2. 构建docker镜像

> 使用以下命令构建docker镜像(别漏了最后一个.表示当前目录)

```
docker build --tag=demo-eureka-server .
```

3. 使用docker images命令查看是否构建成功

> 构建成功后您应该能看到以下提示

[![ZgMVF1.png](https://s2.ax1x.com/2019/07/10/ZgMVF1.png)](https://imgchr.com/i/ZgMVF1)

4. 创建并运行容器

> 使用以下命令创建并运行容器，将docker 8080端口(后者)映射到主机8080端口(前者)

```
docker run -p 8080:8080 demo-eureka-server
```

> 您还可以使用以下命令查看容器状态

```
docker container ps
```

[![ZgQzKU.png](https://s2.ax1x.com/2019/07/10/ZgQzKU.png)](https://imgchr.com/i/ZgQzKU)

> 您还可以使用以下命令停止运行容器

```
docker stop <container id>
```

* 一个使用@EnableEurekaServer后启动失败的问题

> 启动失败时控制台可能打印了类似以下的错误

[![Zg1DTH.png](https://s2.ax1x.com/2019/07/10/Zg1DTH.png)](https://imgchr.com/i/Zg1DTH)

> 这很有可能是由于您使用了jdk9或jdk9以上，它默认不加载其中的Spring Cloud需要的java中必要的模块

> 最简单的解决方案是手动导入这些包，在build.gradle中加入下列依赖

```
    implementation 'javax.xml.bind:jaxb-api'
    implementation 'com.sun.xml.bind:jaxb-impl:2.3.0'
    implementation 'org.glassfish.jaxb:jaxb-runtime:2.3.0'
    implementation 'javax.activation:activation:1.1.1'
```

---

> 如有疑问请到博主的github博客源码项目中提出issue


