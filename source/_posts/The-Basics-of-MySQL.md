---
title: "The Basics of MySQL"
date: 2021-04-21 19:03:12
link: basics-of-mysql
categories: 学习笔记
tags:
  - Database
  - MySQL
urlname: mysql-basic
---

{% noteblock quote cyan %}
本文是对 MySQL 的学习总结，包含 MySQL 数据库系统的基础知识。
{% endnoteblock %}

<!-- more -->

## 基本概念

### Database

1. 数据库（database）：保存有组织数据的容器（通常是一个文件或一组文件）
2. 表（table）：一种结构化的清单文件，可用于存储特定类型的数据
3. 模式（schema）：关于数据库和表的布局及特性信息
4. 列（column）：表中的一个字段，属于同一种类的一组数据
5. 数据类型（datatype）：数据库中每列都有特定的一种数据类型，如数字、字符串等
6. 行（row）：表中的一个记录（record），是相关联（属于同一对象）的一组数据
7. 主键（primary key）：表中每一行都应有的唯一标识符，能够区分每一个行，但并非必须存在主键，通常不进行更新操作
8. DBMS 按照应用场景可分为两类：

   - 基于共享文件系统的 DBMS：通常应用于桌面环境，不用于高端和关键应用（如 Microsoft Access）
   - 基于 C/S 的 DBMS：通常用于服务器，只将结果发送到客户端（如 MySQL）

### SQL

SQL（Structured Query Language，结构化查询语言）是一种专门用来与数据库通信的语言，其并非是编程语言。

SQL 的优点：

- SQL 并不指定某一个 DBMS，在大多数 DBMS 中 SQL 都是通用的（但是不同的 DBMS 可能有不同的实现）
- SQL 语法简单
- SQL 能够进行复杂的数据库操作

### MySQL

MySQL 是一个 RDBMS，即关系数据库管理系统，广泛应用于各个领域，它的主要特点有：

- 开源，免费使用
- 性能较好
- 简单易上手

## 命令行操作

使用`mysql -u[user] -p[pass]`命令进入 mysql 命令模式。

这里给出常用的参数：

```
-u // 指定用户名
-p // 指定密码
-P // 指定端口
-h // 指定主机名
```

### 命令规范

- 命令输入在`mysql>`之后；
- 每条命令都使用`;`结束；
- 使用`help`命令查看帮助信息。

### 命令

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

## 数据操作（DML）

_Data Manipulation Language_

### 查询

#### 简单查询

```mysql
select * from tbl_name;
select col_name from tbl_name;
select distinct col_name from tbl_name;
select * from tbl_name limit n;
select * from tbl_name limit m,n; -- m 开始位置 n 数量
select * from tbl_name limit n offset m;
select tbl_name.col_name from db_name.tbl_name;
```

#### 排序

```mysql
select * from tbl_name order by col_name;
select * from tbl_name order by col_name asc; -- 等同于上一句
select * from tbl_name order by col_name desc;
select * from tbl_name order by col_name_1, col_name_2;
```

#### 过滤

##### 基础过滤

```mysql
select * from tbl_name where col_name = k;
select * from tbl_name where col_name > k;
select * from tbl_name where col_name != k;
select * from tbl_name where col_name <> k; -- 同上
select * from tbl_name where col_name between x and y; -- 闭区间
select * from tbl_name where col_name is null;
```

##### 高级过滤

```mysql
select * from tbl_name where condition_1 and condition_2;
select * from tbl_name where condition_1 or condition_2; -- and 优先级大于 or
select * from tbl_name where condition_1 or condition_2 and condition_3;
select * from tbl_name where condition_1 or (condition_2 and condition_3); -- 同上
select * from tbl_name where col_name in (x,y);
select * from tbl_name where col_name = x or col_name = y; -- 同上
select * from tbl_name where col_name not in (x,y);
select * from tbl_name where col_name != x and col_name != y; -- 同上
```

##### 通配符

```mysql
select * from tbl_name where col_name like 'xxx%';
select * from tbl_name where col_name like '%xxx';
select * from tbl_name where col_name like '%xxx%';
select * from tbl_name where col_name like '_xxx'; -- 单个字符
```

##### Regexp

#### 计算

```mysql
select concat(col_name_1, '(', col_name_2, ')') from tbl_name; -- concat 拼接字符串，得到 col_name_1(col_name_2)
select concat(col_name_1, '(', col_name_2, ')') as alias_name from tbl_name; -- 别名（导出列）
select col_name_1 as alias_name_1, col_name_2 as alias_name_2 from tbl_name;
select 1+2; -- 3
select 1-2; -- -1
select 1*2; -- 2
select 1/2; -- 0.5000
select 253%7; -- 1
select col_name_1 * col_name_2 as alias_name from tbl_name;
```

#### 函数

##### 字符串

- rtrim(str): 删除右空格
- ltrim(str)
- trim(str)
- upper(str): 转全大写
- lower(str)
- right(str, len): 返回从右起 len 个字符
- left(str, len)
- locate(substr, str): 返回子串位置，下标从 1 始，不存在返回 0

##### 日期与时间

- curdate(): 当前日期
- curtime()
- now(): 当前日期与时间
- date(str): 返回时间字符串的日期部分
- time(str)
- year(str)
- day(str)
- hour(str)
- minute(str)
- second(str)
- dayofweek(str): 返回日期对应的是星期几
- adddate('2008-01-02', interval 31 day) -> '2008-02-02'
- date_add(str, format_str): 同 adddate() 但操作更灵活
- addtime('2007-12-31 23:59:59.999999', '1 1:1:1.000002') -> '2008-01-02 01:01:01.000001'
- datediff('2007-12-31 23:59:59','2007-12-30') -> 1
- date_format('2009-10-04 22:23:00', '%W %M %Y') -> 'Sunday October 2009'

##### 数值处理

- abs(num)
- sin(num)
- cos(num)
- tan(num)
- exp(num): $e^{num}$
- mod(num_1, num_2): 等同于 num_1 % num_2
- pi()
- rand(): 返回一个随机数
- sqrt(num)

##### 聚集函数

- avg(col_name)
- count(col_name)
- max(col_name)
- min(col_name)
- sum(col_name)

```mysql
select * from tbl_name where date(col_name) between '2020-01-01' and '2020-01-31';
select * from tbl_name where year(col_name) = 2020 and month(col_name) = 1; -- 同上
select num_1 mod num_2; -- 同 num_1 % num_2
select avg(distinct col_name) as alias_name from tbl_name;
select count(distinct col_name) from tbl_name where conditions;
```

#### 分组

```mysql
select col_name, count(*) from tbl_name group by col_name;
select col_name, count(*) from tbl_name group by col_name with rollup; -- 最后一条记录输出汇总的数据，如 count(*) 的总和
select col_name, count(*) as number from tbl_name group by col_name having conditions; -- 使用条件过滤分组
select col_name, count(*) from tbl_name group by col_name with rollup having number > 1; -- 条件为 count(*) 大于 1
select col_name_1, count(*) as alias_name from tbl_name where condition_1 group by col_name_2 having condition_2;
```

#### 子查询

```mysql
select col_name_1 from tbl_name where col_name_2 in (select col_name_2 from tbl_name where condition);
select * from tbl_name where id > (select 1+2); -- id > 3
```

#### 连接

##### 基础连接

```mysql
select tbl_name_1.col_name_1 from tbl_name_1, tbl_name_2 where tbl_name_1.col_name_2 = tbl_name_2.col_name_2 and condition; -- 使用完全限定列名查询多个表中的多个列
select * from tbl_name_1 inner join tbl_name_2 on tbl_name_1.col_name = tbl_name_2.col_name where condition; -- 内连接，结果同上，返回限定列相同的多表交集
```

##### 高级连接

```mysql
select * from tbl_name_1 as t1 inner join tbl_name_2 as t2 on t1.col_name = t2.col_name where condition; -- Table Alias，用户不可见
select * from tbl_name_1 left outer join tbl_name_2 on  tbl_name_1.col_name = tbl_name_2.col_name where condition; -- 左外连接
select col_name from tbl_name where condition_1 union select col_name from tbl_name where condition_2; -- 组合查询
select col_name from tbl_name_1 where condition_1 union select col_name from tbl_name_2 where condition_2; -- 组合查询
select col_name from tbl_name where condition_1 union all select col_name from tbl_name where condition_2; -- 不进行去重
```

#### 全文查找

MyISAM 支持全文本搜索，而 InnoDB 不支持。

### 创建

```mysql
insert into tbl_name values(value_1, value_2 ...);
insert into tbl_name(col_name_1, col_name_2 ...) values(value_1, value_2 ...);
insert into tbl_name(col_name_1, col_name_2 ...) values(value_1, value_2 ...), (value_a, value_b ...); -- 插入多行
insert into tbl_name_1(col_name_1, col_name_2 ...) select col_name_1, col_name_2 ... from tbl_name_2; -- 查询 tbl_name_2 的数据 插入到 tbl_name_1
```

### 更新

```mysql
update tbl_name set col_name_1 = value_1, col_name_2 = value_2 where condition; -- 多行操作出错整体回滚
update ignore tbl_name set col_name_1 = value_1, col_name_2 = value_2 where condition; -- 多行操作出错继续
```

### 删除

```mysql
delete from tbl_name where condition;
truncate table tbl_name; -- 删除表内所有数据（更快的操作，实际是删除原表重建新表）
```

## 数据定义（DDL）

_Data Definition Language_

### 表（Table）

#### 创建

```mysql
create table tbl_name (
    uid int not null auto_increment,
    username varchar(8) not null,
    age int not null default 10,
    primary key (uid)
) engine=InnoDB;
```

#### 更新

```mysql
alter table tbl_name add col_name int; -- 增加一个新列
alter table tbl_name drop column col_name; -- 删除一个新列
```

#### 删除

```mysql
drop table tbl_name;
```

#### 清空

```mysql
truncate table tbl_name; -- 创建一个空表，删除原表
```

#### 重命名

```mysql
rename table tbl_name to new_tbl_name;
rename table tbl_name_1 to new_tbl_name_1, tbl_name_2 to new_tbl_name_2;
```

### 视图（View）

```mysql
create view view_name as select col_name from tbl_name where condition; -- 创建视图
select * from view_name where condition; -- 使用视图
```

## 存储过程（Stored Procedure）

### 创建

```mysql
create procedure procedure_name()
begin
    select ... from ... ;
end;
```

```mysql
create procedure procedure_name(
    out name_1 decimal(8,2), -- out 将形参传回实参
    in name_2 int -- in 将实参传给形参
    -- inout 实参传入形参，并由形参改变实参
)
begin
    select ...
    from ...
    where name_2 = ...
    into name_1; -- 将查询结果存入 name_1
end;
```

### 调用

```mysql
call procedure_name();
call procedure_name(@var_1, 2000); -- out 用来接收，in 传入
select @var_1; -- 获取变量值
```

### 删除

```mysql
drop procedure procedure_name;
```

## 游标（Cursor）

```mysql
create procedure procedure_name()
begin
    -- Declare local variables
    declare var_1 int;

    -- Declare the cursor
    declare cursor_name cursor
    for
    select ... from ... ;

    -- Open the cursor
    open cursor_name;

    -- Query
    fetch cursor_name into var_1; -- 将查询结果存入 var_1

    -- Close the cursor
    close cursor_name;

    -- Reopen the cursor
    open cursor_name;
end; -- 未关闭的 cursor 在 end 时隐含关闭
```

## 触发器（Trigger）

## 事务（Transaction）

### Start

```mysql
select ... from ... where ... ;
start transaction; -- 开启事务
delete from ... where ... ;
insert into ... values( ... );
rollback; -- 回滚，事务自动关闭
select ... from ... where ... ;
```

### Commit

```mysql
start transaction;
...
commit; -- 如果事务语句存在错误会被自动撤销，事务自动关闭
```

### Savepoint

```mysql
savepoint sp_name; -- 当前状态
rollback to sp_name; -- 回滚到 sp_name 检查点
```
