---
title: Cargo Basic Tutorial
date: 2021-09-16 16:41:46
categories:
tags:
---

## 基础

```shell
cargo new hello_world

cargo build

cargo run
```

### 为什么要有 cargo？

rust 编译器：rustc

cargo 辅助打包编译

cargo 做的事情：

- 用两个配置文件（元数据 metadata 文件）保存包信息
- 获取和构建包依赖
- 调用 rustc 或是其他编译器来编译包
- 约定 rust 包，让包更容易被使用

## 创建

```shell
cargo new hello_world --bin
cargo new hello_world_lib --lib
```

cargo 默认初始化 git 仓库，`--vcs none`跳过。

### Cargo.toml vs Cargo.lock

Cargo.toml

```
[package]
name = "hello-rust"
version = "0.1.0"
edition = "2018"

# See more keys and their definitions at https://doc.rust-lang.org/cargo/reference/manifest.html

[dependencies]
```

Cargo.lock

difference:

- Cargo.toml 用于描述依赖，是你自己写的
- Cargo.lock 是依赖的详细信息，是 Cargo 维护的

## 打包

```shell
cargo build
cargo run
cargo build --release
```

--release 模式会对代码进行优化，编译时间长于 debug 模式

## 依赖

```
[package]
name = "hello-rust"
version = "0.1.0"
edition = "2018"

# See more keys and their definitions at https://doc.rust-lang.org/cargo/reference/manifest.html

[dependencies]
regex = "0.1.41"
```

```rust
use regex::Regex;

fn main() {
    ...
}
```

依赖更新

```shell
cargo update           # updates all dependencies
cargo update -p rand   # updates just “rand”
```

## Package Layout

```
.
├── Cargo.lock
├── Cargo.toml
├── src/
│   ├── lib.rs
│   ├── main.rs
│   └── bin/
│       ├── named-executable.rs
│       ├── another-executable.rs
│       └── multi-file-executable/
│           ├── main.rs
│           └── some_module.rs
├── benches/
│   ├── large-input.rs
│   └── multi-file-bench/
│       ├── main.rs
│       └── bench_module.rs
├── examples/
│   ├── simple.rs
│   └── multi-file-example/
│       ├── main.rs
│       └── ex_module.rs
└── tests/
    ├── some-integration-tests.rs
    └── multi-file-test/
        ├── main.rs
        └── test_module.rs
```

- cargo.toml cargo.lock 为配置文件
- src 目录放源码
- src/lib.rs 是默认的库源码文件
- src/main.rs 是默认的可执行程序源码文件

  - 其他的放在 src/bin/

- Benchmarks 放在 benches 目录
- Examples 放在 examples 目录
- 测试文件放在 tests 目录

## Test

```shell
cargo test
cargo test foo
```
