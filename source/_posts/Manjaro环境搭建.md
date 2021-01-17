---
title: Manjaro环境搭建
date: 2020-07-12 20:07:22
categories: 踩坑记录
tags: Linux
---

{% noteblock quote cyan %}

Manjaro Linux 安装及开发环境搭建。

{% endnoteblock %}

<!-- more -->

## 系统安装

### 准备

-   安装[Rufus3.1](https://acgfate-dl.oss-cn-shanghai.aliyuncs.com/win-software/rufus-3.1.exe)（镜像写入工具）
-   U 盘
-   Manjaro[镜像](https://manjaro.org/downloads/official/kde/)（KDE）

### 写入镜像

1. 打开 Rufus3.1

2. 选择镜像，配置选项

    - 按照图上配置，对分区类型有疑问请自行百度

    ![](Manjaro%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA/image-20200718100243163.png)

    - 以下部分默认即可

    ![](Manjaro%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA/image-20200718100426743.png)

3. 点击开始，写入镜像

    **务必要使用 DD 模式写入！！！**

### 安装系统

1. 插入 U 盘

2. 修改 BIOS，将 U 盘作为第一启动项

3. 重启电脑

4. 按照提示安装 Manjaro，最后重启电脑

    > 分区：将*/boot/efi*分区（单硬盘）、*/boot*分区挂载至 Windows 的*EFI*（200MB）分区

## 系统配置

### 环境配置

1. 换源

    ```shell
    sudo pacman-mirrors -i -c China -m rank
    sudo nano /etc/pacman.conf
    # 写入以下内容
    [archlinuxcn]
    SigLevel=TrustedOnly
    Server=https://mirrors.tuna.tsinghua.edu.cn/archlinuxcn/$arch
    ```

2. 安装 archlinuxcn-keyring

    ```shell
    sudo pacman -S archlinuxcn-keyring
    ```

3. 更新系统

    ```shell
    sudo pacman -Syyu
    ```

4. 安装 yay、配置清华源

    ```shell
    sudo pacman -S yay
    yay --aururl "https://aur.tuna.tsinghua.edu.cn" --save
    ```

### 安装软件

#### 必需软件

1. Vim

    ```shell
    yay -S vim
    ```

2. 输入法

    ```shell
    sudo pacman -Sy fcitx
    sudo pacman -S fcitx-sunpinyin # 输入法
    sudo pacman -S fcitx-configtool # 配置工具
    ```

    创建`.xprofile`文件

    ```shell
    sudo vim ~/.xprofile
    ```

    写入内容：

    ```shell
    export GTK_IM_MODULE=fcitx
    export QT_IM_MODULE=fcitx
    export XMODIFIERS="@im=fcitx"
    ```

    重启设备

3. oh-my-zsh

    ```shell
    chsh -s /usr/bin/zsh # 修改默认shell
    sh -C "$(wget https://acgfate-dl.oss-cn-shanghai.aliyuncs.com/install.sh -O -)"
    sudo vim ~/.zshrc # 修改配置文件
    ```

    主题：ys

    插件：

    - git
    - zsh-autosuggestions
    - zsh-syntax-highlighting

#### 其他软件

1. V2RAY

    [V2RAY 配置说明](https://github.com/v2ray/manual/blob/master/zh_cn/chapter_00/start.md)

    ```shell
    # 安装
    yay -S v2ray
    # 配置
    sudo vim /etc/v2ray/config.json
    # 启动
    sudo systemctl start v2ray.service
    # 开机自启动
    sudo systemctl enable v2ray.service
    # 关闭
    sudo systemctl stop v2ray.service
    ```

2. Chrome

    ```shell
    yay -S google-chrome
    ```

3. WPS

    ```shell
    yay -S wps-office
    yay -S ttf-wps-fonts
    ```

4. deepin-screenshot

    截图工具

    ```shell
    yay -S deepin-screenshot
    ```

### KDE 美化

-   Plasma Widgets

    -   Active Window Control
    -   Global Menu
    -   Application Dashboard

-   Latte Dock

    ```shell
    yay -S latte-dock
    ```

### 界面展示

![DeepinScreenshot](Manjaro%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA/DeepinScreenshot.png)
