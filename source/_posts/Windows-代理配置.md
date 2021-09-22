---
title: "Windows 代理配置"
date: 2020-06-02 13:15:22
categories: 经验教程
tags:
  - Proxy
  - Network
---

{% noteblock quote cyan %}

Windows 下代理环境配置。

{% endnoteblock %}

<!-- more -->

## 代理软件

- V2Ray

  ```
  socks5：127.0.0.1:10808
  http：127.0.0.1:10809
  ```

- Clash

## 配置代理

- git clone（GitHub）

  - HTTP/HTTPS

    _C:\Users\用户名\\.gitconfig_

    ```
    [http "https://github.com"]
    proxy = socks5://127.0.0.1:10808
    [https "https://github.com"]
    proxy = socks5://127.0.0.1:10808
    ```

  - SSH

    _C:\Users\用户名\\.ssh\config_

    ```
    Host github.com
    	User git
    	ProxyCommand connect -S 127.0.0.1:10808 -a none %h %p
    ```

- npm
  _C:\Users\用户名\\.npmrc_

  ```
  proxy=http://localhost:10809
  https-proxy=http://localhost:10809
  ```

- conda

  _C:\Users\用户名\\.condarc_

  ```
  ssl_verify: true
  channels:
    - defaults
  proxy_servers:
    http: http://127.0.0.1:10809
    https: https://127.0.0.1:10809
  ```

- pip

  _C:\Users\用户名\pip\pip.ini_

  ```
  [global]
  proxy = http://127.0.0.1:10809
  ```
