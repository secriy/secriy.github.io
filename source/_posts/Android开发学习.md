---
title: Android开发学习
date: 2021-01-18 21:27:14
categories: 学习笔记
tags: Android
---

{% noteblock quote cyan %}

基于Android Studio 的 Android 开发学习笔记。

{% endnoteblock %}

<!-- more -->

## 环境准备

个人使用 Android Studio 进行学习和实际开发，优点是有着不错的可视化界面以及强大的代码提示和方便的编译-运行过程。

官网下载：[Android Studio](https://developer.android.com/studio)

另外需要有JDK和JRE，Android SDK等开发工具可以在Android Studio里进行下载（需要科学上网）。

配置好SDK,然后进行下一步的示例项目编写。

## 示例项目

### 新建项目

新建一个Project，模板选择Empty Activity，接着填写基本信息：

![Create New Project](/home/Secriy/Working/Hexo/source/_posts/Android开发学习/image-20210118215350109.png)

其中，Name是项目名；Package Name是包名；Save Location为项目路径；Language是编程语言，可以选择Java和Kotlin；Minimum SDK指的是选择能最低兼容的SDK版本，这里我选择API23即最低兼容Android6.0，如图所示目前可以运行在约84.9%的机器上。

### 运行项目

当前使用Empty Activity模板已经有了一个简单的空白页面，先尝试运行一下。

有两种运行方式——模拟器运行和实机运行，其中模拟器运行无论是什么系统都能兼容，在IDE右上方的选项框内可以选择模拟器机型，请按需求选择，然后按绿色启动键即可运行。实机运行需要一部安卓手机，用数据线连接安卓手机和电脑，并开启手机上的**开发者选项-USB调试**，这时会在设备选项框里看到自己的机型，选择后点击运行即可。

### 修改项目

这个项目模板是空白的，并不能对理解基本的Android开发有帮助，因此我们需要简单修改一下。

首先看下项目结构（重点看以下路径）：

- manifests
	- AndroidManifest.xml
- java
	- com.packagename
		- MainActivity
- res
	- drawable
	- layout
	- mipmap
	- values

其中manifests是清单文件目录，在 Android 系统启动应用组件之前，系统必须通过读取应用的清单文件 (*AndroidManifest.xml*) 确认组件存在。主要任务是告知系统应用组件的相关信息。

java目录则是程序的逻辑代码目录，所有程序内的功能都由此实现。以上的**MainActivity**类继承自**AppCompatActivity**类，关于Activity后续再详细解释，它代表带有用户界面的单个屏幕。

res目录存放各种静态资源，如字符串、位图、布局文件等。其中layout目录就放有xml格式的布局文件，每个xml文件对应一个Activity，用于按特定布局展示各个应用组件。

双击layout目录下MainActivity的布局文件，即可进入可视化编辑（在右侧的Code/Split/Design选项卡切换）。



