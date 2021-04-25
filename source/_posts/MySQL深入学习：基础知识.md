---
title: MySQL深入学习：基础知识
date: 2021-04-21 19:03:12
categories: 学习笔记
tags:
  - 数据库
  - MySQL
---

{% noteblock quote cyan %}

MySQL 数据库深入学习，有关基础知识的巩固理解。

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

#### 版本历史

1995 年，MySQL 1.0 发布，仅供内部使用。

1996 年，MySQL 3.11.1 发布，直接跳过了 MySQL 2.x 版本。

1999 年，MySQL AB 公司成立。同年，发布 MySQL 3.23，该版本集成了 Berkeley DB 存储引擎。该引擎由 Sleepycat 公司开发，支持事务。在集成该引擎的过程中，对源码进行了改造，为后续可插拔式存储引擎架构奠定了基础。

2000 年，ISAM 升级为 MyISAM 存储引擎。同年，MySQL 基于 GPL 协议开放源码。

2002 年，MySQL 4.0 发布，集成了后来大名鼎鼎的 InnoDB 存储引擎。该引擎由 Innobase 公司开发，支持事务，支持行级锁，适用于 OLTP 等高并发场景。

2005 年，MySQL 5.0 发布，开始支持游标，存储过程，触发器，视图，XA 事务等特性。同年，Oracle 收购 Innobase 公司。

2008 年，Sun 以 10 亿美金收购 MySQL AB。同年，发布 MySQL 5.1，其开始支持定时器（Event scheduler），分区，基于行的复制等特性。

2009 年，Oracle 以 74 亿美金收购 Sun 公司。

2010 年，**MySQL 5.5**发布，其包括如下重要特性及更新。

- InnoDB 代替 MyISAM 成为 MySQL 默认的存储引擎。
- 多核扩展，能更充分地使用多核 CPU。
- InnoDB 的性能提升，包括支持索引的快速创建，表压缩，I/O 子系统的性能提升，PURGE 操作从主线程中剥离出来，Buffer Pool 可拆分为多个 Instances。
- 半同步复制。
- 引入 utf8mb4 字符集，可用来存储 emoji 表情。
- 引入 metadata locks（元数据锁）。
- 分区表的增强，新增两个分区类型：RANGE COLUMNS 和 LIST COLUMNS。
- MySQL 企业版引入线程池。
- 可配置 IO 读写线程的数量（innodb_read_io_threads，innodb_write_io_threads）。在此之前，其数量为 1，且不可配置。
- 引入 innodb_io_capacity 选项，用于控制脏页刷新的数量。

2013 年，**MySQL 5.6**发布，其包括如下重要特性及更新。

- GTID 复制。
- 无损复制。
- 延迟复制。
- 基于库级别的并行复制。
- mysqlbinlog 可远程备份 binlog。
- 对 TIME, DATETIME 和 TIMESTAMP 进行了重构，可支持小数秒。DATETIME 的空间需求也从之前的 8 个字节减少到 5 个字节。
- Online DDL。ALTER 操作不再阻塞 DML。
- 可传输表空间（transportable tablespaces）。
- 统计信息的持久化。避免主从之间或数据库重启后，同一个 SQL 的执行计划有差异。
- 全文索引。
- InnoDB Memcached plugin。
- EXPLAIN 可用来查看 DELETE，INSERT，REPLACE，UPDATE 等 DML 操作的执行计划，在此之前，只支持 SELECT 操作。
- 分区表的增强，包括最大可用分区数增加至 8192，支持分区和非分区表之间的数据交换，操作时显式指定分区。
- Redo Log 总大小的限制从之前的 4G 扩展至 512G。
- Undo Log 可保存在独立表空间中，因其是随机 IO，更适合放到 SSD 中。但仍然不支持空间的自动回收。
- 可 dump 和 load Buffer pool 的状态，避免数据库重启后需要较长的预热时间。
- InnoDB 内部的性能提升，包括拆分 kernel mutex，引入独立的刷新线程，可设置多个 purge 线程。
- 优化器性能提升，引入了 ICP，MRR，BKA 等特性，针对子查询进行了优化。

> 可以说，MySQL 5.6 是 MySQL 历史上一个里程碑式的版本，这也是目前生产上应用得最广泛的版本。

2015 年，**MySQL 5.7**发布，其包括如下重要特性及更新。

- 组复制
- InnoDB Cluster
- 多源复制
- 增强半同步（AFTER_SYNC）
- 基于 WRITESET 的并行复制。
- 在线开启 GTID 复制。
- 在线设置复制过滤规则。
- 在线修改 Buffer pool 的大小。
- 在同一长度编码字节内，修改 VARCHAR 的大小只需修改表的元数据，无需创建临时表。
- 可设置 NUMA 架构的内存分配策略（innodb_numa_interleave）。
- 透明页压缩（Transparent Page Compression）。
- UNDO 表空间的自动回收。
- 查询优化器的重构和增强。
- 可查看当前正在执行的 SQL 的执行计划（EXPLAIN FOR CONNECTION）。
- 引入了查询改写插件（Query Rewrite Plugin），可在服务端对查询进行改写。
- EXPLAIN FORMAT=JSON 会显示成本信息，这样可直观的比较两种执行计划的优劣。
- 引入了虚拟列，类似于 Oracle 中的函数索引。
- 新实例不再默认创建 test 数据库及匿名用户。
- 引入 ALTER USER 命令，可用来修改用户密码，密码的过期策略，及锁定用户等。
- mysql.user 表中存储密码的字段从 password 修改为 authentication_string。
- 表空间加密。
- 优化了 Performance Schema，其内存使用减少。
- Performance Schema 引入了众多 instrumentation。常用的有 Memory usage instrumentation，可用来查看 MySQL 的内存使用情况，Metadata Locking Instrumentation，可用来查看 MDL 的持有情况，Stage Progress instrumentation，可用来查看 Online DDL 的进度。
- 同一触发事件（INSERT，DELETE，UPDATE），同一触发时间（BEFORE，AFTER），允许创建多个触发器。在此之前，只允许创建一个触发器。
- InnoDB 原生支持分区表，在此之前，是通过 ha_partition 接口来实现的。
- 分区表支持可传输表空间特性。
- 集成了 SYS 数据库，简化了 MySQL 的管理及异常问题的定位。
- 原生支持 JSON 类型，并引入了众多 JSON 函数。
- 引入了新的逻辑备份工具-mysqlpump，支持表级别的多线程备份。
- 引入了新的客户端工具-mysqlsh，其支持三种语言：JavaScript, Python and SQL。两种 API：X DevAPI，AdminAPI，其中，前者可将 MySQL 作为文档型数据库进行操作，后者用于管理 InnoDB Cluster。
- mysql_install_db 被 mysqld --initialize 代替，用来进行实例的初始化。
- 原生支持 systemd。
- 引入了 super_read_only 选项。
- 可设置 SELECT 操作的超时时长（max_execution_time）。
- 可通过 SHUTDOWN 命令关闭 MySQL 实例。
- 引入了 innodb_deadlock_detect 选项，在高并发场景下，可使用该选项来关闭死锁检测。
- 引入了 Optimizer Hints，可在语句级别控制优化器的行为，如是否开启 ICP，MRR 等，在此之前，只有 Index Hints。
- GIS 的增强，包括使用 Boost.Geometry 替代之前的 GIS 算法，InnoDB 开始支持空间索引。

2018 年，**MySQL 8.0**发布，其包括如下重要特性及更新。

- 引入了原生的，基于 InnoDB 的数据字典。数据字典表位于 mysql 库中，对用户不可见，同 mysql 库的其它系统表一样，保存在数据目录下的 mysql.ibd 文件中。不再置于 mysql 目录下。
- Atomic DDL。
- 重构了 INFORMATION_SCHEMA，其中，部分表已重构为基于数据字典的视图，在此之前，其为临时表。
- PERFORMANCE_SCHEMA 查询性能提升，其已内置多个索引。
- 不可见索引（Invisible index）。
- 降序索引。
- 直方图。
- 公用表表达式（Common table expressions）。
- 窗口函数（Window functions）。
- 角色（Role）。
- 资源组（Resource Groups），可用来控制线程的优先级及其能使用的资源，目前，能被管理的资源只有 CPU。
- 引入了 innodb_dedicated_server 选项，可基于服务器的内存来动态设置 innodb_buffer_pool_size，innodb_log_file_size 和 innodb_flush_method。
- 快速加列（ALGORITHM=INSTANT）。
- JSON 字段的部分更新（JSON Partial Updates）。
- 自增主键的持久化。
- 可持久化全局变量（SET PERSIST）。
- 默认字符集由 latin1 修改为 utf8mb4。
- 默认开启 UNDO 表空间，且支持在线调整数量（innodb_undo_tablespaces）。在 MySQL 5.7 中，默认不开启，若要开启，只能初始化时设置。
- 备份锁。
- Redo Log 的优化，包括允许多个用户线程并发写入 log buffer，可动态修改 innodb_log_buffer_size 的大小。
- 默认的认证插件由 mysql_native_password 更改为 caching_sha2_password。
- 默认的内存临时表由 MEMORY 引擎更改为 TempTable 引擎，相比于前者，后者支持以变长方式存储 VARCHAR，VARBINARY 等变长字段。从 MySQL 8.0.13 开始，TempTable 引擎支持 BLOB 字段。
- Grant 不再隐式创建用户。
- SELECT ... FOR SHARE 和 SELECT ... FOR UPDATE 语句中引入 NOWAIT 和 SKIP LOCKED 选项，解决电商场景热点行问题。
- 正则表达式的增强，新增了 4 个相关函数，REGEXP_INSTR()，REGEXP_LIKE()，REGEXP_REPLACE()，REGEXP_SUBSTR()。
- 查询优化器在制定执行计划时，会考虑数据是否在 Buffer Pool 中。而在此之前，是假设数据都在磁盘中。
- ha_partition 接口从代码层移除，如果要使用分区表，只能使用 InnoDB 存储引擎。
- 引入了更多细粒度的权限来替代 SUPER 权限，现在授予 SUPER 权限会提示 warning。
- GROUP BY 语句不再隐式排序。
- MySQL 5.7 引入的表空间加密特性可对 Redo Log 和 Undo Log 进行加密。
- information_schema 中的 innodb_locks 和 innodb_lock_waits 表被移除，取而代之的是 performance_schema 中的 data_locks 和 data_lock_waits 表。
- 引入 performance_schema.variables_info 表，记录了参数的来源及修改情况。
- 增加了对于客户端报错信息的统计（performance_schema.events_errors_summary_xxx）。
- 可统计查询的响应时间分布（call sys.ps_statement_avg_latency_histogram()）。
- 支持直接修改列名（ALTER TABLE ... RENAME COLUMN old_name TO new_name）。
- 用户密码可设置重试策略（Reuse Policy）。
- 移除 PASSWORD()函数。这就意味着无法通过“SET PASSWORD ... = PASSWORD('auth_string') ”命令修改用户密码。
- 代码层移除 Query Cache 模块，故 Query Cache 相关的变量和操作均不再支持。
- BLOB, TEXT, GEOMETRY 和 JSON 字段允许设置默认值。
- 可通过 RESTART 命令重启 MySQL 实例。

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
