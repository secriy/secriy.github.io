---
title: InnoDB Row Formats
date: 2021-11-01 14:10:26
urlname: innodb-row-formats
categories: 学习笔记
tags:
  - Database
  - MySQL
  - InnoDB
---

{% noteblock quote cyan %}

InnoDB 行格式。

{% endnoteblock %}

<!-- more -->

## 行格式的概念

表的行格式（Row Formats）是指行记录在磁盘上的物理存储方式。行格式会影响查询和 DML 操作的性能，随着单个磁盘页面中容纳更多行，查询（queries）和索引查找（index lookups）可以更快地进行，缓冲池中需要的缓存内存空间会更少，写入更新值所需的 I/O 也更少。

每个表中的数据被划分为页（pages），每个页中有一个或多个行记录。构成每个表的页面排列在称为 B+ 树索引的数据结构中。表数据（聚集索引）和二级索引都使用这种类型的结构。

> MySQL 提供了很多长度可变的数据类型，比如 `VARCHAR(M)`、`VARBINARY(M)` 以及 `TEXT` 等。这些变长类型的列被称为**变长字段**，其中存储的字节大小是不固定的，因此必须通过记录一些额外信息来处理这些变长字段。

变长字段是列值存储在 B+ 树索引节点中的规则的一个例外（即变长字段内容不一定全在 B+ 树叶子结点中）。太长而不适合 B+ 树页面的可变长度列存储在单独分配的磁盘页面上，称为**溢出页**。此类列称为页外列。页外列的值存储在溢出页面的单向链接列表中，每个这样的列都有自己的一个或多个溢出页面列表。根据列长度，可变长度列值的全部或前缀存储在 B 树中，以避免浪费存储空间和读取单独的页面。

InnoDB 支持四种行格式，特性各不相同：

- REDUNDANT
- COMPACT
- DYNAMIC
- COMPRESSED

|   行格式   | 紧凑的存储特性 | 增强的可变长度列存储 | 大索引键前缀支持 | 压缩支持 |        支持的表空间类型         |     所需文件格式      |
| :--------: | :------------: | :------------------: | :--------------: | :------: | :-----------------------------: | :-------------------: |
| REDUNDANT  |       否       |          否          |        否        |    否    | system, file-per-table, general | Antelope or Barracuda |
|  COMPACT   |       是       |          否          |        否        |    否    | system, file-per-table, general | Antelope or Barracuda |
|  DYNAMIC   |       是       |          是          |        是        |    否    | system, file-per-table, general |       Barracuda       |
| COMPRESSED |       是       |          是          |        是        |    是    |     file-per-table, general     |       Barracuda       |

变量 `innodb_default_row_format` 定义了默认使用的格式（默认为 DYNAMIC），而在建表（CREATE）或修改表（ALTER）时，也可以使用 `ROW_FORMAT` 选项自定义。

## REDUNDANT

REDUNDANT 格式是 MySQL 5.0 之前的版本使用的行记录格式，其后版本提供该格式是为了向后兼容（兼容旧版本）。

> REDUNDANT 格式是非常原始的行格式，目前已经很少使用了，其占用空间最多，内存碎片化最严重，性能较差。

REDUNDANT 的格式如下图。

![image-20211101135203914](InnoDB-Row-Formats/image-20211101135203914.png)





## COMPACT

COMPACT 行格式的结构如下图。

![image-20211101135347780](InnoDB-Row-Formats/image-20211101135347780.png)

其中，**变长字段长度列表**、**NULL 值列表**和**记录头信息**属于数据之外的额外信息。

变长字段长度列表顾名思义，存储的是变长字段的长度，它按照逆序存储变长列的字节数。例如行中有三列（均为变长类型），从左到右为 c1、c2、c3，长度分别为 1 字节、2 字节、4字节，那么变长字段长度列表中存储的就是 `0x040201`。

当然这里有一个问题，那就是如果变长字段的长度 1 字节存不下怎么办。InnoDB 按照一定的规则去处理这些情况。

对于不同的编码方式，相同字符占用的空间不一定相同，事先约定，某字符集单个字符占用的最大字节数为 `MaxLen`，例如 UTF-8 编码的 `MaxLen` 就是 3。对于变长类型来说，它们一般是限制字符数量而不是字节数量，因此，`VARCHAR(M)` 最多能够存储 `M` 个字符，即 `M * MaxLen` 个字节。这里假设实际存储的字符串的字节数为 `Length`。有了这三个变量，可以设定以下规则。

- 当 `M * MaxLen <= 255`，使用 1 字节来存储变长字段长度。
- 当 `M * MaxLen > 255`，分情况讨论：
  - `Length <= 127`，使用 1 字节来存储变长字段长度。
  - `Length > 127`，使用 2 字节来存储变长字段长度。

## DYNAMIC

## COMPRESSED

