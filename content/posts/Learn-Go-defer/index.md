---
title: 'Learn Go: defer'
date: 2021-04-20T23:12:29+08:00
draft: false
categories: 学习笔记
tags:
  - Go
  - PL
---



> 本文是 Golang 中 `defer` 语句的学习和深入理解。

## 知识点

### 一、有关 `defer` 的执行顺序

程序执行到 `defer` 语句时，并不会直接执行 `defer` 后的语句，而是将其存入该函数的栈中，等待最后函数返回后出栈执行，因此当多个 `defer` 出现的时候，执行顺序遵循 FILO。

### 二、`defer` 和 `return` 执行的先后

同时包含 `defer` 和 `return` 语句的函数执行顺序如下：

1. `defer` 语句顺序入栈。
2. `return` 语句执行，设置返回值。
3. `defer` 语句出栈执行。
4. 程序携返回值退出。

### 三、`defer` 和 `panic` 执行的先后

当程序进入 `panic` 后，首先立即执行所有的 `defer`，接着执行 `panic`，最后将 `panic` 状态上溯至包含其的所有函数，直到结束整个 goroutine。

示例：

```go
func main() {
    f1()
}

func f1() {
    defer println("f1-begin")
    f2()
    defer println("f1-end")
}

func f2() {
    defer println("f2-begin")
    f3()
    defer println("f2-end")
}

func f3() {
    defer println("f3-begin")
    panic(0)
    defer println("f3-end")
}
```

上述代码的执行顺序如下：

1. 从 `main.main()` 进入，执行 `f1()`。
2. `println("f1-begin")` 入栈，执行 `f2()`。
3. `println("f2-begin")` 入栈，执行 `f3()`。
4. `println("f3-begin")` 入栈，触发 `panic(0)`。
5. 执行当前函数内所有 `defer` 语句，`println("f3-begin")` 出栈执行，`panic f3()`。
6. `panic` 向上执行至 `f2()`，同理 `println("f2-begin")` 出栈执行，`panic f2()`。
7. `panic` 向上执行至 `f1()`，同理 `println("f1-begin")` 出栈执行，`panic f1()`。
8. `panic` 向上执行至 `main.main()`，`panic main.main()`，退出该 Goroutine。

### 四、`defer` 中包含子函数

当 `defer` 语句中的函数包含子函数调用时，由于需要 Push Stack 操作，存入函数地址和实参，因此 Push Stack 操作前会先执行子函数返回。

示例：

```go
func f(index int, value int) int {
    fmt.Println(index)

    return index
}

func main() {
    defer f(1, f(3, 0))
    defer f(2, f(4, 0))
}
```

执行流程：

1. 从 `main.main()` 进入
2. `f(1, f(3, 0))` 准备入栈，执行 `f(3, 0)`，输出 3，将函数地址和参数一并入栈。
3. `f(2, f(4, 0))` 准备入栈，执行 `f(4, 0)`，输出 4，将函数地址和参数一并入栈。
4. `f(2, f(4, 0))` 出栈执行，输出 2。
5. `f(1, f(3, 0))` 出栈执行，输出 1。
