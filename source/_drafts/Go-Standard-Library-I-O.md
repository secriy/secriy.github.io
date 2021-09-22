---
title: "Go Standard Library: I/O"
date: 2021-06-24 17:35:25
categories: 学习笔记
tags:
  - Go
---

## 总览

## io

### Interface

Golang 的 io 包主要有以下几个接口：

- Reader
- Writer
- Closer
- Seeker
- ReadWriter
- ReadCloser
- WriteCloser
- ReadWriteCloser
- ReadSeeker
- ReadSeekCloser
- WriteSeeker
- ReadWriteSeeker

- ReaderFrom
- WriterTo
- ReaderAt
- WriterAt
- ByteReader
- ByteScanner
- ByteWriter
- RuneReader
- RuneScanner
- StringWriter

```go

type Writer interface {
	Write(p []byte) (n int, err error)
}

type Closer interface {
	Close() error
}

type Seeker interface {
	Seek(offset int64, whence int) (int64, error)
}

type ReadWriter interface {
	Reader
	Writer
}

type ReadCloser interface {
	Reader
	Closer
}

type WriteCloser interface {
	Writer
	Closer
}

type ReadWriteCloser interface {
	Reader
	Writer
	Closer
}

type ReadSeeker interface {
	Reader
	Seeker
}

type ReadSeekCloser interface {
	Reader
	Seeker
	Closer
}

type WriteSeeker interface {
	Writer
	Seeker
}

type ReadWriteSeeker interface {
	Reader
	Writer
	Seeker
}

type ReaderFrom interface {
	ReadFrom(r Reader) (n int64, err error)
}

type WriterTo interface {
	WriteTo(w Writer) (n int64, err error)
}

type ReaderAt interface {
	ReadAt(p []byte, off int64) (n int, err error)
}

type WriterAt interface {
	WriteAt(p []byte, off int64) (n int, err error)
}

type ByteReader interface {
	ReadByte() (byte, error)
}

type ByteScanner interface {
	ByteReader
	UnreadByte() error
}

type ByteWriter interface {
	WriteByte(c byte) error
}

type RuneReader interface {
	ReadRune() (r rune, size int, err error)
}

type RuneScanner interface {
	RuneReader
	UnreadRune() error
}

type StringWriter interface {
	WriteString(s string) (n int, err error)
}

```

其中，最主要的接口为`Reader`、`Writer`和`Closer`，分别实现了`Read`、`Write`和`Close`三个方法。

### Reader

`Reader`接口包含一个方法`Read`：

```go
type Reader interface {
	Read(p []byte) (n int, err error)
}
```

`Read`方法接收一个`[]byte`类型的参数`p`，该方法读取长度为`len(p)`的字节数组赋给`p`，并返回读取的字节数`n`（$0\leq n\leq len(p)$），以及一个`error`类型。即便$n<len(p)$，`Read`方法也会在调用期间占用`p`的所有空间作为暂存空间。

`Reader`接口只有这一个方法，任何实现了`Read`方法的类型都可以看作实现了`Reader`接口，例如`strings`包的`Reader`结构体：

```go
func main() {
	p := make([]byte, 10)

    var reader io.Reader
	reader = strings.NewReader("Hello")

    read, err := reader.Read(p)
	if err != nil {
		log.Println(err)
	}

    fmt.Println(p)
    fmt.Println(read)
}

// [72 101 108 108 111 0 0 0 0 0]
// 5
```

将上面的代码中的`Hello`改为`Hello World`，可以得到下面的结果：

```
[72 101 108 108 111 32 87 111 114 108]
10
```
