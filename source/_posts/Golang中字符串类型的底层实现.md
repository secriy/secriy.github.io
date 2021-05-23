---
title: Golang中字符串类型的底层实现
date: 2021-04-14 01:19:27
categories: 学习笔记
tags:
  - Golang
  - Programming
---

{% noteblock quote cyan %}
字符串是 Golang 中一种基本数据类型，同样也是绝大多数编程语言重要的一种基本数据类型，其基本特性是底层只读存储不可变。
{% endnoteblock %}

<!-- more -->

## 存储

编写一段代码，声明并初始化字符串变量`a`，值为`golang`，输出该变量的值。

```go
package main

import (
	"fmt"
)

func main() {
	var a = "golang"
	fmt.Println(a)
}
```

使用**compile**工具将源码编译成汇编程序，可以看到刚刚定义的字符串变量的值：

```assembly
go.string."golang" SRODATA dupok size=6
        0x0000 67 6f 6c 61 6e 67
```

其中，`SRODATA`标记表示数据是只读的，因此其被分配的内存空间同样是只读的。由于字符串的只读特性，所有对于字符串的写操作都是通过拷贝实现的。

## 数据结构

字符串包含两部分，指向字符串存储位置开头的指针以及字符串的长度。在 C 语言中，为了确定字符串的结束位置，会自动在字符串末尾添加`\0`，而 Golang 采用存储字符串长度的方法确定字符串的末尾。

```go
type StringHeader struct {
	Data uintptr
	Len  int
}
```

## 字符串操作

### 截取

截取是对字符串的部分读取，无需创建字符串拷贝：

```go
fmt.Println(s1[4])
fmt.Println(s1[1:2])
fmt.Println(s1[:])
```

### 复制

```go
package main

import (
	"fmt"
)

func main() {
	var a = "golang"
	var b = a[:]
	fmt.Println(&a)	\\ 0xc00003e240
	fmt.Println(&b)	\\ 0xc00003e250
}
```

### 拼接

字符串拼接操作会调用`runtime.concatstrings`，先遍历传入的切片，过滤空字符串后计算拼接之后的字符串长度。
