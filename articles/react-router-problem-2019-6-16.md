# 关于react-router和githubpage一起使用的坑

## 昨天在部署博客到githubpage时遇到很多问题，当然要包括下面的了

* homepage问题

> 这个问题很快就解决了，主要是homepage指向的路径为"/"，这将导致资源访问不正确(和标题好像没什么关系)

* react-router的basename问题

> 不得不说百度搜索真好(laji), 这个问题到google搜索才搜出来，react-router的"/"路由会使得当前路由是基于"domain"的, 默认的basename就是domain。

> 但在githubpage部署时，其地址为"domain/repo-name", react-router会认为其不匹配"/"路由。相应地这样所有的文件访问也必须在前面加上"public_url", 否则就会因为"repo-name"这一级路由的坑而访问不到。