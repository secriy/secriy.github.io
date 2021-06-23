---
title: Golang Notes
date: 2021-06-22 19:35:31
categories: 学习笔记
tags:
  - Golang
  - Programming
---

{% noteblock quote cyan %}

本文是对 Golang 基础知识的关键点进行的总结以及常见错误的解释。

{% endnoteblock %}

<!-- more -->

## 注意

### String

1. 字符串底层是只读数组，不允许修改
2. string 与 []byte 类型间的转换是复制，存在不小的损耗
3. `len()`返回的是字符串的字节数，一个中文字符占三字节

### `nil`

1. 不能使用使用`nil`初始化一个未指定类型的变量
2. 不能使用值为`nil`的 Slice 或 Map
3. `nil`只能赋给 func、pointer、chan、interface、map、slice 类型的变量

### Array

1. Golang 中只有值传递，但两个 slice 可能共用一个底层的 Array，修改其一另一个也会发生改变

### Function

1. 数组作为函数参数时为值拷贝
2. map、slice、chan、pointer 同样是值拷贝，但因为其底层采用的是指针的结构，因此在函数内能直接修改实参
