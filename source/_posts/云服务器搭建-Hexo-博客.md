---
title: "云服务器搭建 Hexo 博客"
date: 2020-02-03 17:33:55
urlname: hexo-deploy
categories: 经验教程
tags:
  - Hexo
---

{% noteblock quote cyan %}

一般 Hexo 搭建在 GItHub 上，然而国内访问稍慢，Gitee 免费版又不能自动更新，选择在服务器上搭建也是个办法。不过我觉得很浪费资源，最终还是选择了 GitHub Pages+Gitee Pages 的解决方案。

{% endnoteblock %}

<!-- more -->

## 准备工作

1. 本地端安装配置 Hexo
2. 服务器端安装宝塔面板
3. 服务器端安装 Git、Node.js、npm 等

## 服务器端配置

1. 连接服务器。

2. 执行如下命令：

    ```shell
    useradd git # 创建 git 用户
    passwd git # 输入自定义密码并确认
    chmod 740 /etc/sudoers # 修改文件权限
    ```

3. 编辑 _/etc/sudoers_ 文件，在 `root ALL=(ALL) ALL` 下添加 `git ALL=(ALL) ALL`。

4. 执行如下命令：

    ```shell
    chmod 400 /etc/sudoers    # 改回文件权限
    su git        # 切换至git用户
    sudo mkdir -p /www/wwwroot/blog  # 创建博客目录，自定义修改
    cd /home/git
    mkdir repos
    cd repos
    git init --bare hexo.git   # 创建仓库hexo.git
    cd hexo.git/hooks
    ```

5. 在 _hooks/_ 文件夹下创建 _post-receive_ 文件并编辑（参数对照修改）：

    ```bash
    #!/bin/bash
    git --work-tree=/www/wwwroot/blog --git-dir=/home/git/repos/hexo.git checkout -f
    ```

6. 退出并修改权限：

    ```shell
    chmod +x post-receive
    exit
    chown -R git:git /home/git/repos/hexo.git
    ```

7. 修改 _/www/wwwroot/blog_ 目录权限：

    ```shell
    chown -R git:git /www/wwwroot/blog
    ```

8. 宝塔面板新建网站，添加域名、配置根目录（即 */www/wwwroot/blog*）

## 本地端配置

配置 *\_config.yml* 文件：

1. 打开 Git Bash。

2. 执行 `ssh-copy-id -i C:/Users/[用户名]/.ssh/id_rsa.pub git@[服务器 IP]`。

3. 执行 `ssh git@[服务器 IP]` 测试能否免密远程连接。

4. 修改 deploy 配置（注意空格）：

    ```yaml
    deploy:
    type: git
    repository: git@[服务器 IP]:/home/git/repos/hexo.git
    branch: master
    ```
