---
title: Git笔记
date: 2019-10-19 18:26:42
categories: 食用笔记
tags: Git
---

{% noteblock quote cyan %}

Git简单使用的笔记。

{% endnoteblock %}

<!-- more -->

#### Git指令

+ git init	#在当前目录创建Git仓库
+ git config --global user.name XXX	#配置用户名
+ git config --global user.email XXX	#配置邮箱
+ git config --list	#查看配置信息
+ git add [path]
+ git add .
+ git commit -m "XXX"
+ git status
+ git log
+ git log --graph
+ git show
+ git reset
+ git reset --hard
+ git push origin
+ git stash
+ git clone/pull
+ git branch
+ git checkout

#### 步骤

+ 创建版本库

  + 选择/创建空目录

  + 使用`git init`创建仓库

    ```shell
  git init
    ```

  + 添加文件到仓库

    ```shell
  git add readme.md
    ```

  + 提交文件
  
    ```shell
  git commit -m "注释"
    ```
    
    