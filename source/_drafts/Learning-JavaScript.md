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

本文是 JavaScript 的个人学习笔记，仅适合有编程基础快速上手新语言使用。

{% endnoteblock %}

<!-- more -->

## 参考资料

- Specification：[The ECMA-262 specification](https://www.ecma-international.org/publications/standards/Ecma-262.htm)

- MDN 手册：[MDN (Mozilla) JavaScript Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference)

## 语言基础

### 概念

-   JavaScript 引擎：JavaScrit 的运行环境，负责将 JavaScript 代码转为机器码执行。如 Chrome 使用的 V8。

### 注释

```javascript
// 单行注释

/* 多
行
注
释
*/
```

### 数据类型

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

#### Numbers

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

#### Bigint

### 控制流

#### 循环

##### while

```javascript
let i = 0;
while (i < 10) {
    i++;
}
console.log(i); // 10
```

```javascript
// 单行写法
let i = 0;
while(i) console.log(i--); // 10 9 8 ... 1
```

##### do while

该循环至少会被执行一次：

```javascript
let i = 0;
do {
    i++;
} while(i < 0);
console.log(i); // 1
```

##### for

能够替代其余所有循环方式：

```javascript
for (let i = 0; i < 10; i++) { // i 只在 for 循环内可访问
    // ...
}
```

```javascript
let i = 0;
for (let i = 0; i < 10; i++) {
  i++;
}
console.log(i); // 0

for (i = 0; i < 10; i++) {
  i++;
}
console.log(i); // 10

for (; i < 20; i++) {}
console.log(i); // 20
```

省略赋值语句、条件或步进语句：

```javascript
let i = 0;
for (; i < 10; i++) {}

console.log(i); // 10

for (;;i++) {
    if (i > 20) break; // break 结束循环
}

console.log(i); // 21

for (;;) {
    if (i++ > 30) break;
}

console.log(i); // 32
```

死循环：

```javascript
// 二者等同
for (;;) {}
while (true) {}
```

`continue` 直接跳转到下一循环：

```javascript
let i = 0;
for (; i < 10; i++) {
    if (i > 5) continue;
    console.log(i); // 0 1 ... 5
}
```

`break` 结束循环：

```javascript
let i = 0;
for (;; i++) {
    if (i >= 10) break;
}
console.log(i); // 10
```

