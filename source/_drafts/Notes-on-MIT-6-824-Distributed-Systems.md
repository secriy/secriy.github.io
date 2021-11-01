---
title: "Notes on MIT 6.824: Distributed Systems"
date: 2021-10-26 20:19:47
urlname: notes-on-mit6.824
categories:
tags:ru
---



## 准备工作

- 课程地址：[6.824: Distributed Systems](https://pdos.csail.mit.edu/6.824/)
- 课程 Schedule：[6.824 Schedule: Spring 2021 (mit.edu)](https://pdos.csail.mit.edu/6.824/schedule.html)
- 系统环境：Linux 5.4.0-81-generic Ubuntu SMP x86_64 GNU/Linux
- 编辑器/IDE：Visual Studio Code
- 编译器：

## 介绍

我们学习的主题是分布式系统（Distributed Systems）。首先，要知道为什么要使用分布式系统，以及它是用来解决什么问题的。下面给出四个使用分布式系统的原因：

- 连接物理上独立的主机

  Connect physically seperated machines

- 通过并行化提升系统的总容量
  Increase capacity via parallelism

- 通过复制提高容错率
  Tolerate faults via replication

- 通过隔离实现安全性
  Achive security via isolation

传统服务架构中，所有用户接受由一台或多台相邻的主机（服务器，Server）提供的服务。在分布式系统中，我们将服务拆分为多个模块，由不同的主机（可能物理位置相差甚远）提供单一的服务，能极大地提高生产效率以及服务表现。例如，将一个大型网站的请求分发、数据库、缓存等使用分布式系统管理，将这些子模块连接起来为用户提供统一的服务。分布式系统为这些独立的机器提供连接共享的机制，让他们能进行协作。另外，归功于多台设备具有的并行性，分布式系统能够方便地进行系统资源扩容，以应对规模更大的使用场景。分布式系统的容错性也十分有优势，可以通过部署备用机器来避免部分服务宕机的情况，当有服务因为某些原因不可用时，备用的服务会被启用。最后，分布式系统提供隔离性，来隔离系统环境，提高整体的安全性。

### 准备工作

```shell
git clone git://g.csail.mit.edu/6.824-golabs-2021 6.824
cd 6.824
```

## MapReduce

MapReduce 用于简化大型集群上的数据处理

