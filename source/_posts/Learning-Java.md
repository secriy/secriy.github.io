---
title: Learning Java
date: 2023-11-28 19:36:54
urlname: learning-java
categories: 学习笔记
tags:
  - Java
  - PL
---

{% noteblock quote cyan %}

Java 个人学习笔记。

{% endnoteblock %}

<!-- more -->

> 写作环境：`javac 17.0.9`

## 数据类型

Java 有两种数据类型：

-   原始类型（primitive types）：数据的原始值
-   引用类型（reference types）：持有对象的内存地址

代码结构：

```java
public class Main {
    public static void main(String[] args) {
		System.out.println("Hello World!");
    }
}
```

### 原始类型

原始类型没有对应的方法（method）。

#### boolean

布尔值（`true`/`false`）

```java
var flag = true;
```

#### char

字符

```java
var letter = 'c'; // 16-bit，用于表示 Basic Multilingual Plane (BMP) 字符
char letter = '☺️'; // 无法通过编译，超出了单个 UTF-16 码点的表示范围
```

#### byte/short/int/long

整数类型

```java
int a = 32; // int, 32-bit
var b = 32; // 同上

long c = 1000; // long, 64-bit
var d = 1000L; // 同上

short e = 111; // short, 16-bit

byte f = 127; // byte, 8-bit
```

八进制/十六进制：

```java
var a = 0xff; // 十六进制
var b = 0123; // 八进制
```

分隔符：

```java
// _ 会被忽略，方便阅读
var d = 1_2_3_4; // 1234 
var l = 1_000_000_000 // 1000000000
```

#### float/double

浮点数

```java
double cost = 3.78; // double, 64-bit
var cost = 3.78; // 同上

float f = 123.4; // float, 32-bit
var f = 123.4f; // 同上
```

#### 类型转换

在精度不丢失的情况下可以直接隐式转换：

```java
var a = 13; // int
long b = a;
```

其他情况下可以使用强制类型转换：

```java
var b = 1_000_000_000_000L; // long
int a = (int) b; // -727379968, overflow
```

### 引用类型

>   除了原始类型之外的所有类型都是对象（Objects），为引用类型。字符串和数组虽然是对象，但在编译器看来比较特殊，它们是内置（built-in）类型。

#### String

```java
String s = "hello world";
var s = "hello world";
```

text block:

```java
// text block 支持多行文本，
// 1. 开头的 """ 所在的这行不允许有文本内容
// 2. 每行以缩进最小的那一行为起始
var block = """
               fdsfdsf
              fsafasfs
         afdsfds
         fsdf""";
// block 的内容如下：
//
//       fdsfdsf
//      fsafasfs
// afdsfds
// fsdf
```

#### .length()

字符串的长度为 Unicode 码点数量：

```java
var a = "你好";
System.out.println(a.length()); // 2
var b = "hello";
System.out.println(b.length()); // 5
```

#### .toUpperCase()/.toLowerCase()

```java
System.out.println("hello".toUpperCase()); // HELLO
System.out.println("hello".toLowerCase()); // hello
```

#### .repeat()

```java
System.out.println("(-V-)".repeat(3)); // (-V-)(-V-)(-V-)
```

#### .indexOf()

返回字符/子字符串索引：

```java
var s = "一拳打爆地球";
System.out.println(s.indexOf("地球")); // 4
System.out.println(s.indexOf('地')); // 4
```

#### 将其他类型转为字符串

使用 `+` 可以隐式转换：

```java
System.out.println("" + 3); // 3
System.out.println("" + 7.6); // 7.6
```

`toString()` 方法：

```java
Integer a = 1;
var b = a.toString();
System.out.println(b); // 1
```

#### Array

Array 创建时会自动初始化：

```java
var arr = new int[2]; // 0 0
var arr = new bool[2]; // false false
var arr = new Object[2]; // null null
```

手动初始化：

```java
var arr = new int[] {1, 2, 3};
var arr = new int[3] {1, 2, 3}; // build failed
```



