---
title: Android开发学习
date: 2021-01-18 21:27:14
categories: 学习笔记
tags: Android
---

{% noteblock quote cyan %}

基于 Android Studio 的 Android 开发学习笔记。

{% endnoteblock %}

<!-- more -->

## 环境准备

个人使用 Android Studio 进行学习和实际开发，优点是有着不错的可视化界面以及强大的代码提示和方便的编译-运行过程。

官网下载：[Android Studio](https://developer.android.com/studio)

另外需要有 JDK 和 JRE，Android SDK 等开发工具可以在 Android Studio 里进行下载（需要科学上网）。

配置好 SDK,然后进行下一步的示例项目编写。

## 示例项目

### 新建项目

新建一个 Project，模板选择 Empty Activity，接着填写基本信息：

![Create New Project](Android%E5%BC%80%E5%8F%91%E5%AD%A6%E4%B9%A0/image-20210118215350109.png)

其中，Name 是项目名；Package Name 是包名；Save Location 为项目路径；Language 是编程语言，可以选择 Java 和 Kotlin；Minimum SDK 指的是选择能最低兼容的 SDK 版本，这里我选择 API23 即最低兼容 Android6.0，如图所示目前可以运行在约 84.9%的机器上。

### 运行项目

当前使用 Empty Activity 模板已经有了一个简单的空白页面，先尝试运行一下。

有两种运行方式——模拟器运行和实机运行，其中模拟器运行无论是什么系统都能兼容，在 IDE 右上方的选项框内可以选择模拟器机型，请按需求选择，然后按绿色启动键即可运行。实机运行需要一部安卓手机，用数据线连接安卓手机和电脑，并开启手机上的**开发者选项-USB 调试**，这时会在设备选项框里看到自己的机型，选择后点击运行即可。

### 修改项目

这个项目模板是空白的，并不能对理解基本的 Android 开发有帮助，因此我们需要简单修改一下。

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

其中 manifests 是清单文件目录，在 Android 系统启动应用组件之前，系统必须通过读取应用的清单文件 (_AndroidManifest.xml_) 确认组件存在。主要任务是告知系统应用组件的相关信息。

java 目录则是程序的逻辑代码目录，所有程序内的功能都由此实现。以上的**MainActivity**类继承自**AppCompatActivity**类，关于 Activity 后续再详细解释，它代表带有用户界面的单个屏幕。

res 目录存放各种静态资源，如字符串、位图、布局文件等。其中 layout 目录就放有 xml 格式的布局文件，每个 xml 文件对应一个 Activity，用于按特定布局展示各个应用组件。

双击 layout 目录下 MainActivity 的布局文件，即可进入可视化编辑（在右侧的 Code/Split/Design 选项卡切换）。
