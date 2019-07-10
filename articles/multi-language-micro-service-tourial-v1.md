# 多语言微服务+docker架构应用搭建教程（一）
### 环境搭建
---
#### 1. docker环境搭建
> 以下安装方式基于CentOS，如有疑问请参考Docker官网[Docker官网](https://docs.docker.com/install/linux/docker-ce/centos/)
* 确保你的机器上下载并安装了yum
> CentOS系统上应该是有的，如果没有，请参见各路百度大神以及yum官网安装yum，可参考[某技术博客](https://www.cnblogs.com/jukaiit/p/8877975.html)
* 卸载机器上可能存在的老版本docker
```
sudo yum remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-engine
```
* 安装必要的包
```
sudo yum install -y yum-utils \
  device-mapper-persistent-data \
  lvm2
```

* 配置下载docker的源repository
```
sudo yum-config-manager \
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo
```
> 官网提供的repo地址很有可能挂掉，因为国内墙过高的问题，可以将repo地址换成阿里云提供的镜像地址
> http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
> 若该地址不可用，请自行百度搜索其它镜像地址

* 安装docker最新版
```
sudo yum install docker-ce docker-ce-cli containerd.io
```
> 若需要安装特定版本的docker请参照上述docker官网

* 启动docker
```
sudo systemctl start docker
```

* 测试
```
sudo docker --version
```
> 使用该命令测试docker是否安装成功

* 关于docker pull过慢问题
> 这依然是国内墙太高导致的，需要修改docker pull的源地址
> linux系统下，在默认的/etc/docker/daemon.json文件中，添加以下内容
```
{ 
  "registry-mirrors": ["https://docker.mirrors.ustc.edu.cn"] 
)
```
> 如果没有该文件，请尝试寻找它，也可以尝试在该目录下新建该文件
> 如果该镜像地址仍然太慢，请尝试百度寻找新的镜像地址

#### 2. Spring Cloud环境搭建
> 以下环境搭建方法使用IntelliJ IDEA Ultimate，请确保您能够使用它(学生可使用学生邮箱到jetbrains官网申请免费使用
* 安装Spring Initializr插件
> 当你使用File > New > Project时，您应当看到以下内容 

[![ZgPsvq.md.png](https://s2.ax1x.com/2019/07/10/ZgPsvq.md.png)](https://imgchr.com/i/ZgPsvq)

> 如果没有发现Spring Initializr，请前往路径 File > Settings > Plugin (windows) / IDEA > Preferences > Plugin (macOS) 搜索Spring Boot插件下载并重启IDEA

* 完成上一步后，点击next，如下图所示，重点在于Type的选择，通常选择第一个或者第三个

[![ZgFEm6.png](https://s2.ax1x.com/2019/07/10/ZgFEm6.png)](https://imgchr.com/i/ZgFEm6)

* 继续，点击next，选择需要的Spring组件，这个具体项目有关

[![ZgFQ1A.png](https://s2.ax1x.com/2019/07/10/ZgFQ1A.png)](https://imgchr.com/i/ZgFQ1A)

* 继续，点击next，填写工程目录和名称，最后finish即可。

* 关于初始化项目失败，出现时间过长或者http proxy的问题。
> 出现该问题通常都是国内墙太高的原因，maven或者gradle的源repository下载速率太慢，修改maven或者gradle源repo为阿里云镜像即可

> 具体可参照该技术文章 [maven和gradle全局修改镜像/gradle局部工程修改镜像](https://blog.csdn.net/superbeyone/article/details/86063787)
