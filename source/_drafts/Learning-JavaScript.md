---
title: Learning JavaScript
date: 2023-08-17 22:34:56
urlname: learning-javascript
categories: 学习笔记
tags:
  - JavaScript
  - PL
---

{% noteblock quote cyan %}

本文是 JavaScript 个人学习笔记，仅适合有编程基础快速入门使用。

{% endnoteblock %}

<!-- more -->

## 入门

### JavaScript 参考

- Specification：[The ECMA-262 specification](https://www.ecma-international.org/publications/standards/Ecma-262.htm)

- MDN 手册：[MDN (Mozilla) JavaScript Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference)

### 名词解释

- JavaScript 引擎：JavaScrit 的运行环境，负责将 JavaScript 代码转为机器码执行。如 Chrome 使用的 V8。

## 语言基础

### 注释

```javascript
// 单行注释

/* 多
行
注
释
*/
```

## 数据类型

JavaScript 中有原语（primitive）和对象（object） 两种类型区分：

- primitive
  - string
  - number
  - bigint
  - boolean
  - symbol
  - null
  - undefined
- object

### Numbers

JavaScript 中有两种数字类型：

- 常规数字，以 IEEE-754 双精度浮点数存储，应用于大部分情况；
- Bigint，任意长度的数字。

本小节只介绍常规数字。

数字的字面量表示方式：

```javascript
let billion = 1000000000;
let billion = 1_000_000_000; // 下划线仅作为语法糖，会被 JavaScript 引擎忽略，等同于上一句
let x = 243_4343_42342;
let x = 4234_; // error，下划线不允许在末尾
let billion = 1e9; // 科学计数法
let n = 7.3e9;
let n = 7300000000; // 与上一句等同
let mcs = 0.000001; // microsecond
let mcs = 1e-6; // 与上一句等同
```

十六进制，二进制，八进制：

```javascript
let h = 0xff; // 255
let h = 0xFF; // 255
let b = 0b110; // 6
let o = 0o377; // 255
// 0xFF === 0o377
```

数字的 `toString` 方法（2-36 进制）：

```javascript
let num = 255;
num.toString(); // 十进制，255
num.toString(16); // 十六进制，ff
num.toString(2); // 二进制，11111111

let num = 0xf1;
num.toString(); // 十进制，241
num.toString(16); // 十六进制，f1
num.toString(2); // 二进制，11110001
```

### Bigint
