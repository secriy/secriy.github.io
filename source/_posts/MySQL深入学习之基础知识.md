---
title: MySQL深入学习之基础知识
date: 2021-04-21 19:03:12
categories: 学习笔记
tags:
  - Database
  - MySQL
---

{% noteblock quote cyan %}
本文是对 MySQL 的学习总结，包含 MySQL 数据库系统的基础知识。
{% endnoteblock %}

<!-- more -->

## 数据库

### 常见概念

1. 数据库（database）：保存有组织数据的容器（通常是一个文件或一组文件）
2. 表（table）：一种结构化的清单文件，可用于存储特定类型的数据
3. 模式（schema）：关于数据库和表的布局及特性信息
4. 列（column）：表中的一个字段，属于同一种类的一组数据
5. 数据类型（datatype）：数据库中每列都有特定的一种数据类型，如数字、字符串等
6. 行（row）：表中的一个记录（record），是相关联（属于同一对象）的一组数据
7. 主键（primary key）：表中每一行都应有的唯一标识符，能够区分每一个行，但并非必须存在主键，通常不进行更新操作

### SQL

SQL（Structured Query Language，结构化查询语言）是一种专门用来与数据库通信的语言，其并非是编程语言。

SQL 的优点：

- SQL 并不指定某一个 DBMS，在大多数 DBMS 中 SQL 都是通用的（但是不同的 DBMS 可能有不同的实现）
- SQL 语法简单
- SQL 能够进行复杂的数据库操作

## MySQL

### 介绍

MySQL 是一个 RDBMS，即关系数据库管理系统，广泛应用于各个领域，它的主要特点有：

- 开源，免费使用
- 性能较好
- 简单易上手

#### DBMS 分类

DBMS 按照应用场景可分为两类：

- 基于共享文件系统的 DBMS：通常应用于桌面环境，不用于高端和关键应用（如 Microsoft Access）
- 基于 C/S 的 DBMS：通常用于服务器，只将结果发送到客户端（如 MySQL）

### 命令行操作

使用`mysql -u[user] -p[pass]`命令进入 mysql 命令模式

这里给出常用的参数：

```
-u // 指定用户名
-p // 指定密码
-P // 指定端口
-h // 指定主机名
```

#### 命令规范

- 命令输入在`mysql>`之后
- 每条命令都使用`;`结束
- 使用`help`命令查看帮助信息

#### 命令

使用`help`命令查看所有命令：

```shell
mysql> help

For information about MySQL products and services, visit:
   http://www.mysql.com/
For developer information, including the MySQL Reference Manual, visit:
   http://dev.mysql.com/
To buy MySQL Enterprise support, training, or other products, visit:
   https://shop.mysql.com/

List of all MySQL commands:
Note that all text commands must be first on line and end with ';'
?         (\?) Synonym for `help'.
clear     (\c) Clear the current input statement.
connect   (\r) Reconnect to the server. Optional arguments are db and host.
delimiter (\d) Set statement delimiter.
ego       (\G) Send command to mysql server, display result vertically.
exit      (\q) Exit mysql. Same as quit.
go        (\g) Send command to mysql server.
help      (\h) Display this help.
notee     (\t) Don't write into outfile.
print     (\p) Print current command.
prompt    (\R) Change your mysql prompt.
quit      (\q) Quit mysql.
rehash    (\#) Rebuild completion hash.
source    (\.) Execute an SQL script file. Takes a file name as an argument.
status    (\s) Get status information from the server.
system    (\!) Execute a system shell command.
tee       (\T) Set outfile [to_outfile]. Append everything into given outfile.
use       (\u) Use another database. Takes database name as argument.
charset   (\C) Switch to another charset. Might be needed for processing binlog with multi-byte charsets.
warnings  (\W) Show warnings after every statement.
nowarning (\w) Don't show warnings after every statement.
resetconnection(\x) Clean session context.

For server side help, type 'help contents'
```

查询所有数据库：

```shell
mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| sys                |
+--------------------+
4 rows in set (0.01 sec)
```

切换到某一个数据库：

```shell
mysql> use [db_name];
Database changed
```

查询当前选择的数据库中的所有可用表：

```shell
mysql> show tables;
mysql> show tables from [db_name]; // 查询指定数据库中的所有可用表
+-------------------+
| Tables_in_acgfate |
+-------------------+
| accounts          |
| users             |
+-------------------+
2 rows in set (0.01 sec)
```

查询指定表中的所有列：

```shell
mysql> show columns from [table];
+------------+------------------+------+-----+---------+----------------+
| Field      | Type             | Null | Key | Default | Extra          |
+------------+------------------+------+-----+---------+----------------+
| id         | bigint unsigned  | NO   | PRI | NULL    | auto_increment |
| created_at | datetime(3)      | YES  |     | NULL    |                |
| updated_at | datetime(3)      | YES  |     | NULL    |                |
| deleted_at | datetime(3)      | YES  | MUL | NULL    |                |
| username   | longtext         | YES  |     | NULL    |                |
| password   | longtext         | YES  |     | NULL    |                |
| nickname   | longtext         | YES  |     | NULL    |                |
| mail       | longtext         | YES  |     | NULL    |                |
| avatar     | longtext         | YES  |     | NULL    |                |
| gender     | longtext         | YES  |     | NULL    |                |
| level      | tinyint unsigned | YES  |     | NULL    |                |
| join_time  | datetime(3)      | YES  |     | NULL    |                |
| silence    | tinyint(1)       | YES  |     | NULL    |                |
+------------+------------------+------+-----+---------+----------------+
13 rows in set (0.01 sec)
```

### 数据操作

#### 查询

##### 简单查询

###### 按列查询

```sql
SELECT [column] FROM [table];
SELECT [column1], [column2] FROM [table];
SELECT * FROM [table];
```

- 以上的简单查询语句得到的记录列表顺序是以数据底层的顺序为依据，而不是记录的先后顺序
- SQL 语句关键字不区分大小写
- SQL 语句中所有的空格会被忽略

###### 查询不同的行

表中某些列的数据可能是存在重复的，使用`DISTINCT`关键字可以查询不重复的单列记录：

```sql
SELECT DISTINCT [column] FROM [table]
```

- 当指定多个列时，DISTINCT 会应用于所有的这些列，也就是多个列的唯一组合，如：

  | city | provience |
  | :--: | :-------: |
  |  A1  |    LA     |
  |  A2  |    LA     |
  |  A1  |    LB     |

- 当存在多个`NULL`值时，会把其当作同名看待，最终只返回一个`NULL`

###### 限制结果

使用`LIMIT`子句可以限定查询的范围，而不是查询整个表的记录：

```sql
SELECT [column] FROM [table] LIMIT 5; // 查询前5行
SELECT [column] FROM [table] LIMIT 5, 5 // 查询从第6行开始的5条记录
```

- 使用 LIMIT 查询得到的结果是按照记录顺序有序输出的
- `LIMIT num1, num2`中，num1 从 0 开始，因此 5 代表第六行
- 当 LIMIT 指定的行数大于符合条件的记录数时，返回最大的记录条数

###### 限定表名

```sql
SELECT [table].[column] FROM [table]
```

##### 排序查询

###### 按指定列排序

```sql
SELECT [column1] FROM [table] ORDER BY [column2]
SELECT [column1] FROM [table] ORDER BY [column2] DESC // 按降序排序
```

- ORDER BY 默认升序排序
- 选择排序的列并不一定要显示
- 排序的规则（如 A 和 a 的大小）取决于数据库的设置，在字典排序中，A 被视为与 a 相同

###### 按多个列排序

```sql
SELECT [column1] FROM [table] ORDER BY [column2], [column3]
SELECT [column1] FROM [table] ORDER BY [column2] DESC, [column3]
```

- 排序时会按照从左到右的顺序，首先按`[column2]`，排序，接着使用`[column3]`排序
- 可以将`DESC`放在指定列的后面让这一列降序排序

##### 条件查询
