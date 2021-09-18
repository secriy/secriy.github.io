---
title: Rust Basic Tutorial
date: 2021-09-18 14:25:28
categories: 学习笔记
tags:
  - Rust
  - Programming
---

## Concepts

### Variables and Mutability

#### Variables

Rust 中变量有可变变量（mutable variable）和不可变变量（immutable variable）的区分，看如下的代码：

```rust
fn main() {
    let x = 5;
    println!("{}", x);
    x = 6;
    println!("{}", x);
}
```

使用 `cargo run`运行：

```shell
cargo run
   Compiling hello-rust v0.1.0 (H:\Coding\Rust\hello-rust)
error[E0384]: cannot assign twice to immutable variable `x`
 --> src\main.rs:4:5
  |
2 |     let x = 5;
  |         -
  |         |
  |         first assignment to `x`
  |         help: consider making this binding mutable: `mut x`
3 |     println!("{}", x); // 5
4 |     x = 6;
  |     ^^^^^ cannot assign twice to immutable variable

error: aborting due to previous error

For more information about this error, try `rustc --explain E0384`.
error: could not compile `hello-rust`

To learn more, run the command again with --verbose.
```

上面的错误表明，变量`x`无法二次赋值，因为它是一个 _immutable variable_。另外报错还说明，Rust 在编译期间就已经对程序可能出现的某些问题作了判断，如果不通过检查则编译失败。

```rust
fn main() {
    let mut x = 5;
    println!("{}", x);	// 5
    x = 6;
    println!("{}", x);	// 6
}
```

通过`let mut x = 5`的方式将`x`初始化为可变变量。

#### Constants

常量的声明使用如下形式的语句：

```rust
// const [NAME]: [DATA_TYPE] = [DATA];
const PI: f32 = 3.14159;
```

#### Differences

常量和变量有什么差别？

1.  常量无法使用`mut`修饰，它始终是不可变的；
2.  常量使用`const`声明，变量使用`let`；
3.  常量必须始终注明其数据类型；
4.  常量可以再任何范围声明，如全局常量、局部常量；
5.  常量是通过常量表达式确定值的，在编译器其值就会被确定，而变量的值可以在运行时赋予。
