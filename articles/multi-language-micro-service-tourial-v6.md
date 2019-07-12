# 多语言微服务+docker架构应用搭建教程(六)：使用docker compose进行容器编排

> 在前面的教程中，我们一直都有在提到docker容器实例之间的网络通信问题，并采用在运行docker容器时指定网段和ip地址的方式来解决通信问题

> 很明显，这太麻烦了，可能某一次重新运行容器时，我们不小心输入了错误的ip和网段，就要重新进行这些操作了

> docker compose作为一个容器编排工具，可以帮助我们轻松解决这些问题

> 使用docker compose，我们可以做到联通docker容器之间的网络，开启容器多实例，指定容器网段等等。为了让docker compose帮我们做这些，只需要指定一个docker-compose.yml文件就好

> 接下来确保之前教程中的服务注册中心、python服务、python-sidecar服务、python-call服务的工程，在同一个文件夹下。然后按以下步骤进行

* 编写docker-compose.yml文件

> 在这些服务工程共同父文件夹下，新建该文件，写入以下内容:

```
# 指定版本号
version: '3'

# 自定义一个网络
networks:
  # 自定义网络名称
  default:
    # 采用已有的网络，我们在第三篇教程中创建的div-network
    external:
      name: div-network

# 定义服务，服务是一个容器的实例，这里默认一个容器开启单实例
services:
  # 服务注册中心服务，最上面的标签是服务名
  eureka:
    # docker build 的路径，即Dockerfile所在目录
    build: ./eureka-server
    # 指定run时运行的镜像
    image: demo-eureka-server
    # 指定端口映射
    ports:
      - 8080:8080
    # 指定使用的网络
    networks:
       default:
          # 指定使用的地址
          ipv4_address: 192.168.100.2

  demo-python-sidecar:
    build: ./node-sidecar-service-demo
    image: demo-python-sidecar
    ports:
      - 8082:8082
    networks:
      default:
        ipv4_address: 192.168.100.3
    # 链接另一个docker容器，这能保证它们的网络是互通的
    # 因此使用了这个，就不需要上述那样都设置它们在同一个子网里
    links:
      - eureka
      - friendlyhello
    
  friendlyhello:
    build: ./python-demo
    image: friendlyhello
    ports:
      - 4000:4000
    networks:
       default:
          ipv4_address: 192.168.100.4
    links:
      - eureka

  python-call-service:
    build: ./gin-ktor-compose-service
    image: python-call-service
    ports:
      - 8084:8084
    networks:
       default:
          ipv4_address: 192.168.100.5
    links:
      - eureka
      - demo-python-sidecar
      - friendlyhello

```

> 说明: 这里build路径下的工程名称似乎和工程不太相关，这是因为博主直接使用了老的demo工程做的修改，没有新建工程

* 运行使用docker compose统一build镜像

```
docker-compose build
```

> 这将按配置文件中定义的service顺序build

* 创建并运行容器

```
docker-compose up -d
```

> 这将按配置文件中定义的service顺序run

> 你还可以使用以下命令停止容器实例的运行

```
docker-compose stop
```

> 使用以下命令查看容器内的日志输出

```
docker-compose logs
```

> 成功运行之后，打开服务注册中心(localhost:8080)，您应该能看到以下界面

> 请耐心等待，有可能启动会稍慢，还会出现服务注册中心运行成功后，其它服务还未注册进来的情况，请稍加等待

![ZfaUnH.png](https://s2.ax1x.com/2019/07/12/ZfaUnH.png)

> 输入localhost:8084，您应该能看到以下界面

![Zfay38.png](https://s2.ax1x.com/2019/07/12/Zfay38.png)

---

### 最后

> 到此为止，我们构建了一个具有多语言微服务架构的demo，并使用docker进行部署，使用docker-compose进行管理

> 希望博主的这一系列教程，能帮助到广大程序员朋友，提供一种类似需求的解决方案

> 最后，感谢能耐心阅读该系列教程的读者，博主还不够成熟，望各位读者能指出博主的错误，给博主多提一些宝贵的意见
