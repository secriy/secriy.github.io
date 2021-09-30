---
title: "Git 笔记"
date: 2019-10-19 18:26:42
urlname: git-note
categories: 操作手册
tags:
  - Git
---

{% noteblock quote cyan %}

Git 常用操作笔记。

{% endnoteblock %}

<!-- more -->

## 命令行

### 可选参数

- `--version`
- `--help`
- `-C <path>`
- `-c <name>=<value>`
- `--exec-path[=<path>]`
- `--html-path`
- `--man-path`
- `--info-path`
- `-p | --paginate | -P | --no-pager`
- `--no-replace-objects`
- `--bare`
- `--git-dir=<path>`
- `--work-tree=<path>`
- `--namespace=<name>`
- `--super-prefix=<path>`
- `--config-env=<name>=<envvar>`

### 命令

#### 初始化

- clone
- init

#### 最近的改动

- add
- mv
- restore
- rm
- sparse-checkout

#### 检查历史和状态

- bisect
- diff
- grep
- log
- show
- status

#### 分支与提交

- branch
- commit
- merge
- rebase
- reset
- switch
- tag

#### 多人协同

- fetch
- pull
- push

## 操作

> 个人代码工作空间称为工作区

### 初始化和提交

1.  初始化仓库

    ```shell
    git init
    ```

2.  添加文件到暂存区

    ```shell
    git add README.md
    ```

3.  提交本次修改

    ```shell
    git commit -m "First Commit"
    ```

### 提交到远程仓库

1.  添加远程仓库

    ```shell
    git remote add origin <remote-address>
    ```

    `origin`作为远程仓库名，可自定义。

2.  提交远程仓库

    ```shell
    git push origin master
    ```

### 回退版本

1.  修改上次的提交

    ```shell
    git commit --amend
    ```

    执行后会打开编辑器，可以编辑上一次的提交信息以及修改上一次的提交内容，关闭编辑器以结束修改。

2.  撤销暂存区内容

    ```shell
    git reset HEAD
    ```

    `HEAD`指向最后一次提交

3.  撤销提交

    - 撤销到指定提交，并撤销暂存区内容

      ```shell
      git reset --mixed HEAD^
      ```

      `HEAD^`代指`HEAD`前一次提交。

    - 撤销到指定提交，并保留暂存区内容

      ```shell
      git reset --soft HEAD^
      ```

      保留的暂存区内容是被撤销的提交中所有的改动。

    - 撤销到指定提交，并撤销暂存区内容，将工作区回滚到指定提交的状态

      ```shell
      git reset --hard HEAD^
      ```

4.  撤销历史某次提交

    ```shell
    git revert <SHA>
    ```

    `<SHA>`指指定某次提交的散列值。

    撤销后会自动新增一次提交，其内容为撤销指定提交后的内容。

    如果出现冲突会要求处理冲突再进行提交。

### 分支

默认会创建主干分支，一般为`master`，由于美国*Black Lives Matter*运动，很多企业和机构改为使用`main`。

1.  查看所有分支

    ```shell
    git branch
    ```

    标`*`的分支即当前分支。

    查看所有分支的版本：

    ```shell
    git branch -v
    ```

2.  创建新分支

    ```shell
    git branch <name>
    ```

3.  切换到新分支

    ```shell
    git switch <name>
    ```

    创建并切换到新分支：

    ```shell
    git switch -c <name>
    ```

4.  合并指定分支到当前分支

    ```shell
    git merge <name>
    ```

### 远程仓库

1.  拉取远程仓库内容

    ```shell
    git pull
    ```

    默认获取远程主分支内容，合并到本地主分支。

    `git pull`实际上是`git fetch`和`git merge`的组合。

2.  手动拉取
    拉取远程分支：

    ```shell
    git fetch
    ```

    合并到本地分支：

    ```shell
    git merge <remote>/<branch>
    ```

    示例：

    ```shell
    git merge origin/master
    ```
