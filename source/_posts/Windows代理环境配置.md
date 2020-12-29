---
title: Windows代理环境配置
date: 2020-06-02 13:15:22
categories: 经验技巧
tags: Proxy
---

## 代理软件

- V2Ray

	```
	socks5：127.0.0.1:10808
	http：127.0.0.1:10809
	```


## 配置代理

- git clone（GitHub）

	- HTTP/HTTPS

		*C:\Users\用户名\\.gitconfig*
  
		```
		[http "https://github.com"]
		proxy = socks5://127.0.0.1:10808
		[https "https://github.com"]
		proxy = socks5://127.0.0.1:10808
		```

	- SSH

		*C:\Users\用户名\\.ssh\config*

		```
		Host github.com
			User git
			ProxyCommand connect -S 127.0.0.1:10808 -a none %h %p
		```
	
- npm
	*C:\Users\用户名\\.npmrc*

	```
	proxy=http://localhost:10809
	https-proxy=http://localhost:10809  
	```

- conda

	*C:\Users\用户名\\.condarc*

	```
	ssl_verify: true
	channels:
	  - defaults
	proxy_servers:
	  http: http://127.0.0.1:10809
	  https: https://127.0.0.1:10809
	```

- pip

	*C:\Users\用户名\pip\pip.ini*

	```
	[global]
	proxy = http://127.0.0.1:10809
	```

	