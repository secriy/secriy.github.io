---
title: "Go Learning: Testing"
date: 2021-06-08 19:53:27
categories: 学习笔记
urlname: learn-go-testing
tags:
  - Go
  - Programming
  - Learning
---

## Go Test

Golang 拥有一个轻量级的测试框架，测试通过`go test`命令来进行，包目录中，所有以`_test.go`为结尾的文件均不会被纳入构建过程，只能用于测试。

在测试文件中，有三种类型的函数：

- Test 函数，以`Test`开头，用于测试程序执行是否符合预期
- Benchmark 函数，以`Bench`开头
- 示例函数

`go test`命令会遍历所有的`*_test.go`文件中符合上述三种类型命名规则的函数，生成一个临时的 main 包用于调用相应的测试函数，接着构建、运行、报告结果，最后清理临时文件。

## Test 函数

每个测试函数必须导入 testing 包：

```go
func TestName(t *testing.T) { /* ... */ }
```

其中**Name**必须以大写字母开头。

`t`参数用于报告测试失败和附加的日志信息。

### 使用方式

1. 在 go 源码文件同级目录下新建 go 文件`xxx_test.go`
2. 编写测试函数，以**Test**开头，接收`*testing.T`参数
3. 使用`go test`命令测试

#### 编写程序

```go
// func.go
package demo

// IsString 判断输入的数据类型是否为字符串
func IsString(i interface{}) bool {
	if _, ok := i.(string); ok {
		return true
	}
	return false
}
```

#### 编写测试程序

```go
// func_test.go
package demo

import "testing"

func TestIsString(t *testing.T) {
    test := "ABC"
    got := IsString(test)
    if !got {
        t.Errorf("IsString(%q) = %v", test, got)
    }
}
```

#### 执行测试

指定`-v`参数可以打印每个测试函数的名字以及运行时间：

```shell
go test -v
```

```
=== RUN   TestIsString
--- PASS: TestIsString (0.00s)
PASS
ok      code    0.149s
```

指定参数`-run`使用正则表达式来匹配需要执行的测试函数：

```shell
go test -run="Is" # 输出与上一输出结果相同
```

### 测试用例

常见的测试用例写法有列表写法：

```go
func TestIsString(t *testing.T) {
	tests := []struct {
		input interface{}
		want  bool
	}{
        // 测试用例
		{"aaa", true},
		{11, false},
        {true, false},
        {1.1, false},
	}

	for _, test := range tests {
		if got := IsString(test.input); got != test.want {
			t.Errorf("IsString(%q) = %v", test.input, got)
		}
	}
}
```
