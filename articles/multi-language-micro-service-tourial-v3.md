# 多语言微服务+docker架构应用搭建教程(三)：创建基于Spring Cloud的其它微服务 (Java)
---
### 按照以下步骤，构建一个简单的Spring Cloud微服务，并将其注册进服务注册中心

* 新建工程，选择相应构件

> 这里您至少需要以下两个构件

1. Web > Spring Web Starter 
2. Spring Cloud Discovery > Eureka Discovery Client

* 增加注解

> 在应用启动类中，至少@EnableEurekaClient和@EnableDiscoveryClient两个注解

[![Zg8NqO.png](https://s2.ax1x.com/2019/07/10/Zg8NqO.png)](https://imgchr.com/i/Zg8NqO)

* 添加Controller

> ps: 该部分为Spring MVC的知识，如对注解有疑问请读者自行学习

[![Zg87Q0.png](https://s2.ax1x.com/2019/07/10/Zg87Q0.png)](https://imgchr.com/i/Zg87Q0)

* 配置application.yml

```
# 指定运行在8083端口
server:
  port: 8083
spring:
  application:
    # 指定服务名称  
    name: demo-service

eureka:
  instance:
    # 使用ip地址代替hostname
    preferIpAddress: true
  client:
    # 允许向服务注册中心注册自己
    registerWithEureka: true
    # 允许通过服务注册中心发现其它服务
    fetchRegistry: true
    # 服务注册中心地址
    serviceUrl:
      # 这里使用localhost可能会产生问题，稍后做解答
      defaultZone: ${EUREKA_SERVICE_URL:http://localhost:8080/eureka/}
```

* 打包应用(参照第二篇教程)

* 使用Dockerfile构建镜像

```
docker build --tag=demo-service .
```

* 运行服务注册中心(使用docker运行)

```
docker run -p 8080:8080 demo-eureka-server
```

* 运行demo应用

```
docker run -p 8083:8083 demo-service
```

* 查看结果

> 若demo-service出现在了eureka-server的注册表中，则说明运行成功，应如以下界面显示

![ZgYERA.png](https://s2.ax1x.com/2019/07/10/ZgYERA.png)

* 实际情况

> 实际按照如上配置demo-service运行应当会报错，提示找不到服务注册中心

> 这是因为其运行在docker容器内，容器内的ip是随机分配的，因此localhost也就是随机的

> 这样就导致了，demo-service中的localhost并不等于服务注册中心所在地址

> 可以使用如下命令查看容器ip地址，得知服务注册中心ip地址后，修改demo-service > application.yml中的服务注册中心ip地址即可

```
docker inspect <container id>
```

> 但这样每次重启服务注册中心，都要修改其它所有服务的配置，这样是不现实的(当然您也可以考虑使用Spring CloudConfig Server，它会让您觉得这种方式好受点)

> 因此在运行服务注册中心时，可以固定容器的ip地址。详情参考该篇文章 (https://www.cnblogs.com/milton/p/9858955.html)

> 其它注册进服务注册中心的微服务，将中心ip地址配置为服务注册中心固定的ip地址即可。

> 你还可以使用docker-compose或者kubernetes这样的容器编排工具来连接docker容器和分配ip

> 本文后续会使用到docker-compose

> 在那之前，我们稍微修改下运行服务注册中心的方法

> 首先，使用以下命令创建子网

```
docker network create --subnet=192.168.100.0/24 div-network
```

> 运行服务注册中心，这里不用192.168.100.1作为ip的原因是，这个地址是默认的网关地址

```
docker run -p 8080:8080 --net div-network --ip 192.168.100.2 demo-eureka-server
```

> 运行该Java服务，也要指定运行在div-network下，因为docker容器之间具有网络隔离，其中一种解决方案是让它们都在同一个子网下

```
docker run -p 8083:8083 --net div-network --ip 192.168.100.3 demo-service
```

> 注意，本篇教程的代码不包含在博主github工程中，因此请不要和以下教程中的服务一起运行，可能会导致端口号和ip地址冲突



