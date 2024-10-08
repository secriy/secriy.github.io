---
title: 'Learn JavaScript'
date: '2023-08-17T22:34:56+08:00'
categories: 学习笔记
tags:
  - JavaScript
  - PL
draft: false
---

本文是 JavaScript 的个人学习笔记，仅适合有编程基础快速上手新语言使用。

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

`var` 声明会被提升到作用域顶部：

```javascript
function test() {
    console.log(text); // undefined
    var text = "hello";
}

// 声明会被提升，但初始化不会，因此上面的函数等价于：
function test() {
    var text;
    console.log(text); // 不会报错，但 text 并未初始化，因此为 undefined
    text = "hello";
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

#### `switch`

`switch` 语句通过传入值匹配到指定代码段，注意匹配时的相等检查**类型严格**：

```javascript
switch(x) {
    case '2':
        ...
        break;
    case 2:
        ...
        break;
    default:
    	...
}
```

如果不添加 `break`，匹配到 `case` 后会接着往下执行：

```javascript
let x = 1;
switch(x) {
    case 0:
        alert(0);
    case 1:
        alert(1);
    case 2:
        alert(2);
    default:
        alert(-1);
}

// Output:
//
// 1
// 2
// -1
```

因此需要手动添加 `break`：

```javascript
let x = 1;
switch(x) {
    case 0:
        alert(0);
        break;
    case 1:
        alert(1);
        break;
    case 2:
        alert(2);
        break;
    default:
        alert(-1);
}

// Output:
//
// 1
```

将多个 `case` 组合到一起：

```javascript
switch(x) {
    case 0:
        alert(0);
        break;
    case 1:
    case 2:
        // x 为 1 或 2，都会执行到这里
        alert("1 and 2");
        break;
    default:
        alert(-1);
}
```

### 函数

#### 函数声明

声明函数：

```javascript
function myFunction() {
    alert("hello");
}
```

调用函数：

```javascript
myFunction();
```

#### 变量作用域

在函数内声明的变量为局部变量，函数外无法访问：

```javascript
function myFunction() {
    let a = 1;
    alert(a);
}

myFunction();

alert(a); // ERROR
```

函数能访问外部变量，并可修改：

```javascript
let a = 1;

function myFunction() {
    a = 2;
    let b = a + 1;
    alert(b);
}

myFunction(); // 3

alert(a); // 2
```

局部变量优先级高于全局变量，重名会优先使用局部变量：

```javascript
let a = 1;

function myFunction() {
    let a = 2;
    alert(a);
}

myFunction(); // 2
```

注意，只要函数中存在同名变量声明，则外部同名变量会被忽略，不论是使用 `let` 或 `var`：

```javascript
let a = 1;

function myFunction() {
	alert(a); // ERROR: Cannot access 'a' before initialization
    let a = 2;
    alert(a);
}

myFunction();
```

```javascript
let a = 1;

function myFunction() {
	a = 3; // 这里修改的是由 var 声明提升特性，在函数顶部声明的局部变量 a
	alert(a); // 3
    var a = 2;
    alert(a); // 2
}

myFunction();

alert(a); // 1
```

#### 函数参数

函数参数：

```javascript
function add(a, b) {
    return a + b; // a, b 均为局部变量
}

let sum = add(1, 2);
alert(sum); // 3
```

函数参数传值时会拷贝参数，因此无法修改基本类型参数：

```javascript
function test(x) {
    x = 2;
}

let a = 1;
test(a);
alert(a); // 1
```

调用时，参数数量可以不一致：

```javascript
function add(a, b) {
    return a + b;
}

add(1, 2); // 3
// 多余的参数会被忽略
add(1, 2, 3, 4); // 3
// 缺少的参数为 undefined
add(); // NaN, 因为 undefined + undefined 为 NaN
add(1); // NaN, 因为 1 + undefined 为 NaN
```

可以给参数设置默认值，当参数为 `undefined` 是会被替换为默认值：

```javascript
function add(a, b = 2) {
    return a + b;
}

add(1); // 3
add(1, 3); // 4
add(1, undefined); // 3
```

```javascript
function add(a = 1, b) {
    return a + b;
}

add(2, 3); // 5
add(undefined, 3); // 4
```

函数默认值可以使用表达式等：

```javascript
function add(a, b = a + 3) { // 注意，参数按顺序声明，因此默认值能为 a = b + 1 类似写法
    return a + b;
}

add(1);
```

```javascript
function defaultValue() {
    return 23;
}

function add(a, b = defaultValue()) {
    return a + b;
}

add(1); // 24
```

函数参数在调用时才会被操作：

```javascript
let x = 1;

function defaultValue() {
    x = 2;
    return 23;
}

function add(a, b = defaultValue()) {
    return a + b;
}

alert(x); // 1
add(1); // 24
alert(x); // 2
```

#### 函数返回值

函数默认返回 `undefined`：

```javascript
function test() {};

let a = test();
alert(a); // undefined
```

多行返回值写法：

```javascript
function test() {
    ...
    return (
    	a + b + c
        + d +
        f
    )
}
```

#### 函数表达式

函数可以作为值：

```javascript
let hello = function() {
    alert("hello");
};

hello();
```

#### 箭头函数

箭头函数简化了创建函数的方式：

```javascript
// let func = (arg1, arg2, ...) => expression;
let hello = (name) => alert(`hello ${name}`);

hello("foo"); // hello foo

// 无参数
let func = () => alert("hello");
```

更复杂的函数：

```javascript
let sum = (a, b) => {
    let result = a + b;
    return result;
}

alert(sum(1, 2)); // 3
```

### 对象

对象为 key-value 存储：

```javascript
// 空对象创建
let emptyObj = new Object();

// 字面量写法，与上方等同
let emptyObj = {};
```

#### 对象属性

对象属性（property/name/identifier）：

```javascript
let person = {
    name: "Alice",
    age: 18
};

alert(person.name); // Alice

// 添加属性
person.dead = false;

alert(person.dead); // true

// 未设置的属性，即 undefined
alert(person.a); // undefined

// 删除属性
delete person.dead;
// 重复删除不会报错，但没有实际效果（no op）
delete person.dead;

// 属性可以用任意字符串命名
let user = {
    "any name": ""
}

// 注意属性名无论使用什么类型的值，都会被转换为字符串
// 在这里可以使用任意的值
let user = {
    1: "1", // 等同于 "1": "1"
    for: "for" // 虽然 for 为保留关键字，但这里实际上是 "for"，因此可以用
}

alert(user["any name"]) // 使用 `[]` 取值

// 使用 `[]` 设置属性
user["name"] = "name";

// 使用 `[]` 删除属性
delete user["name"];

// 使用 `[]` 则可以支持任意类型的 key，`.` 的方式只能支持字符串
// user.name 等同于 user["name"]
user[{}] = 1;

alert(user[{}]); // 1
```

#### 计算属性

JavaScript 支持属性名是变量：

```javascript
let keyFunc = (name) => name + "x";

let key = keyFunc("test");

let user = {
  [key]: "hello", // 使用 `[]` 设置属性名，属性名为 `[]` 内变量的值
};

alert(user.testx); // hello

// 修改 key 并不会对对象属性产生影响 

key = "testy";

alert(user.testy); // undefined
```

实际上，这就等同于下面的代码：

```javascript
let keyFunc = (name) => name + "x";

let key = keyFunc("test");

let user = {};

user[key] = "hello"; // key 的值此时为 "testx"

alert(user.testx); // hello
```

#### 属性简写

```javascript
function makeUser(name, age) {
  return {
    name: name,
    age: age,
    // ...other properties
  };
}

let user = makeUser("John", 30);
alert(user.name); // John
```

上面的代码可以改写为：

```javascript
function makeUser(name, age) {
  return {
    name, // 与 name: name 等同
    age, // 与 age: age 等同
    // ...
  };
}

let user = makeUser("John", 30);
alert(user.name); // John
```

两种写法也可以混用：

```javascript
let user = {
	name,
    age: 18
}
```

#### 常用操作

##### 检查属性是否存在

```javascript
let user = {
    name: "John",
    age: 30,
    undef: undefined
}

alert("name" in user); // true
alert("number" in user); // false
// 只要出现在 user 中，无论值是什么，都被认为存在
alert("undef" in user); // true
```

##### 遍历属性

遍历一个 Object 中的所有字段：

```javascript
for (key in object) {
    // ...
}
```

例如：

```javascript
let user = {
    name: "John",
    age: 30
};

for (let key in user) {
    alert(key); //输出 key
    alert(user[key]); // 输出 value
}
```

需要注意的是遍历的顺序，在 JavaScript 中这一点特别奇怪。

如果属性名（key）是一个可以**不需要经过变化，直接转换为整数**的字符串，那么它们会按照数字大小顺序有序输出：

```javascript
let dict = {
    "23": "23",
    "12": "12",
    "232": "232",
    "1": "1"
}

for (let key in dict) {
    alert(key); // 1, 12, 23, 232
}
```

不满足条件的 key 按照加入的顺序排列：

```javascript
let dict = {
    "+23": "23", // +23 虽然可以转换为 23，但转换前后不一致，不满足条件
    "+12": "12",
    "+232": "232",
    "+1": "1"
}

for (let key in dict) {
    alert(key); // +23, +12, +232, +1
}
```

如果同时存在两种 key，那么满足条件的放在最前：

```javascript
let dict = {
    "+23": "23",
    "+12": "12",
    "+232": "232",
    "12": "12",
    "232": "232",
    "+1": "1"
}

for (let key in dict) {
    alert(key); // 12, 232, +23, +12, +232, +1
}
```
