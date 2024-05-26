---
title: Learn JavaScript
date: 2023-08-17 22:34:56
urlname: learn-javascript
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

### 变量

```javascript
var text; // 变量声明但不初始化，其值为 undefined

var message = "hello"; // 变量初始化

message = 100; // 将不同类型的值赋给已初始化变量，合法但不推荐
```

变量作用域：

```javascript
function test() {
    var text = ""; // 局部变量，函数外访问不到
}

function test() {
    text = ""; // 无 var 关键字，text 为全局变量，函数外可访问
    
    // 注意，test 函数被调用后 text 才会被声明，其后能被函数外的代码访问到
}
```

多变量声明：

```javascript
var a, b, c = 1, false, "c";
```

`var` 声明提升：

```javascript
function test() {
    console.log(text);
    var text = "hello";
}

// 这两个函数等价，因为 var 变量声明会提升到函数作用域顶部

function test() {
    var text = "hello";
    console.log(text);
}
```

`var` 重复声明是合法的：

```javascript
var a = 1;
var a = 2;
var a = 3;

console.log(a); // 3
```

`let` 与 `var` 的区别，作用域不同：

```javascript
// var 的作用域更大，能覆盖整个函数
if (condition) {
	var text = "hello";
	console.log(text); // hello
}
console.log(text); // hello

// let 只能在局部作用域（块作用域）生效
if (condition) {
    var text = "hello";
	console.log(text); // hello
}
console.log(text); // ReferenceError: text is not defined
```

`let` 与 `var` 的区别，不能在同一个块中重复声明：

```javascript
let a = 1;
let a = 2; // SyntaxError: Identifier 'a' has already been declared

let b = 1;
if (condition) {
    let b = 2; // 合法，因为不在同一个块级作用域
}
```

注意以 Chrome 浏览器的 Console 为例，每行命令为独立块作用域，因此重复 `let` 声明不会报错。

`let` 与 `var` 的区别，不会被提升：

```javascript
function test() {
    console.log(text); // ReferenceError: Cannot access 'text' before initialization
    let text = "hello";
}
```

`let` 与 `var` 的区别，全局作用域中声明的变量不会成为 `window` 对象的属性：

```javascript
var name = "a";
console.log(window.name); // a

let name = "a";
console.log(window.name); // undefined
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

