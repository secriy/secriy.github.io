---
title: Learn Swift
date: 2024-04-28 00:38:08
urlname: learn-swift
categories: 学习笔记
tags:
  - Swift
  - PL
---

{% noteblock quote cyan %}

本文是 Swift 的个人学习笔记，仅适合有编程基础快速上手新语言使用。

{% endnoteblock %}

<!-- more -->

>   写作环境：Swift 5.10

## 语言基础

### Hello World

```swift
print("Hello, world!")
```

注意，Swift 支持在全局作用域下执行代码、不需要添加末尾的 `;`，类似于 Python。

但也支持使用分号，把多行代码压缩到单行，类似 JavaScript：

```swift
var a = 10; print(a)
```

### 注释

单行注释：

```swift
print("hello") // 单行注释
// 单行注释
```

多行注释：

```swift
/* 多行注释
多行注释
多行注释
多行注释 */
```

比较特殊的是，Swift 多行注释支持嵌套：

```swift
/* 多行注释
	/* 嵌套注释 */
多行注释 */
```

支持嵌套的好处是可以注释掉大段已经包含有注释的代码片段。

### 数据类型总览

Swift 为强类型语言，要求赋值、传值时类型必须匹配。

-   基本类型

    -   `Int`，整数

    -   `Double`，浮点数

    -   `Bool`，布尔值

    -   `String`，字符串

-   集合类型（Collection Types）
    -   `Array`，数组
    -   `Set`，集合
    -   `Dictionary`，字典
-   其他类型
    -   `Tuples`，元组，通过一个元组值来组织多个值
    -   `Optionals`，可选值，用于区分数据值的有或无

### 常量&变量

常量定义：

```swift
let constValue = 10 // 使用 let 关键字定义常量，不指定类型会自动推断
// 常量不允许修改
let newConstValue: Double = 10 // 手动指定类型（类型注解，Type Annotation）
```

由于 Swift 为强类型语言，不使用类型注解则需要进行自动推断：

```swift
let a = 10 // 推断为 Int 类型
let b = 0.1 // 推断为 Double 类型
// 浮点数还有 32-bit 的 Float 类型，但 Swift 一定会将浮点数设为 64-bit 的 Double

let c = 10 + 0.1 // 推断为 Double 类型
// 这是根据 10 + 0.1 的值为 10.1 来推断的，取决于后续要提到的计算规则
```

Swift 中常量要求只能**初始化**一次，所以只声明，是可以在 runtime 再初始化常量的：

```swift
let constValue: Int

if isDevelopment {
    constValue = 100
} else {
    constValue = 1000
}
```

变量定义：

```swift
var variableValue = 10 // 使用 var 关键字定义变量
variableValue = 100 // 修改变量值，类型必须匹配
```

单行多变量/常量声明：

```swift
var x = 1, y = 2, z = 3
let a = 1.1, b = 2.2, c = 3.3

// 加上类型注解
var x, y, z: Double
```

变量和常量声明，不得重名。

### 字符串插值

```swift
var name = "X"

print("My name is \(name)") // \() 的语法把 name 变量插入到字符串字面量里
```

## 数据类型

### 整数

整数包括有符号整数、无符号整数。

-   Int8：8-bit 有符号整数
-   Int16：16-bit 有符号整数
-   Int32：32-bit 有符号整数
-   Int64：64-bit 有符号整数
-   UInt8：8-bit 无符号整数
-   UInt16：16-bit 无符号整数
-   UInt32：32-bit 无符号整数
-   UInt64：64-bit 无符号整数
-   Int：取决于平台位数，32 位平台 Int 等同于 Int32，64 位平台则等同于 Int64

-   UInt：取决于平台位数，32 位平台 UInt 等同于 UInt32，64 位平台则等同于 UInt64

整数字面量写法：

-   10 进制无前缀，如 `123456789`
-   2 进制使用 `0b` 前缀，如 `0b10001`
-   8 进制使用 `0o` 前缀，如 `0o23`
-   16 进制使用 `0x` 前缀，如 `0xff`

### 浮点数

-   Double：64-bit 浮点数
-   Float：32-bit 浮点数

浮点数字面量写法，与 C 语言近似：

-   10 进制无前缀，科学计数法使用 `e`
    -   `1.25e2` 即 1.25 x 10²，等于 `125.0`
    -   `1.25e-2` 即 1.25 x 10⁻²，等于 `0.0125`
-   16 进制前缀 `0x`，科学计数法使用 `p`
    -   `0xFp2` 即 15 x 2²，等于 `60.0`
    -   `0xFp-2` 即 15 x 2⁻²，等于 `3.75`

以下写法只用于增强可读性，对程序执行而言并无实际影响：

```swift
let paddedDouble = 000123.456 // 在前面补 0，等同于 123.456
let oneMillion = 1_000_000 // 等同于 1000000
let justOverOneMillion = 1_000_000.000_000_1 // 1000000.0000001
```

### 数值类型转换

## 控制流

## References

-   [The Swift Programming Language (5.10)](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/)
