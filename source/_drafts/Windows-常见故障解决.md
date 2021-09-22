---
title: Windows 常见故障解决
date: 2020-03-17 19:04:12
categories: 经验教程
tags: Windows
---

{% noteblock quote cyan %}

Windows 常见故障解决。

{% endnoteblock %}

<!-- more -->

## 系统问题

### 系统软件问题

1. 开始菜单无反应，任务栏假死，且无法联网

   - 解决方法：

     - Powershell 中输入命令：

       ```powershell
       Get-AppxPackage | % { Add-AppxPackage -DisableDevelopmentMode -Register "$($_.InstallLocation)\AppxManifest.xml" -verbose }
       ```

2. 浏览器黑屏
   - 产生原因：更新显卡驱动后缓存异常
   - 解决方法：清理 GPU 缓存
     - Chrome：删除*C:\Users\用户名\AppData\Local\Microsoft\Edge\User Data\ShaderCache\GPUCache*下所有文件
     - Edge：删除*C:\Users\用户名\AppData\Local\Microsoft\Edge\User Data\ShaderCache\GPUCache*下所有文件
