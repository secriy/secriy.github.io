---
title: 云服务器搭建Hexo博客
date: 2020-02-03 17:33:55
categories: 踩坑记录
tags: Hexo
---

{% noteblock quote cyan %}

一般Hexo搭建在GItHub上，然而国内访问稍慢，Gitee免费版又不能自动更新，选择在服务器上搭建也是个办法。不过我觉得很浪费资源，最终还是选择了GitHub Pages+Gitee Pages的解决方案。

{% endnoteblock %}

<!-- more -->

## 准备工作

1. 本地端安装配置Hexo
2. 服务器端安装宝塔面板
3. 服务器端安装Git、Node.js、npm等

## 服务器端配置

- 连接服务器

- 执行：

	```shell
	useradd git
	passwd git #输入自定义密码并确认
	chmod 740 /etc/sudoers #修改文件权限
	```

- 编辑*/etc/sudoers*文件，在**root	 ALL=(ALL)	 ALL**下添加**git	 ALL=(ALL)	 ALL**

- 执行`chmod 400 /etc/sudoers`改回文件权限

- 执行：

	```shell
	su git								#切换至git用户
	sudo mkdir -p /www/wwwroot/blog		#创建博客目录，自定义修改
	cd /home/git
	mkdir repos
	cd repos
	git init --bare hexo.git			#创建仓库hexo.git
	cd hexo.git/hooks
	```

- 在*hooks*文件夹下创建*post-receive*文件并编辑（参数对照修改）：

	```sh
	#!/bin/bash
	git --work-tree=/www/wwwroot/blog --git-dir=/home/git/repos/hexo.git checkout -f
	```

- 退出并修改权限：

	```shell
	chmod +x post-receive
	exit
	chown -R git:git /home/git/repos/hexo.git
	```

- **修改*/www/wwwroot/blog*目录权限**：

	```shell
	chown -R git:git /www/wwwroot/blog
	```

- 宝塔面板新建网站，添加域名、配置根目录（即*/www/wwwroot/blog*）

## 本地端配置

配置*_config.yml*文件：

- 打开Git Bash

- 执行`ssh-copy-id -i C:/Users/用户名/.ssh/id_rsa.pub git@服务器IP`

- 执行`ssh git@服务器ip`测试能否免密远程连接

- 修改deploy配置（注意空格）：

	```yml
	deploy:
		type: git
		repository: git@服务器IP:/home/git/repos/hexo.git
		branch: master
	```



