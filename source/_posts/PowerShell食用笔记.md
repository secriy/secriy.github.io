---
title: PowerShell食用笔记
date: 2020-08-24 02:40:18
categories: 食用笔记
tags: Windows
---

{% noteblock quote cyan %}

PowerShell 的操作。

{% endnoteblock %}

<!-- more -->

## PowerShell 脚本

PowerShel 脚本实际很强大，不过用的人相对来说少了点。平时可以用来执行一系列指令，蛮方便的。

例如 Hexo 的提交，可以在 Hexo 目录创建一个名为*deploy.ps1*的文件，写入如下命令：

```powershell
hexo clean
hexo g
hexo d
```

这样就完成了 Hexo 的提交操作。

另外，每次手动打开 Hexo 目录下的文章很是麻烦，可以在 Hexo 目录下创建名为*edit.ps1*的文件，写入如下命令：

```powershell
typora .\source\_posts
```

这样直接运行脚本就能以 Typora 打开整个文章文件夹，当然**首先要把 Typora 目录加入到 Windows 环境变量中**。

但是这样写有一点不好，当关闭终端的时候，Typora 也会跟着关闭，因为 Typora 是从终端启动的，并会取得程序的输出。另外处于同样的原因，终端不再接受命令执行，只有 Ctrl+C 终止任务，如下图。

![image-20200824025602301](PowerShell食用笔记/image-20200824025602301.png)

然而我连这个步骤都不想干，于是找了个完美的办法——屏蔽输出结果。

修改如下：

```powershell
$null = typora .\source\_posts
```

这样程序执行的输出就不会在终端里显示了，完美解决以上问题。
