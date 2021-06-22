---
title: Golang学习之Testing
date: 2021-06-08 19:53:27
categories: 学习笔记
tags:
  - Golang
  - Programming
---

{% noteblock quote cyan %}

有关 Golang 中 Unit Testing 和 Benchmark 的学习。

{% endnoteblock %}

<!-- more -->

## Testing

Golang 拥有一个轻量级的测试框架，主要由`go test`命令和`testing`包组成。

### Quickly Usage

1. 在 go 源码文件同级目录下新建 go 文件`xxx_test.go`
2. 编写测试函数，以**Test**开头，接收`*testing.T`参数
3. 使用`go test`命令测试

编写程序：

```go
// hello.go
package hello

import "fmt"

func Hello() {
    fmt.Println("Hello World!")
}
```

编写测试程序：

```go
// hello_test.go
package hello

import "testing"

func TestHello(t *testing.T) {
    Hello()
}
```

执行测试：

```go
go test -v
```

```
=== RUN   TestHello
Hello World!
--- PASS: TestHello (0.00s)
PASS
ok      hello   0.026s
```
