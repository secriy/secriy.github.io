---
title: "TCP 拥塞控制算法"
date: 2021-10-24 20:39:20
urlname: tcp-congestion
categories: 技术讨论
tags:
  - TCP
  - Network
references:
  - title: Linux 4.4.0 内核源码分析——TCP 实现
    url: https://github.com/fzyz999/Analysis_TCP_in_Linux
---

{% noteblock quote cyan %}

本文是对 TCP 拥塞控制机制的深入探讨，以及对几种常用拥塞控制算法的介绍。

{% endnoteblock %}

<!-- more -->

## 拥塞控制

### 拥塞状态机

TCP 通过拥塞控制状态机来决定收到 ACK 后 cwnd（拥塞窗口）的行为。有以下几种状态：

- Open：该状态是常态，当一个 ACK 到达时，发送方比较 cwnd 大小和慢启动阈值，决定进行慢启动或者拥塞避免来增大 cwnd。

- Disorder：发送方检测到 DupACK（重复确认）或者 SACK（选择性确认）时，会变为 Disorder（无序）状态，该状态下 cwnd 不变，只有当一个新数据段到来后才会发送一个新的数据段出去。

- CWR：发送方收到 ACK 包含的 ECN（显式拥塞通知）、ICMP 源端抑制或本地设备的拥塞通知后，进入 CWR（Congestion Window Reduced，拥塞窗口减小）状态。发送方此时并不会立即减小 cwnd，而是每当一个新 ACK 到来就减小一个段，直到窗口减半。CWR 可以被 Recovery 或 Loss 中断。

- Recovery：该状态是恢复状态。

  > 当足够多的连续重复 ACK 到达后，发送方重传第一个没有被确认的段，进入 Recovery 状态。默认情况下，进入 Recovery 状态的条件是三个连续的重复 ACK，TCP 拥塞控制规范也是这么推荐的。在 Recovery 状态期间，拥塞窗口的大小每隔一个新到的确认而减少一个段，和 CWR 状态类似。这个窗口减小过程终止与拥塞窗口大小 等于 ssthresh，即进入 Recovery 状态时，窗口大小的一半。拥塞窗口在恢复期间不增大，发送方重传那些被标记为丢失的段，或者根据包守恒原则在新数据上标记前向传输。发送方保持 Recovery 状态直到所有进入 Recovery 状态时正在发送的数据段都成功地被确认，之后该发送方恢复 OPEN 状态，重传超时有可能中断 Recovery 状态。

- Loss：当一个 RTO 到期后，发送方进入 Loss 状态。所有正在发送的数据段标记为丢失，拥塞窗口设置为一个段，发送方因此以慢启动算法增大拥塞窗口。

![拥塞控制状态机](TCP-%E6%8B%A5%E5%A1%9E%E6%8E%A7%E5%88%B6%E7%AE%97%E6%B3%95/image-20211024213044858.png)

## 拥塞控制算法

在 Linux 环境下，TCP 支持的拥塞控制算法可以通过 `/proc/sys/net/ipv4/tcp_allowed_congestion_control` 文件或 `sysctl` 命令查看：

```shell
cat /proc/sys/net/ipv4/tcp_allowed_congestion_control
# reno cubic bbr

sysctl net.ipv4.tcp_available_congestion_control
# net.ipv4.tcp_available_congestion_control = reno cubic bbr
```

当前使用的拥塞控制算法可通过 `/proc/sys/net/ipv4/tcp_congestion_control` 文件或 `sysctl` 命令查看：

```shell
cat /proc/sys/net/ipv4/tcp_congestion_control
# cubic

sysctl net.ipv4.tcp_congestion_control
# net.ipv4.tcp_congestion_control = cubic
```

测试多个机器和系统后发现，大部分都使用的是 Cubic 拥塞控制算法。每一种拥塞控制算法各有优劣，须知其算法上的差异才能知晓到底该使用哪一种拥塞控制算法，下面对主要的几种拥塞控制算法进行介绍。

首先重温一下需要知道的一些基本概念：

- `ssthresh`（slow start thresh）：慢启动门限值（慢启动阈值）

### Tahoe

Tahoe 是最早的 TCP 拥塞控制算法，它主要有三个步骤：

- 慢启动（Slow Start）
- 拥塞避免（Congestion Avoidance）
- 快重传（Fast Retransmit）

#### 慢启动

慢启动过程中，`cwnd` 从 1 开始，每当发送端收到一个 ACK，`cwnd` 就会加一。因此，只经过一个 RTT，`cwnd` 的大小就会翻倍，是指数级增长的。

#### 拥塞避免

当 `cwnd` 的值大于 `ssthresh` 时，进入拥塞避免阶段，此时 `cwnd` 线性增长，每过一个 RTT（即收到 ACK）其值加一。

#### 快重传

在拥塞避免阶段，不断增长的 `cwnd` 迟早会让网络进入拥塞。Tahoe 算法是基于**丢包则代表拥塞**的假设来实现的，每当收到三个冗余的 ACK（即第四次收到相同确认号的分段确认），就进入快重传阶段，直接将 `ssthresh` 设置为当前 `cwnd` 的一半，然后 `cwnd` 重新置为 1，重新进入慢启动过程。

图示过程如下：

![image-20211024222843488](TCP-%E6%8B%A5%E5%A1%9E%E6%8E%A7%E5%88%B6%E7%AE%97%E6%B3%95/image-20211024222843488.png)

产生超时重传时 Tahoe 的操作与收到三个冗余 ACK 相同。

### Reno

Reno 算法对 Tahoe 算法进行了一定的改进，它主要有四个步骤：

- 慢启动
- 快重传
- 拥塞避免
-

### Cubic

### BBR
