---
title: Golang学习笔记：基础篇
date: 2021-04-17 09:16:22
categories: 学习笔记
tags: Golang
references:
  - name: CGO_ENABLED环境变量对Go静态编译机制的影响
    url: https://johng.cn/cgo-enabled-affect-go-static-compile/
  - name: A Tour of Go
	url: https://tour.golang.org/
---

{% noteblock quote cyan %}

Golang 学习笔记其一，基础篇。

{% endnoteblock %}

<!-- more -->

## 命令行操作

Golang 提供了完整的操作命令，用于管理和操作项目。配置好 Golang 环境后，可以直接输入`Go`命令查看 Golang 提供的所有命令：

| command  | info                                                |
| :------: | :-------------------------------------------------- |
|   bug    | start a bug report                                  |
|  build   | compile packages and dependencies                   |
|  clean   | remove object files and cached files                |
|   doc    | show documentation for package or symbol            |
|   env    | print Go environment information                    |
|   fix    | update packages to use new APIs                     |
|   fmt    | gofmt (reformat) package sources                    |
| generate | generate Go files by processing source              |
|   get    | add dependencies to current module and install them |
| install  | compile and install packages and dependencies       |
|   list   | list packages or modules                            |
|   mod    | module maintenance                                  |
|   run    | compile and run Go program                          |
|   test   | test packages                                       |
|   tool   | run specified go tool                               |
| version  | print Go version                                    |
|   vet    | report likely mistakes in packages                  |

### 命令详解

#### bug

该命令用于提交 Golang 的 bug，执行会打开 Github 上的 Golang 页面，并会添加系统信息。

#### build

该命令用于编译包和依赖，如果是使用了 Go Modules 的项目，编译时会自动根据*go.mod*文件获取依赖包，再进行编译。

##### 普通编译

编译整个目录：

```shell
go build
```

指定输出的文件名：

```shell
go build -o hello.exe
```

指定入口编译：

```shell
go build main.go
```

##### 交叉编译

Golang 支持在很多环境下编译运行，使用`go tool dist list`命令可以查看 Golang 支持的平台：

```shell
$ go tool dist list
aix/ppc64
android/386
android/amd64
android/arm
android/arm64
darwin/amd64
darwin/arm64
dragonfly/amd64
freebsd/386
freebsd/amd64
freebsd/arm
freebsd/arm64
illumos/amd64
ios/amd64
ios/arm64
js/wasm
linux/386
linux/amd64
linux/arm
linux/arm64
linux/mips
linux/mips64
linux/mips64le
linux/mipsle
linux/ppc64
linux/ppc64le
linux/riscv64
linux/s390x
netbsd/386
netbsd/amd64
netbsd/arm
netbsd/arm64
openbsd/386
openbsd/amd64
openbsd/arm
openbsd/arm64
openbsd/mips64
plan9/386
plan9/amd64
plan9/arm
solaris/amd64
windows/386
windows/amd64
windows/arm
```

很多时候需要跨系统环境编译，比如在 Windows 下开发可能需要编译 Linux 可以使用的可执行版本，这时候就需要交叉编译：

1. Windows 下编译

   Windows 下需要使用批处理命令，新建一个*build.bat*文件，填入编译命令执行即可。

   ```shell
   # MacOS
   SET CGO_ENABLED=0
   SET GOOS=darwin
   SET GOARCH=amd64
   go build main.go

   # Linux
   SET CGO_ENABLED=0
   SET GOOS=linux
   SET GOARCH=amd64
   go build main.go
   ```

2. Linux 下编译

   ```shell
   # MacOS
   CGO_ENABLED=0 GOOS=darwin  GOARCH=amd64  go build main.go

   # Windows
   CGO_ENABLED=0 GOOS=windows  GOARCH=amd64  go build main.go
   ```

3. MacOS 下编译

   ```shell
   # Linux
   CGO_ENABLED=0  GOOS=linux  GOARCH=amd64  go build main.go
   # Windows
   CGO_ENABLED=0 GOOS=windows  GOARCH=amd64  go  build  main.go
   ```

###### 参数说明

- CGO_ENABLED：该参数默认为 1，即默认开启 CGO，允许在 Golang 中调用 C 代码，开启之后编译时部分包会使用 C 的实现，因而存在外部依赖（动态链接）。当该参数设置为 0，即禁用 CGO 后，编译时就不会使用 C 实现，从而编译出纯静态的可执行文件
- GOOS：即目标平台
- GOARCH：即目标平台的体系架构

#### clean

#### doc

#### env

#### fix

#### fmt

#### generate

#### get

该命令用于动态获取远程代码包及其所有依赖包，并进行编译安装。默认会将其下载到 GOPATH 下的 src 目录。

#### install

该命令与`go build`类似，区别是`go install`会将编译后的可执行文件放到指定的目录（即**\$GOBIN**文件夹），当**\$GOBIN**环境变量未设置时执行`go install`会报错。

#### list

该命令用于列出包名和模块名

#### mod

该命令用于管理 Golang 的包，自 Go1.11 开始启用，实现 Modules 管理。将环境变量 GO111MODULE 设置为 on 或 auto 打开（未来会删除，默认启用 Go Modules）。

##### 常用操作

1. `go mod init [package name]`：初始化 Go Modules 项目
2. `go mod download [modules name]`：下载指定的模块
3. `go mod tidy`：自动添加缺失的模块并移除未使用的模块

#### run

#### test

#### tool

#### version

#### vet

## 语言基础

### 包

每一个 Go 程序都是由包（package）组成的，程序从`main`包开始运行。

根据惯例，包名通常是导入路径的最后一段，例如`math/rand`包中的每个 go 文件都是以`rand`为包名。

每个 go 文件的开头都必须指定所属的包，例如`package main`，指定其属于`main`包。

在包声明之后，需要导入当前 go 程序所使用的其他包：

```go
import "fmt" // 导入fmt包
```

当引入了多个包时，需要全部导入：

```go
import "fmt"
import "sync"
```

通常会将这些包分组导入：

```go
import (
	"fmt"
	"sync"
)
```

可以给导入的包一个别名，操作包变量及包函数时可以使用别名：

```go
import f "fmt"

func main() {
    f.Println("Hello World")
}
```

当导入包却不使用时，可以用`_`作为包的别名（当只需要调用包的`init()`函数和包级变量时会这么做，后面会讲到）：

```go
import _ "fmt"
```

如果常规导入包却没有显式使用，编译器会报错，无法通过编译。

Golang 区分大小写，并使用大小写区分导出变量（常量、函数、接口等）和私有变量（常量、函数、接口等），类似于 Java 中的 public 和 private。首字母大写的数据类型可以被其他包访问和调用（Public），而首字母小写只能在包内使用（Private）。

```go
package main

import (
	"fmt"
	"math"
)

func main() {
	fmt.Println(math.pi) // 导出名首字母大写，因此这段代码会报错，将pi改为Pi即可
}
```

### 基础数据类型

Golang 中包含多种数据类型，并提供了确定的类型长度，方便在不同系统环境下的移植：

```
bool // 布尔值

string // 字符串

int  int8  int16  int32  int64			// 有符号整数
uint uint8 uint16 uint32 uint64 uintptr // 无符号整数

byte // uint8的别名

rune // int32的别名
     // 代表一个Unicode码点

float32 float64 // 浮点数

complex64 complex128 // 复数
```

其中，`int`、`uint`、`uintptr`类型的大小会随位宽的不同而不同，比如在 32 位环境下，它们都占 32bit，而在 64 位环境下它们会占 64bit。

### 变量

变量（Varrible）是编程语言中最基本的量，基本的变量操作有”声明“、”定义“、”初始化“和”赋值“四种。

- **声明（declare）**：告诉编译器/解析器这个变量的存在，但不分配内存空间
- **定义（defined）**：为变量分配内存空间，在某些语言（如 C）中声明就包含了定义的过程
- **初始化（initialize）**：定义变量后，系统并不知道要为该变量分配多少内存空间，通常是使用默认的大小，初始化过程就对变量进行了内存空间的确定
- **赋值（assign）**：在变量分配内存空间后，对变量的值进行修改

#### 声明

在 Golang 中，变量的声明就包含了定义和初始化的过程，需要指定变量类型：

```go
var a int
fmt.Println(a) // 0

var b, c int // 同时声明多个同类型变量
fmt.Println(b) // 0
fmt.Println(c) // 0

var d bool
fmt.Println(d) // false
```

变量声明时会根据类型自动初始化，默认是二进制的零值，因此`int`类型的初始值是`0`，`bool`类型的初始值是`false`，`string`类型的初始值是`""`。

存在声明但未使用的变量会导致编译错误：

```go
package main

func main() {
	var a int
}
```

```
xxx\main.go:4:6: a declared but not used
```

#### 初始化

可以在变量声明时手动初始化：

```go
var a int = 10
fmt.Println(a) // 10
```

对多个变量初始化：

```go
var a, b int = 1, 2
fmt.Println(a) // 1
fmt.Println(b) // 2
```

声明存在右值（赋值符号右边的值）时，可以省略变量的类型：

```go
var a = 10
var b, c = 20, 30
fmt.Println(a) // 10
fmt.Println(b) // 20
fmt.Println(c) // 30
```

和 import 一样，可以分组声明和初始化变量：

```go
var (
	a int = 1 // 1
	b int 	  // 0
    c bool    // false
)
```

#### 短变量声明

在函数内部，可以使用**短变量声明**，变量类型由右值自动推导：

```go
func main() {
    var a uint = 1
	b := 3
    fmt.Println(a) // 1
	fmt.Println(b) // 3
    fmt.Println(reflect.TypeOf(a)) // uint
	fmt.Println(reflect.TypeOf(b)) // int
}
```

#### 匿名变量

使用**匿名变量**来忽略某个值：

```go
func main() {
    result, _ := add(10, 20) // 忽略add()返回的第二个值
	fmt.Println("Result=", result)
}
func add(a int, b int) (int, string) {
	return a + b, "Golang" // 函数add返回了两个值
}
```

### 常量

常量（Constant）的声明类似于变量，但使用`const`关键字，常量只可以是字符、字符串、布尔值和数值型，必须是编译期就确定的值。

常量是固定的值，在程序的整个运行过程中不会改变，变量一般存储与内存中的堆或栈中，位于数据段；而常量通常放在代码段，直接存储其数值，类型由编译器维护。

```go
const pi float64 = 3.1415926
fmt.Println(pi) // 3.1415926
```

常量可以不指定类型：

```go
const a = 11
```

和变量一样，常量也支持分组：

```go
const (
    a = 11
    b = 22
)
```

当声明多个常量时，如果不指定值，则下面的常量值和其上一行的变量值相等：

```go
const (
    a1 = 100 // 100
    a2 		 // 100
    a3  	 // 100
)
```

和变量不同，常量声明后不是必须要被使用。

#### 数值型常量

数值型常量能提供很高精度的值存储。

一个无类型的常量会根据环境来决定它的类型：

```go
const (
	Big = 1 << 100 	  // 1267650600228229401496703205376
	Small = Big >> 99 // 2
)

func needInt(x int) int {
    return x*10 + 1
}

func needFloat(x float64) float64 {
	return x * 0.1
}

func main() {
	fmt.Println(needInt(Small))   // 21
	fmt.Println(needInt(Big))     // Overflow
	fmt.Println(needFloat(Small)) // 0.2
	fmt.Println(needFloat(Big))   // 1.2676506002282295e+29
}
```

上面的代码声明了一个大数值常量和一个小数值常量，而`fmt.Println(needInt(Big))`这一段代码在编译期就出现了报错，这是因为这个数值太大超出了`int`类型能存储的最大长度。从这点可以看出无类型常量的值是可以达到很高的精度的。

#### iota

iota 可以用作常量的计数器，只能用于常量：

```go
const (
	a = iota // 0
	b 		 // 1
	c 		 // 2
)
```

可以使用`_`跳过某些值：

```go
const (
	a = iota // 0
	_
	c 		 // 2
)
```

由于未初始化常量值会和上一行的值相等，因此会出现以下情况：

```go
const (
	a1 = iota // 0
	a2 = 100  // 100
	a3        // 100
	a4        // 100
)
```

可以中间插入`iota`计数，但并不是重新计数：

```go
const (
	a1 = iota // 0
	a2 = 100  // 100
	a3 = iota // 2
	a4        // 3
)
```

可以将多个`iota`定义在同一行：

```go
const (
	a1, a2 = iota, iota + 1 // 0, 1
	b1, b2					// 1, 2
	c1, c2					// 2, 3
)
```

一个简单的使用`iota`的例子，其中`<<`是二进制左移运算符：

```go
const (
	_  = iota
	KB = 1 << (10 * iota)
	MB = 1 << (10 * iota)
	GB = 1 << (10 * iota)
	TB = 1 << (10 * iota)
	PB = 1 << (10 * iota)
)
```

### 类型转换

在 Golang 中，所有类型的转换必须是显示转换，否则会编译错误：

```go
i := 42			// int
f := float64(i) // float64
u := uint(f) 	// uint
```

```go
var i = 42
var f float64 = i
// cannot use i (type int) as type float64 in assignment
```

#### 类型推断

有时候会需要知道某个变量的数据类型，这时候就需要类型推断：

```go
func main() {
	v := 42
	fmt.Printf("%T\n", v) // int
}
```

通过反射也可以得到变量的类型（之后会详细介绍）：

```go
func main() {
	v := 42
	fmt.Println(reflect.TypeOf(v)) // int
}
```

### 函数

函数（Function）是对一段代码的封装，它需要零个或多个输入参数，并会返回零个或多个值。

#### 参数

```go
package main

import "fmt"

func add(x int, y int) int {
	return x + y
}

func main() {
	fmt.Println(add(42, 13))
}
```

其中`x`和`y`被称为形式参数（形参），因为它们在函数定义时并没有实际的值，只是提供给函数调用的变量名。`42`和`13`被称为实际参数（实参），函数接收的实际数值是实参的值。

对于相同类型的形参可以进行省略：

```go
func add(x, y int, c string) string {
	return string(rune(x+y)) + c
}
```

#### 返回值

Golang 还支持函数支持多返回值：

```go
func swap(x, y string) (string, string) {
	return y, x
}

func main() {
	a, b := swap("hello", "world")
	fmt.Println(a, b) // world hello
}
```

#### 命名返回值

Golang 甚至支持对返回值进行命名：

```go
func split(sum int) (x, y int) {
	x = sum * 4 / 9
	y = sum - x
	return
}

func main() {
	fmt.Println(split(17))
}
```

然而这种函数返回的方式（Naked return statements）会使函数丧失一定的可读性，因此在长函数中不建议使用。

## 流控制语句

### 判断（if）

最简单的`if`语句包含一个条件表达式，当表达式的值为`true`时，才会执行`if`判断体的代码段：

```go
if true {
	fmt.Println("TRUE")
}
// TRUE
```

和某些语言不同的是，Golang 只允许判断语句的值为布尔值，不能使用其他数值直接判断。

Golang 支持在`if`语句中包含短变量声明语句：

```go
if err := function(); err != nil {  // 函数function返回错误，nil为空值
	fmt.Println("ERROR")
}
```

`if`语句通常和`else`语句一起使用：

```go
var judge = false
if judge {
	fmt.Println("TRUE")
} else {
	fmt.Println("FALSE")
}
// FALSE
```

可以使用`else if`语句进行多次判断，但当一个条件满足时就不会再判断下面的语句：

```go
var num = 55
if num > 12 {
	fmt.Println(">12")
} else if num > 16 {
	fmt.Println(">16")
} else {
	fmt.Println("<=12")
}
// >12
```

其中`else if num > 16`永远不会执行到，被称作死代码（Dead Code）。

### 循环（for）

Golang 中只提供了`for`循环语句，很多其他语言都提供了如`while`、`do...while`循环语句。

`for`循环语句除循环体以外有三个组成部分，由`,`分割：

- 初始化语句：在第一次循环前执行
- 条件表达式：在每次循环前判断
- 回报语句：在每次循环后执行

```go
for i := 0; i < 10; i++ {
	fmt.Println(i)
}
```

其中，初始化语句和回报语句是可以省略的：

```go
i := 0
for i < 10 {
    fmt.Println("Hi")
    i++
}
```

上面这段循环就变成了其他语言中的`while`，甚至还能省略循环条件：

```go
for {
    fmt.Println("Hi")
}
```

这段循环就变成了无限循环，等同于`while(true)`。

#### continue

可以使用`continue`语句跳过本次循环：

```go
for i := 0; i < 10; i++ {
    if i <= 5 {
    	continue
    }
    fmt.Print(i) // 6789
}
```

#### break

可以使用`break`语句结束整个循环：

```go
for i := 0; i < 10; i++ {
    if i == 5 {
    	break
    }
    fmt.Print(i) // 01234
}
```

### 选择（switch）

`Switch`语句可以用来替代`if-else`语句，它会按顺序判断条件表达式的值与每一个`case`是否匹配，匹配则运行当前`case`：

```go
func main() {
	fmt.Print("Go runs on ")
	switch os := runtime.GOOS; os {
	case "darwin":
		fmt.Println("OS X.")
	case "linux":
		fmt.Println("Linux.")
	default:
		fmt.Printf("%s.\n", os)
	}
}
// Go runs on windows
```

上面这段代码使用了`runtime`包来获取当前运行环境的系统类型，和`if`语句一样，`switch`语句也支持短变量声明。

然而`switch`匹配到一个`case`后，就不再判断下面的`case`了，直接会结束整个`switch`语句，可以使用`fallthrough`关键字不判断直接执行下一个`case`：

```go
switch s := 12; { // 注意省略判断语句但保留短变量声明时必须要带上这里的";"
case s <= 10:
	fmt.Println("<=10")
case s == 12:
	fmt.Println("==12")
	fallthrough
default:
	fmt.Println("<100")
}
// ==12
// <100
```

`fallthrough`只会直接执行其后一条`case`，并不会执行后面所有的语句，并且`fallthrough`不能存在于最后一条`case`（或`default`）中，否则会报错。

### 推迟（defer）

`defer`的详细介绍和注意事项可以参考[Golang 学习之 defer](<[https://blog.secriy.com/2021/04/20/Golang%E5%AD%A6%E4%B9%A0%E4%B9%8Bdefer/](https://blog.secriy.com/2021/04/20/Golang学习之defer/)>)

```go
func main() {
	defer fmt.Println("world")

	fmt.Println("hello")
}
// hello
// world
```

## 其他数据类型

### 指针

指针（Pointer）是一种特殊的数据类型，它保存的值是一个内存地址，它的零值是`nil`

```go
var p *int // <nil>
```

使用`&`操作符来生成一个指向操作数的指针，使用`*`获得指针所指向的值：

```go
i := 10
p := &i
fmt.Println(p)  // 0xc000016088
fmt.Println(*p) // 10
```

可以对指针所指向的值进行修改，但指针变量本身不能进行运算：

```go
i := 10
p := &i
fmt.Println(*p) // 10
*p = 20
fmt.Println(*p) // 20
fmt.Println(i)  // 20
```

### 结构体

结构体（Struct）是一些字段的集合，可以使用结构体定义变量：

```go
type Person struct {
	name string
	age uint8
}

func main() {
	ps := Person {"Tom", 12}
    fmt.Println(ps) // {Tom 12}
}
```

使用`.`操作符来操作结构体的字段：

```go
type Person struct {
	name string
	age uint8
}

func main() {
	ps := Person {"Tom", 12}
	ps.age = 100
    fmt.Println(ps) // {Tom 100}
}
```

结构体名首字母大写时为可导出，否则不可导出。

#### 结构体指针

```go
type Person struct {
	name string
	age uint8
}

func main() {
	ps := Person {"Tom", 12}
	p := &ps
	p.name = "Jack" // 等同于(*p).name = "Jack"
	fmt.Println(ps)
}
```

#### 结构体字面量

```go
type Person struct {
	name string
	age  int
}

var (
	p1 = Person{"Jack", 12}
    p2 = Person{name: "Tom"}
	p3 = Person{}
	p  = &Person{"Cecelia", 16}
)

func main() {
	fmt.Println(p1, p2, p3) // {Jack 12} {Tom 0} { 0}
    fmt.Println(p) // &{Cecelia 16}
}
```

结构体字面量就是结构体的字面值，即指定结构体的值定义。未手动初始化的字段将会以其数据结构的零值初始化。

### 数组

数组（Array）是编程语言的一种基本的数据类型，是一定数量同类型数据的列表：

```go
var arr1 [3]int
fmt.Println(arr1) // [0 0 0]
var arr2 [2]string
fmt.Println(arr2) // [ ]
arr3 := [6]int{1, 2, 3, 4, 5}
fmt.Println(arr3) // [1 2 3 4 5]
```

数组在内存中占用连续的空间，其大小必须在编译期就确定，因此不允许使用未指定长度的数组，但使用`[...]`可以让其在编译期根据内容自动推导长度：

```go
var arr4  = [...]int{1, 2, 3}
fmt.Println(arr4) // [1 2 3]
```

可以使用数组下标对数组取值：

```go
var arr4  = [...]int{1, 2, 3}
fmt.Println(arr4[1]) // 2
```

数组的长度实际上也是数组类型的一部分，因此不同长度的数组是完全不同的。

### 切片

切片（Slice）是一种可变大小的数据列表类型，它可以灵活的操作其内容，但它底层仍然是一个固定大小的数组。切片在实际使用中比数组更加常见。

切片的声明不需要指定其长度，如果指定了长度那就是数组：

```go
var slice1 []int
fmt.Println(slice1) // []
var slice2 = []int{1, 2, 3}
fmt.Println(slice2) // [1 2 3]

var arr1 = [...]int{1, 2, 3}

fmt.Println(reflect.TypeOf(slice2)) // []int
fmt.Println(reflect.TypeOf(arr1)) // [3]int
```

切片提供了截取的方法，方便从中获取指定位置的值：

```go
slice := []int{1, 2, 3, 4, 5, 6}
var s []int = slice[1:4]
fmt.Println(s) // [2 3 4]
```

截取的范围从左边的数值开始直到右边的数值（不包括），比如`[1:3]`，就代表切片中下标从 1 到 2 的两个数。可以省略`:`左右的下标值，即默认为最小（最大）下标：

```go
slice := []int{1, 2, 3, 4, 5, 6}
var s1 []int = slice[:4]
fmt.Println(s1) // [1 2 3 4]
var s2 []int = slice[2:]
fmt.Println(s1) // [3 4 5 6]
var s3 []int = slice[:]
fmt.Println(s3) // [1 2 3 4 5 6]
```

同样的，对数组也可以进行截取，但获得的是一个切片：

```go
arr := [...]int{1, 2, 3, 4, 5, 6}
var s = arr[1:4]
fmt.Println(s) // [2 3 4]
fmt.Println(reflect.TypeOf(s)) // []int
```

#### 对数组的引用

```go
names := [4]string{"Angle", "Bob", "Cecelia", "Dog"}
fmt.Println(names) // [Angle Bob Cecelia Dog]
a := names[0:2] // [Angle Bob]
b := names[1:3] // [Bob Cecelia]
fmt.Println(a, b) // [Angle Bob] [Bob Cecelia]

b[0] = "???"

fmt.Println(a, b) // [Angle ???] [??? Cecelia]
fmt.Println(names) // [Angle ??? Cecelia Dog]
```

从上面这段代码可以看到，`a`和`b`都各自截取了`names`的一部分切片，当改变其中一个的内容时，另一个有共同元素的切片也会被改变，并且其底层引用的数组也发生了改变。这就说明了切片实际上是对数组的引用，它的底层仍然是数组，并且直接指向了原数组所在的存储空间。当以上代码中`names`为切片类型时其输出相同。

在 Golang 中，一个切片不存储任何数据，它只是描述了底层数组的一部分。也就是说，声明并初始化一个切片，它实际上操作的是一个数组，是对数组元素的全部截取。

#### 切片字面量

一个切片的字面量就像没有长度的数组字面量，以下是数组字面量：

```go
[3]bool{true, true, false}
```

切片字面量会创建一个相同的底层数组，然后创建一个引用它的切片：

```go
[]bool{true, true, false}
```

可以定义一个结构体切片：

```go
s := []struct {
	name string
	age int
}{
    {"Dog", 12},
    {"Pig", 13},
    {"Cat", 15},
}
fmt.Println(s) // [{Dog 12} {Pig 13} {Cat 15}]
```

#### 切片的长度和容量

切片包含两个属性：**长度（length）**和**容量（capacity）**：

- 切片的长度表示的是切片中实际包含的元素个数

- 切片的容量表示的是切片底层数组的元素个数，从该切片中第一个元素开始计算

创建一个`printSlice`函数用于输出指定切片的 length 和 capacity 以及切片的内容：

```go
package main

import "fmt"

func main() {
	s := []int{2, 3, 5, 7, 11, 13}
	s1 := s[:0]
	s2 := s[:4]
	s3 := s[2:]
	printSlice(s) // len=6 cap=6 [2 3 5 7 11 13]
	printSlice(s1) // len=0 cap=6 []
	printSlice(s2) // len=4 cap=6 [2 3 5 7]
	printSlice(s3) // len=4 cap=4 [5 7 11 13]
}

func printSlice(s []int) {
	fmt.Printf("len=%d cap=%d %v\n", len(s), cap(s), s)
}
```

上述代码的四个切片底层共用一个数组，他们各自包含了起始元素的地址、切片长度和切片容量：

![arr](Golang学习笔记：基础篇/arr-1619347000334.png)

- 切片`s`从数组的首位开始，长度和容量均等于数组的大小
- 切片`s1`从数组的首位开始，长度为 0，但从首位开始计算数组的长度为 6，即切片的容量为 6
- 切片`s2`从数组的首位开始，长度为 4，容量同上为 6
- 切片`s3`从数组的第 2 位开始，长度为 4，从第二位计算数组的长度为 4，即切片容量为 4

切片的容量主要用于判断底层数组有没有足够的空间给切片延伸长度，当切片扩容但容量不足时，它会开辟新的内存空间将底层数组扩容：

```go
package main

import "fmt"

func main() {
	s := []int{2, 3, 5, 7}
	printSlice(s) // len=4 cap=4 [2 3 5 7]
	s = append(s, 1, 2, 2, 3) // 往切片里新增4个元素，填满底层数组
	printSlice(s) // len=8 cap=8 [2 3 5 7 1 2 2 3]
	s = append(s, 1) // 往切片里新增1个元素
	printSlice(s) // len=9 cap=16 [2 3 5 7 1 2 2 3 1]
}

func printSlice(s []int) {
	fmt.Printf("len=%d cap=%d %v\n", len(s), cap(s), s)
}
```

可以看到当切片扩容后长度大于其容量（底层数组大小）时，底层数组的大小会直接翻倍，也就是说，新数组的大小是原数组的两倍。数组在内存中是连续存储的，因此当连续的空间不足时，数组就无法在当前位置直接扩容。这时候，程序会寻找一个满足新数组大小的连续内存空间，将原数组全部拷贝过去来实现底层数组的扩容。

#### 空切片

切片作为一种数据类型同样具有零值，它的零值是`nil`，其*length*和*capacity*的值均为 0：

```go
var s []int
fmt.Println(s, len(s), cap(s)) // [] 0 0
if s == nil {
    fmt.Println("nil") // nil
}
```

#### 创建切片

Golang 提供了内建的`make`方法，可以用来创建一个切片：

```go
s1 := make([]int, 5) // make([]Type, Len)
fmt.Println(s1, len(s1), cap(s1)) // [0 0 0 0 0] 5 5
s2 := make([]int, 5, 5) // make([]Type, Len, Cap)
fmt.Println(s2, len(s2), cap(s2)) // [0 0 0 0 0] 5 5
```

#### 切片的切片

切片的元素可以是任意数据类型，其中就包括切片：

```go
sliSli := [][]string{
    []string{"+", "-", "="},
    []string{"-", "+", "="},
    []string{"=", "+", "_"},
}
sliSli[0][0] = "?"
for i := 0; i < len(sliSli); i++ {
    fmt.Println(sliSli[i])
}
// [? - =]
// [- + =]
// [= + _]
```

上述`sliSli`切片初始化语句还可以省略：

```go
sliSli := [][]string{
    {"+", "-", "="},
    {"-", "+", "="},
    {"=", "+", "_"},
}
```

#### 切片的元素添加

很多时候都需要对切片元素进行添加，Golang 提供了内建的`append`函数来实现对切片的元素添加，在前面的**“切片的长度和容量”**一节中就曾使用过：

```go
var s []int
fmt.Println(s) // []
s = append(s, 0)
fmt.Println(s) // [0]
s = append(s, 1, 2 ,3)
fmt.Println(s) // [0 1 2 3]
```

append 的第一个参数是原切片，其后一个或多个参数是需要添加的新元素，函数返回一个新的切片，他包含了原切片的所有元素和新元素。

当切片的底层数组大小不足时会分配一个更大的数组，返回的切片会指向这个新分配的数组。

#### 遍历

内建函数`range`用于在`for`循环中遍历`slice`和`map`：

```go
slice := []int{1, 2, 3 ,4, 5}
for i, v := range slice {
	fmt.Printf("Index:%d Value:%d\n", i, v)
}
// Index:0 Value:1
// Index:1 Value:2
// Index:2 Value:3
// Index:3 Value:4
// Index:4 Value:5
```

对切片迭代时会返回两个值：当前元素的下标以及当前元素的值的拷贝。

由于 Golang 中元素声明后必须被使用，因此可以使用`_`忽略`range`返回的值：

```go
slice := []int{1, 2, 3 ,4, 5}
for _, v := range slice {
	fmt.Printf("Value:%d\n", v)
}
// Value:1
// Value:2
// Value:3
// Value:4
// Value:5
```

### Map

## TODO

- 变量作用域
