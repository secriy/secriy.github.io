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

## 仓库

> 个人代码工作空间称为工作区

### 初始化和提交

1. 初始化仓库

    ```shell
    cd path_to/  # 切换到指定目录
    git init
    ```

2. 克隆仓库：`git clone <url>`

3. 添加文件到暂存区

    > 空目录和 .gitignore 指定的目录和文件不会添加到暂存区

    ```shell
    git add README.md
    git add . # 所有文件
    ```

4. 提交本次修改

    ```shell
    git commit # 在打开的编辑器中按照 commit 规范填写 commit message，保存并关闭编辑器以生效
    git commit -m "First Commit" # 不建议使用
    ```

5. 查看工作区状态：`git status`

6. 对比提交中文件变化：`git diff <file_name>`

7. 提交日志

    ```shell
    git log      # 详细
    git log --pretty=oneline # 简略
    ```

### 仓库配置

1. 配置全局用户名和邮箱

    ```shell
    git config --global user.name "<user_name>"
    git config --global user.email "<email_address>"
    ```

2. 配置当前仓库用户名和邮箱

    ```shell
    git config user.name "<user_name>"
    git config user.email "<email_address>"
    ```

3. 添加远程仓库：`git remote add <remote-repo> <remote-address>`

### 撤销更改

1. 工作区文件撤销：`git checkout <file_name>`
2. 暂存区文件撤销
    - 暂存区 -> 工作区：`git reset HEAD <file_name>`
    - 撤销修改：`git checkout <file_name>`

### 回退版本

1. 修改上次的提交：`git commit --amend`

    执行后会打开编辑器，可以编辑上一次的提交信息以及修改上一次的提交内容，关闭编辑器以结束修改。

2. 撤销暂存区内容：`git reset HEAD`

    `HEAD` 指向最后一次提交

3. 撤销提交

    - 撤销到指定提交，并撤销暂存区内容

      ```shell
      git reset --mixed HEAD  # 撤销到当前提交
      git reset --mixed HEAD^  # 撤销到上次提交
      git reset --mixed HEAD~n # 撤销到上 n 次提交
      ```

      `HEAD^` 代指 `HEAD` 前一次提交。

    - 撤销到指定提交，并保留暂存区内容

      ```shell
      git reset --soft HEAD^
      ```

      保留的暂存区内容是被撤销的提交中所有的改动。

    - 撤销到指定提交，并撤销暂存区内容，将工作区回滚到指定提交的状态

      ```shell
      git reset --hard HEAD^
      ```

4. 撤销历史某次提交

    ```shell
    git revert <SHA>
    ```

    `<SHA>` 指指定某次提交的散列值。

    撤销后会自动新增一次提交，其内容为撤销指定提交后的内容。

    如果出现冲突会要求处理冲突再进行提交。

### 重做提交

1. 查看历史提交以及被回退的提交（有时限，且只在本地）：`git reflog`
2. 重做某版本：`git reset --hard <commit_id>`

### 删除文件

1. 从版本库中删除文件（修改后需要提交）：`git rm <file_name>`
2. 恢复删除：参考撤销

3. 从版本库中删除文件，但保留本地文件：`git rm --cached <file_name>`

### 重命名

1. 重命名文件：`git mv`
2. 重命名文件夹：`git mv`

### 远程仓库

1. 查看远程仓库信息

    ```shell
    git remote  # 简略
    git remote -v # 详细
    ```

2. 拉取远程仓库内容

    ```shell
    git pull
    ```

    默认获取远程主分支内容，合并到本地主分支。

    `git pull` 实际上是 `git fetch` 和 `git merge` 的组合。

3. 手动拉取
    拉取远程分支：`git fetch`

    合并到本地分支：`git merge <remote>/<branch>`

    示例：`git merge origin/master`

4. 推送

    ```shell
    git push
    git push <remote_repo> <remote_branch>
    ```

## 分支

### 创建和切换

> 默认会创建主干分支，一般为 `master`，由于美国的 _Black Lives Matter_ 运动，master 被视为种族歧视词汇，很多企业和机构改使用 `main` 替代 `master`。

1. 查看所有分支

    ```shell
    git branch  # 查看本地分支，标 * 的分支即当前分支
    git branch -v # 查看本地分支的版本
    git branch -a # 查看所有分支（包括远程分支）
    git branch -av # 查看所有分支的版本（包括远程分支）
    ```

2. 创建新分支：`git branch <branch_name>`

3. 切换到新分支：`git switch <branch_name>`

4. 创建并切换到新分支：`git switch -c <branch_name>`

### 删除分支

1. 删除本地分支

    ```shell
    git branch -D <branch_name>  # 删除未合并分支
    git branch -d <branch_name>  # 删除已合并分支
    ```

2. 删除远程分支：`git push <remote_repo> -d <remote_branch>`

### 合并分支

1. 合并指定分支到当前分支：`git merge <other_branch>`

2. 合并分支、解决冲突

    1. 将要合并的分支更新到最新

    2. 切换到主分支

    3. 合并分支

    4. 解决合并时的 conflict

    5. 提交到版本库

    6. 合并成功

    7. 查看分支状态

        ```shell
        git log --graph
        git log -- graph --pretty=oneline --abbrey-commit
        ```

### 暂存修改

1. 暂存工作现场：`git stash`

2. 恢复工作现场

    ```shell
    git stash apply # 恢复
    git stash drop # 删除
    git stash pop # 恢复 + 删除
    ```
