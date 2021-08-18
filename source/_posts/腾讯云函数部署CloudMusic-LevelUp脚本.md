---
title: "腾讯云函数部署CloudMusic-LevelUp脚本"
date: 2021-06-12 19:49:22
---

{% noteblock quote cyan %}

腾讯云函数部署 CloudMusic-LevelUp 脚本具体操作说明。

{% endnoteblock %}

<!-- more -->

## 联系

由于个人精力有限，现创建相关 QQ 群聊来统一解决大家的问题，如有疑问可以申请加群：

![CMLU群二维码](%E8%85%BE%E8%AE%AF%E4%BA%91%E5%87%BD%E6%95%B0%E9%83%A8%E7%BD%B2CloudMusic-LevelUp%E8%84%9A%E6%9C%AC/CMLU%E7%BE%A4%E4%BA%8C%E7%BB%B4%E7%A0%81.png)

## 部署

### 下载仓库

```shell
git clone https://github.com/Secriy/CloudMusic-LevelUp.git
```

### 创建云函数

1. 打开[腾讯云官网](https://cloud.tencent.com/)，登录，在产品中找到云函数入口

2. 进入云函数管理控制台，在函数服务中新建云函数，按图中说明配置基础设置：

   {% gallery %}
   ![figue1](腾讯云函数部署CloudMusic-LevelUp脚本/image-20210612194839032.png)
   {% endgallery %}

3. 将高级配置中的环境配置-内存改为 64MB，执行超时时间改为 900，其他默认不改动，点击创建

### 配置云函数

1. 创建完成后进入函数管理页面，在在线 IDE 中打开一个终端：

   {% gallery %}
   ![image-20210612195607701](腾讯云函数部署CloudMusic-LevelUp脚本/image-20210612195607701.png)
   {% endgallery %}

2. 在终端中执行如下指令安装依赖：

   ```shell
   cd src/ && pip3 install -r requirements.txt -t .
   ```

3. 依赖安装完毕之后可以看到左侧目录项多出了很多文件夹，说明依赖安装成功

4. 修改*index.py*文件，将其中的`infos`变量各值修改为脚本所需参数（参数说明见 README），除账号密码外其余参数可选填，选填的内容需要先取消注释后进行填写，**不需要的参数请不要取消注释！**
   {% gallery %}
   ![image-20210708141358892](%E8%85%BE%E8%AE%AF%E4%BA%91%E5%87%BD%E6%95%B0%E9%83%A8%E7%BD%B2CloudMusic-LevelUp%E8%84%9A%E6%9C%AC/image-20210708141358892.png)
   {% endgallery %}

5. 所有项目修改完成后，点击部署：
   {% gallery %}
   ![image-20210708141601513](%E8%85%BE%E8%AE%AF%E4%BA%91%E5%87%BD%E6%95%B0%E9%83%A8%E7%BD%B2CloudMusic-LevelUp%E8%84%9A%E6%9C%AC/image-20210708141601513.png)
   {% endgallery %}

### 测试

部署成功即可测试，测试时间可能有些长（几分钟），如结果没有问题，可以进行下一步，否则进行错误排查

正常的日志输出如下：

{% gallery %}
![image-20210612200659717](腾讯云函数部署CloudMusic-LevelUp脚本/image-20210612200659717.png)
{% endgallery %}

### 配置触发器

在触发管理-创建触发器中按下图填写（定时任务名称使用默认即可）：

{% gallery %}
![image-20210612201012958](腾讯云函数部署CloudMusic-LevelUp脚本/image-20210612201012958.png)
{% endgallery %}

其中触发周期可以自定义，选择自定义出发周期可以使用 Cron 表达式创建，最后点击提交即可。
