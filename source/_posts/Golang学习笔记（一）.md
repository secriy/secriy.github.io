---
title: Golang学习笔记（一）
date: 2021-04-17 09:16:22
categories: 学习笔记
tags: Golang
references:
  - name: CGO_ENABLED环境变量对Go静态编译机制的影响
    url: https://johng.cn/cgo-enabled-affect-go-static-compile/
---

{% noteblock quote cyan %}

Golang 学习笔记。

{% endnoteblock %}

<!-- more -->

## 命令行操作

Golang 提供了完整的操作命令，用于管理和操作项目。配置好 Golang 环境后，可以直接输入`Go`命令查看 Golang 提供的所有命令：

| command  | info                                                |
| :------: | :-------------------------------------------------- |
|   bug    | start a bug report                                  |
|  build   | compile packages and dependencies                   |
|  clean   | remove object files and cached files                |
|   doc    | show documentation for package or symbol            |
|   env    | print Go environment information                    |
|   fix    | update packages to use new APIs                     |
|   fmt    | gofmt (reformat) package sources                    |
| generate | generate Go files by processing source              |
|   get    | add dependencies to current module and install them |
| install  | compile and install packages and dependencies       |
|   list   | list packages or modules                            |
|   mod    | module maintenance                                  |
|   run    | compile and run Go program                          |
|   test   | test packages                                       |
|   tool   | run specified go tool                               |
| version  | print Go version                                    |
|   vet    | report likely mistakes in packages                  |

### 命令详解

#### bug

该命令用于提交 Golang 的 bug，执行会打开 Github 上的 Golang 页面，并会添加系统信息。

#### build

该命令用于编译包和依赖，如果是使用了 Go Modules 的项目，编译时会自动根据*go.mod*文件获取依赖包，再进行编译。

##### 普通编译

编译整个目录：

```shell
go build
```

指定输出的文件名：

```shell
go build -o hello.exe
```

指定入口编译：

```shell
go build main.go
```

##### 交叉编译

Golang 支持在很多环境下编译运行，使用`go tool dist list`命令可以查看 Golang 支持的平台：

```shell
$ go tool dist list
aix/ppc64
android/386
android/amd64
android/arm
android/arm64
darwin/amd64
darwin/arm64
dragonfly/amd64
freebsd/386
freebsd/amd64
freebsd/arm
freebsd/arm64
illumos/amd64
ios/amd64
ios/arm64
js/wasm
linux/386
linux/amd64
linux/arm
linux/arm64
linux/mips
linux/mips64
linux/mips64le
linux/mipsle
linux/ppc64
linux/ppc64le
linux/riscv64
linux/s390x
netbsd/386
netbsd/amd64
netbsd/arm
netbsd/arm64
openbsd/386
openbsd/amd64
openbsd/arm
openbsd/arm64
openbsd/mips64
plan9/386
plan9/amd64
plan9/arm
solaris/amd64
windows/386
windows/amd64
windows/arm
```

很多时候需要跨系统环境编译，比如在 Windows 下开发可能需要编译 Linux 可以使用的可执行版本，这时候就需要交叉编译：

1. Windows 下编译

   Windows 下需要使用批处理命令，新建一个*build.bat*文件，填入编译命令执行即可。

   ```shell
   # MacOS
   SET CGO_ENABLED=0
   SET GOOS=darwin
   SET GOARCH=amd64
   go build main.go

   # Linux
   SET CGO_ENABLED=0
   SET GOOS=linux
   SET GOARCH=amd64
   go build main.go
   ```

2. Linux 下编译

   ```shell
   # MacOS
   CGO_ENABLED=0 GOOS=darwin  GOARCH=amd64  go build main.go

   # Windows
   CGO_ENABLED=0 GOOS=windows  GOARCH=amd64  go build main.go
   ```

3. MacOS 下编译

   ```shell
   # Linux
   CGO_ENABLED=0  GOOS=linux  GOARCH=amd64  go build main.go
   # Windows
   CGO_ENABLED=0 GOOS=windows  GOARCH=amd64  go  build  main.go
   ```

###### 参数说明

- CGO_ENABLED：该参数默认为 1，即默认开启 CGO，允许在 Golang 中调用 C 代码，开启之后编译时部分包会使用 C 的实现，因而存在外部依赖（动态链接）。当该参数设置为 0，即禁用 CGO 后，编译时就不会使用 C 实现，从而编译出纯静态的可执行文件
- GOOS：即目标平台
- GOARCH：即目标平台的体系架构

#### clean

#### doc

#### env

#### fix

#### fmt

#### generate

#### get

该命令用于动态获取远程代码包及其所有依赖包，并进行编译安装。默认会将其下载到 GOPATH 下的 src 目录。

#### install

该命令与`go build`类似，区别是`go install`会将编译后的可执行文件放到指定的目录（即**\$GOBIN**文件夹），当**\$GOBIN**环境变量未设置时执行`go install`会报错。

#### list

该命令用于列出包名和模块名

#### mod

该命令用于管理 Golang 的包，自 Go1.11 开始启用，实现 Modules 管理。将环境变量 GO111MODULE 设置为 on 或 auto 打开（未来会删除，默认启用 Go Modules）。

##### 常用操作

1. `go mod init [package name]`：初始化 Go Modules 项目
2. `go mod download [modules name]`：下载指定的模块
3. `go mod tidy`：自动添加缺失的模块并移除未使用的模块

#### run

#### test

#### tool

#### version

#### vet
