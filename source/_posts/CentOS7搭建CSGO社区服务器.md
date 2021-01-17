---
title: CentOS7搭建CSGO社区服务器
date: 2020-02-21 00:19:08
categories: 踩坑记录
tags: CSGO
---

{% noteblock quote cyan %}
想和很多朋友一起玩 CSGO，苦于本地房间两地延迟太高无法正常游戏，因此用闲置服务器搭建 CSGO 社区服。
{% endnoteblock %}

<!-- more -->

## 准备工作

-   云服务器：个人使用**阿里云学生机（轻量应用服务器）**

    -   开放 UDP 27015 端口

    > 我是 5Mbps 1U1G 的机器，亲测七八个人没问题，十个人应该也可以。

-   Xshell：用于连接服务器，其他同类软件皆可

## 服务端安装

### 环境安装

1. 创建新用户

    ```shell
    useradd -m steam	# 创建名为steam的新用户
    passwd steam		# 为新用户设置密码
    su steam			# 切换到新用户
    cd /home/steam/		# 进入用户目录
    ```

2. 安装 steamcmd

    ```shell
    mkdir steamcmd
    cd steamcmd
    wget https://steamcdn-a.akamaihd.net/client/installer/steamcmd_linux.tar.gz
    tar -zxvf steamcmd_linux.tar.gz
    rm steamcmd_linux.tar.gz
    ```

3. _自行安装 steamcmd 运行依赖项_

4. 运行 steamcmd

    ```shell
    ./steamcmd.sh
    ```

    成功运行会进入下图状态：

    ![](CentOS7搭建CSGO社区服务器/image-20200221004214677.png)

### 安装 CSGO

```sh
login anonymous						# 以匿名身份登录
force_install_dir ./csgo_server		# 设置安装文件夹路径
app_update 740 validate				# 安装CSGO服务端，等待完成
```

出现**Success！**即安装完成，执行`quit`退出

### 一键更新脚本

**该脚本用于 CSGO 服务端的后期更新**

1. 在“/home/steam/steamcmd”下执行以下操作

    ```shell
    vim update.txt
    ```

    写入以下文本，保存并退出

    ```sh
    login anonymous
    force_install_dir ./csgo_server
    app_update 740
    quit
    ```

2. 创建运行脚本

    ```shell
    vim csgo_update.sh
    ```

    写入以下文本，保存并退出

    ```sh
    #!/bin/bash
    ./steamcmd.sh +runscript update.txt
    ```

3. 测试脚本

    ```shell
    ./csgo_update.sh
    ```

## 服务端配置

1.  前往[Steam 游戏服务器帐户管理](https://steamcommunity.com/dev/managegameservers)创建服务器令牌

    ![](CentOS7搭建CSGO社区服务器/image-20200221010525719.png)

2.  在*csgo_server/csgo/cfg*路径下创建配置文件**server.cfg**

3.  写入必要参数

        ```sh
        # 步骤1获取的服务器令牌ID
        sv_setsteamaccount "XXXXXXXXXXXXXXXXXXXXXXXXX"
        # 服务器名
        hostname "wdnmd"
        # 服务器管理密码

    rcon_password "12345678" # 服务器连接密码
    sv_password "23333333"

    ```
    其他参数请根据需要自行修改/添加
    ```

## 服务端启动

1. 安装 screen

    ```shell
    sudo yum install screen
    ```

2. 创建启动脚本

    **使用脚本启动方便修改启动项**

    进入*/home/steam/steamcmd/csgo_server/*路径，新建**run.sh**文件，写入以下形式的文本

    ```shell
    screen ./srcds_run -console -game csgo -usercon -noipx -nomaster
    ```

    > 部分启动项说明：
    >
    > -console 打开游戏控制台
    >
    > -usercon 可以从控制台管理服务器
    >
    > -nomaster 使服务器无法被搜索
    >
    > +map 加载地图
    >
    > +game_mode 游戏模式
    >
    > **如需添加启动项请自行查询**

3. 启动服务器

    ```shell
    ./run.sh
    ```

    ![](CentOS7搭建CSGO社区服务器/image-20200221012223811.png)

    当出现上图显示的文字，服务器启动成功

## 连接服务器

在控制台中输入`connect IP地址;password 连接密码`即可连接
