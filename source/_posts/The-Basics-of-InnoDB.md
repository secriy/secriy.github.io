---
title: "The Basics of InnoDB"
date: 2021-09-21 09:17:14
urlname: basics-of-innodb
categories: 学习笔记
tags:
  - Database
  - MySQL
references:
  - title: MySQL 5.7 Reference Manual
    url: https://dev.mysql.com/doc/refman/5.7/en/
---

{% noteblock quote cyan %}

本文是 MySQL InnoDB 存储引擎的相关基础知识总结，主要是对 MySQL 5.7 官方文档 InnoDB 部分进行的翻译和精简，但参考一些书籍和第三方资料进行了补充。由于最近准备面试，看了很多相关的书籍和面经总结，感觉它们大同小异，后来发现自官方文档已经对相关知识作了详细的总结，但鲜有人进行翻译整理。因此个人打算对照官方文档的“一手资料”以及其他相关书籍看一遍，梳理总结。本文翻译可能引起歧义的地方都会注明英文原文，以确保不会误导读者。

{% endnoteblock %}

<!-- more -->

## InnoDB 介绍

> `InnoDB` is a general-purpose storage engine that balances high reliability and high performance. In MySQL 5.7, `InnoDB` is the default MySQL storage engine. Unless you have configured a different default storage engine, issuing a [`CREATE TABLE`](https://dev.mysql.com/doc/refman/5.7/en/create-table.html) statement without an `ENGINE` clause creates an `InnoDB` table.
>
> InnoDB 是一个平衡了高可靠性和高性能的通用存储引擎。在 MySQL 5.7 中，InnoDB 是默认的 MySQL 存储引擎。

查看当前使用的数据库版本支持哪些存储引擎：

```mysql
SHOW ENGINES;

SELECT * FROM INFORMATION_SCHEMA.ENGINES;
```

### InnoDB 的主要优势

- 其 DML（Data Manipulation Language，数据操纵语言）操作遵循 ACID 模型，提供带有提交（commit）、回滚（rollback）、崩溃恢复（crash-recovery）能力的事务（transaction）机制。
- 支持行级锁（row-level locking）以及 Oracle 风格的一致读取，提高了多用户并发性和性能。
- InnoDB 基于主键（primary key）在磁盘上排列数据来优化查询。每个 InnDB 表都有一个被称作**聚集索引**（*clustered index*）的主键索引去组织数据，它能够最小化主键查找的 I/O 开销。
- InnoDB 支持外键约束，使用外键时会检查插入、更新和删除，以确保它们不会导致相关表之间的不一致。

### InnoDB 最佳实践

本节介绍使用 InnoDB 表时的最佳实践，即优化性能等方面的实践。

>   从官方提供的最佳实践能够看出一部分 InnoDB 的优势、它能够解决的问题以及它存在的问题。

- 使用最常查询的一列或多列为每个表指定主键，如果没有明显的主键，则为其指定自动递增值。
- 使用联接来从多个带有相同 ID 值的表中查询数据。为了提高联接的性能，在联接的列上定义外键，并在每个表中对这些列定义相同的数据类型。添加外键可确保引用的列被索引，从而提高性能。外键还会将删除和更新操作传递到所有其他受影响的表中，如果父表中不存在相应的 ID，则会阻止在子表中插入数据。
- 关闭自动提交。每秒提交数百次会降低性能（受存储设备的写入速度限制）。
- 使用 `START TRANSACTION` 和 `COMMIT` 语句将相关 DML 操作集合括起来，将它们分组到事务中。虽然不应该 commit 太频繁，但保留大量的未提交语句（`INSERT`，`UPDATE`，`DELETE`），让其执行数个小时也是不合适的。
- 不要使用 `LOCK TABLES` 语句。InnoDB 不需要牺牲可靠性和性能就可以处理多个会话并同时对同一个表进行读写。要获得对多个行的独占写入权限，请使用 `SELECT ... FOR UPDATE` 语法，这样仅会锁定要更新的行。
- 启用 `innodb_file_per_table` 变量或使用常规表空间，从而将表的数据和索引放入单独的文件中，而不是去使用系统表空间。默认情况下，`innodb_file_per_table` 变量处于启用状态。
- 评估你的数据和访问模式是否受益于 InnoDB 表或页面的压缩功能。你可以在不牺牲读/写功能的情况下压缩 InnoDB 表。
- 使用 `--sql_mode=NO_ENGINE_SUBSTITUTION` 选项运行服务器，以防止使用不希望使用的存储引擎创建表。

## ACID 模型

> The [ACID](https://dev.mysql.com/doc/refman/5.7/en/glossary.html#glos_acid) model is a set of database design principles that emphasize aspects of reliability that are important for business data and mission-critical applications. MySQL includes components such as the `InnoDB` storage engine that adhere closely to the ACID model so that data is not corrupted and results are not distorted by exceptional conditions such as software crashes and hardware malfunctions. When you rely on ACID-compliant features, you do not need to reinvent the wheel of consistency checking and crash recovery mechanisms. In cases where you have additional software safeguards, ultra-reliable hardware, or an application that can tolerate a small amount of data loss or inconsistency, you can adjust MySQL settings to trade some of the ACID reliability for greater performance or throughput.
>
> ACID 模型是一组数据库设计原则，强调对业务数据和任务关键型应用程序非常重要的可靠性方面。MySQL 包含 InnoDB 存储引擎等组件，这些组件与 ACID 模型紧密相连，因此数据不会被破坏，结果不会因为软件的崩溃和硬件的故障等异常情况而不正确。当你依赖与 ACID 兼容的功能时，无需重新发明一致性检查和崩溃恢复机制。如果你已经有了额外的软件保护措施、超可靠的硬件或是应用程序能够容忍少量数据丢失以及数据不一致，你可以调整 MySQL 设置，以牺牲一些 ACID 可靠性来获得更高的性能或吞吐量。

简而言之，InnoDB 存储引擎实现了 ACID 模型来保证数据和操作的可靠性，让用户不需要进行多余的操作就能够保证可靠。并且，当用户使用了其他方式来保证可靠性时，在存储引擎层面上可以不完全遵守 ACID 来提高性能和吞吐量。

- **A**: atomicity（原子性）
- **C**: consistency（一致性）
- **I**: isolation（隔离性）
- **D**: durability（持久性）

### Atomicity

ACID 模型的原子性方面主要涉及到 InnoDB 的事务机制，相关 MySQL 功能包括：

- `autocommit` 设置。
- `COMMIT` 语句。
- `ROLLBACK` 语句。

一致性体现在事务是可以提交或回滚的原子（atomic）工作单元。当事务对数据库进行多次更改时，提交（commit）事务时所有更改都会成功，或者回滚（rollback）事务时所有更改都会撤消。

### Consistency

ACID 模型的一致性方面主要涉及 InnoDB 防止数据崩溃的内部处理。相关 MySQL 功能包括：

- InnoDB 的**双写缓冲**（*doublewrite buffer*）。
- InnoDB 的**崩溃恢复**（*crash recovery*）机制。

在每次提交或回滚之后，以及在事务进行期间，数据库始终保持一致状态。如果跨多个表更新相关数据，查询将看到所有旧值或所有新值，而不是新旧值的混合。

也就是说一个事务对多个表进行了更新，另外一个新的查询不可能查询到一部分表是更新了而另一些表却没有这次更新。

### Isolation

ACID 模型的隔离性方面主要涉及到 InnoDB 的事务机制，特别是应用于每个事务的隔离级别。相关 MySQL 功能包括：

- `autocommit` 设置。
- 事务的**隔离级别**和 `SET Transaction` 语句。
- InnoDB 锁的底层细节。

多个事务在进行过程中相互保护（隔离），它们之间不能相互干扰，也不能看到彼此未提交的数据。这种隔离是通过锁（locking）机制实现的。有经验的用户可以调整隔离级别，在确保事务不会相互干扰的情况下，以较少的保护换取更高的性能和并发性。

### Durability

ACID 模型的持久性方面涉及 MySQL 软件功能与特定硬件配置的交互。与 MySQL 相关的功能包括：

- InnoDB 的**双写缓冲**（*doublewrite buffer*）。
- `innodb_flush_log_at_trx_commit` 变量。
- `sync_binlog` 变量。
- `innodb_file_per_table` 变量。
- 存储设备（如磁盘驱动器、SSD 或 RAID 阵列）中的写入缓冲区。
- 存储设备中的电池供电缓存。
- 用于运行 MySQL 的操作系统，特别是它对 `fsync()` 系统调用的支持。
- 不间断电源（UPS），用于保护运行 MySQL 服务器和存储 MySQL 数据的所有计算机服务器和存储设备的电源。
- 备份策略，例如备份的频率和类型，以及备份保留期。
- 对于分布式或托管数据应用程序，MySQL 服务器硬件所在的数据中心的特定特征以及数据中心之间的网络连接。

持久性体现在事务的结果是持久的————一旦提交操作成功，该事务所做的更改就不会受到电源故障、系统崩溃、竞争条件或其他潜在危险的影响。持久性通常涉及到写入磁盘存储，具有一定数量的冗余，以防止写入操作期间出现电源故障或软件崩溃。（在 InnoDB 中，doublewrite 缓冲区有助于提高持久性。）

## Multi-Versioning

> `InnoDB` is a multi-version storage engine. It keeps information about old versions of changed rows to support transactional features such as concurrency and rollback. This information is stored in the system tablespace or undo tablespaces in a data structure called a rollback segment. `InnoDB` uses the information in the rollback segment to perform the undo operations needed in a transaction rollback. It also uses the information to build earlier versions of a row for a consistent read.
>
> InnoDB 是一个多版本存储引擎。它保留有关已更改行的旧版本信息，以支持事务性功能，如并发（concurrency）和回滚（rollback）。此信息存储在系统表空间或撤消（undo）表空间称为回滚段（rollback segment）的数据结构中。InnoDB 使用回滚段中的信息执行事务回滚所需的撤消操作。它还使用这些信息构建行的早期版本，以实现一致的读取。

InnoDB 在内部向数据库中存储的每一行添加三个字段：

- 6 字节的 `DB_TRX_ID` 字段表示插入或更新行的最后一个事务的事务标识符。此外，删除在内部被视为更新，行中的特殊位设置标记为已删除。

- 7 字节的 `DB_ROLL_PTR` 字段，称为滚动指针。滚动指针指向写入回滚段的撤消日志（undo log）记录。如果行已更新，则撤消日志记录包含更新前重建行内容所需的信息。

- 6 字节的 `DB_ROW_ID` 字段包含一个随着插入新行而单调增加的行 ID。如果 InnoDB 自动生成聚集索引，则该索引包含行 ID 值。否则，`DB_ROW_ID` 列不会出现在任何索引中。

  > 当用户没有**显式指定主键**且表中不存在**非空唯一索引**时，InnoDB 会自动生成聚集索引，使用的主键是 `DB_ROW_ID`。

回滚段中的 undo log 分为 *insert undo log* 和 *update undo log*。insert undo log 仅在事务回滚中需要，并且可以在事务提交后立即丢弃。update undo log 也用于一致性读取，但只有在当前不存在 InnoDB 已为其分配快照的事务时，才能丢弃 update undo log。在一致性读取中，快照可能需要更新撤消日志中的信息来构建数据库行的早期版本。

建议定期提交事务，包括仅发出一致读取的事务。否则，InnoDB 无法丢弃 update undo log 中的数据，回滚段可能会变得太大，填满它所在的表空间。

回滚段中 undo log 记录的物理大小通常小于相应的插入或更新行。可以使用此信息计算回滚段所需的空间。

在 InnoDB 多版本控制方案中，使用 SQL 语句删除某一行时，该行不会立即从数据库中物理删除。InnoDB 仅在丢弃**为了删除操作而写入**的 update undo log 记录时，才从物理上删除相应的行及其索引记录。此删除操作称为清除（purge），速度相当快，通常与执行删除的 SQL 语句的时间顺序相同。

如果以大约相同的速率在表中小批量插入和删除行，则清除线程可能会开始落后，并且由于这些“死（dead）”行的存在，表可能会变得越来越大，使所有内容都绑定在磁盘上并且速度非常慢。在这种情况下，通过调整 `innodb_max_purge_lag` 系统变量来限制新行操作，并为清除线程分配更多资源。

### MVCC 和二级索引

InnoDB 多版本并发控制（MVCC）处理二级索引的方式与处理聚集索引的方式不同。聚集索引中的记录会就地更新，其隐藏的系统列指向撤消日志项，从中可以重构早期版本的记录。与聚集索引记录不同，二级索引记录不包含隐藏的系统列，也不进行就地更新。

更新二级索引列时，旧的二级索引记录将被标记为删除，新记录将被插入，删除标记的记录最终将被清除。当二级索引记录被标记为删除，或者二级索引页被较新的事务更新时，InnoDB 会在聚集索引中查找数据库记录。在聚集索引中检查记录的 `DB_TRX_ID`，如果在读取事务启动后修改了记录，则从 undo log 中检索记录的正确版本。

如果二级索引记录被标记为删除，或者二级索引页由较新的事务更新，则不使用覆盖索引（covering index）技术。InnoDB 不会从索引结构返回值，而是在聚集索引中查找记录。

但是，如果启用了索引条件下推（ICP）优化，并且只能使用索引中的字段来评估 `WHERE` 条件的一部分，MySQL 服务器仍然会将 `WHERE` 条件的这一部分下推到存储引擎，在那里使用索引对其进行评估。如果没有找到匹配的记录，则避免进行聚集索引查找。如果找到匹配的记录，即使在标记为删除的记录中，InnoDB 也会在聚集索引中查找该记录。

## InnoDB 架构

InnoDB 的架构可以参考下图，取自 [InnoDB Architecture](https://dev.mysql.com/doc/refman/5.7/en/innodb-architecture.html)。

![InnoDB Architecture](The-Basics-of-InnoDB/innodb-architecture.png)

可以看到其分为 ***In-Memory Structures*** 和 ***On-Disk Structures***，也就是内存上结构和磁盘上结构。

内存中的部分，可以看到有以下几个关键结构：

- Adaptive Hash Index（可适应性哈希索引）
- Buffer Pool（缓冲池）
- Change Buffer（写缓冲，国内常用译名）
- Log Buffer（日志缓冲）

磁盘上的部分，有以下几个关键结构：

- System Tablespace（系统表空间）
  - InnoDB Data Dictionary（InnoDB 数据字典）
  - Doublewrite Buffer（双写缓冲）
  - Change Buffer（写缓冲）
  - Undo Logs（撤销日志，undo-log）
- Undo Tablespaces（撤销表空间）
- Redo Log（重做日志）
- General Tablespaces（通用表空间）
- Temporary Tablespaces（临时表空间）

内存上模块和磁盘上模块之间是由操作系统缓冲连接，含义就是内存中的内容通过操作系统缓冲区写入磁盘来进行持久化。图中的 **O_DIRECT** 是 `open` 函数的一个 flag，指的是进行无缓冲的 I/O 操作，会绕过缓冲区高速缓存。

InnoDB 默认会将 `innodb_file_per_table` 设置为 `ON`，让每个表使用单独的 .frm 文件。

## InnoDB 内存上结构

### 缓冲池（Buffer Pool）

缓冲池是主存（main memory）中的一个区域，InnoDB 在访问表和索引数据时会将它们缓存在缓冲池中。缓冲池允许直接从内存访问经常使用的数据，从而加快处理速度。在专用的服务器上，高达 80% 的物理内存通常分配给了缓冲池。

为了提高大容量读取操作的效率，缓冲池被划分为可能容纳多行（rows，即行记录）的页面。为了提高缓存（cache）管理的效率，缓冲池被实现为页面的链表。很少使用的数据会使用 LRU 算法的变体从缓存中过时。

下面介绍一下 InnoDB 缓冲池使用的 LRU 算法。

*TODO*

### 写缓冲（Change Buffer）

Change Buffer 是一种特殊的数据结构，当二级索引页不在缓冲池（即前一小节的 Buffer Pool）中时，它会缓存这些页的更改。缓存的更改可能由 `INSERT`、`UPDATE` 或 `DELETE` 操作（DML）导致，稍后当页面通过其他读操作加载到缓冲池时，会合并这些更改。

![Change Buffer](The-Basics-of-InnoDB/innodb-change-buffer.png)

与聚集索引不同，二级索引通常是非唯一的，二级索引的插入顺序相对随机，也就是说增删改的开销会更大。同样地，删除和更新可能会影响索引树中不相邻的二级索引页。当其他操作将受影响的页面读入缓冲池时，合并（merging）缓存的更改，可避免从磁盘将二级索引页面读入缓冲池所需的大量随机访问 I/O。简而言之就是用写缓冲的机制让二级索引的 DML 修改结果先不存入磁盘，而是缓存起来，等到下次读这个数据的时候合并写缓冲缓存的修改再返回给用户。使用这种机制能够大大降低磁盘 I/O 开销。

当系统大部分处于闲置状态，或在缓慢停机期间会进行清除（purge）操作，将写缓冲上的更新写入到磁盘。和立即将每个新值写入磁盘相比，purge 操作可以更有效地将一批索引值写入磁盘块。

当有许多受影响的行以及很多的二级索引项需要更新时，写缓冲区的合并（merging）操作可能需要几个小时。在此期间，磁盘 I/O 会增加，这可能会导致需要读磁盘的查询速度显著降低。提交事务后，甚至在服务器关闭并重新启动后，写缓冲区合并也可能继续进行。

在内存中，写缓冲区占用了缓冲池的一部分。在磁盘上，写缓冲区是系统表空间的一部分，当数据库服务器关闭时，索引更改将在其中进行缓冲，即写缓冲区在磁盘上也存在，断电仍能够恢复。

缓存在写缓冲区中的数据类型由 `innodb_change_buffering` 变量控制。

### 可适应性哈希索引（Adaptive Hash Index）

### 日志缓冲（Log Buffer）

日志缓冲区是一块特定的内存区域，用于存储要写入磁盘的**日志文件数据**。日志缓冲区大小由 `innodb_Log_buffer_size` 变量定义。默认大小为 16MB。日志缓冲区的内容定期刷新到磁盘。大型日志缓冲区使大型事务能够运行，而无需在事务提交之前将重做日志（redo log）数据写入磁盘。因此，如果有更新、插入或删除多行的事务，增大日志缓冲区可以节省磁盘 I/O。

`innodb_flush_log_at_trx_commit` 变量控制如何将日志缓冲区的内容写入并刷新到磁盘。`innodb_flush_log_at_timeout` 变量控制日志刷新频率。

## InnoDB 磁盘上结构

### 表（Tables）

InnoDB 会将表的数据放在数据目录中的 .frm 文件中，并且，它还会将新表的一些信息存入**系统表空间**中自己的内部数据字典里。当某一个表被删除时，InnoDB 同样要删除其系统表空间中和被删除表有关的记录。简而言之，InnoDB 自己维护了几个表，会将用户创建的表的一些信息存进这些表中。

#### 行格式

行格式（Row Formats）决定了单行数据在磁盘中是以什么形式存储的，

InnoDB 有四种行格式，特性各不相同：

- REDUNDANT
- COMPACT
- DYNAMIC
- COMPRESSED

变量 `innodb_default_row_format` 定义了默认使用的格式，而在建表（CREATE）或修改表（ALTER）时，也可以使用 `ROW_FORMAT` 选项自定义。

行格式的相关介绍和讨论会放在后文中展开。

#### 主键

建议为每一个表都手动定义主键，并包含以下特征：

- 最重要的查询所用列
- 不可能为空的列
- 不会重复的列
- 插入后其值很少修改的列

#### AUTO_INCREMENT



### 索引（Indexes）

#### B + 树

现在我们首先来重温下 B+ 树的结构：

![高度为 2 的 B+ 树](The-Basics-of-InnoDB/image-20211006133136497.png)

>   图画的都是这么丑。。。

注意图上，叶子节点是使用**双向循环链表**连接起来的，其头尾都能找到彼此。

#### 聚集索引和二级索引

每个 InnoDB 表都有一个被称为聚集索引的特殊索引，用于存储行数据（这个索引的每个项存储了整个数据行，而非部分列的值）。通常，聚集索引与主键是一个东西。为了在查询、插入和其他数据库操作中获得最佳性能，了解 InnoDB 如何使用聚集索引优化常见的查找和 DML 操作非常重要。

- 在表上定义主键时，InnoDB 把它用作聚集索引。如果没有符合条件（逻辑唯一、非空）的列作为主键，可以添加一个自增的列用作主键，并且插入新行时自增列会自动设置其值。
- 如果不为表定义主键，InnoDB 会使用第一个唯一索引（所有键定义为`NOT NULL`）作为聚集索引。
- 如果表没有主键或合适的唯一索引，InnoDB 将在包含行 ID 值的合成列上生成一个名为`GEN_CLUST_INDEX`的隐藏聚集索引。这些行按 InnoDB 分配的行 ID 排序。行 ID 是一个 6 字节的字段，随着新行的插入而单调增加。因此，按行 ID 排序的行实际上是按插入顺序排列的。

通过聚集索引访问行非常快，因为索引搜索直接指向包含行数据的页面。如果表很大，则与使用不同于索引记录的页面存储行数据的存储组织相比，聚集索引体系结构通常可以明显减少磁盘 I/O 操作的开销。

聚集索引以外的索引都称为二级索引。在 InnoDB 中，二级索引中的每条记录都包含该行的主键列，以及为二级索引指定的列。InnoDB 使用此主键值搜索聚集索引中的行。也就是说，使用二级索引查询需要进行两次查询过程，这个操作被称为**回表**。

如果主键较长，则二级索引将占用更多的空间，因此**应当使用空间占用尽量小的主键**。

#### InnoDB 索引的物理结构

除了空间索引（spatial indexes），InnoDB 索引都采用 B-Tree 数据结构。空间索引使用 R-Tree，这是用于索引多维数据的专用数据结构。索引记录存储在其 B-Tree 或 R-Tree 数据结构的叶子结点页中。索引页的默认大小为 16KB。初始化 MySQL 实例时，页面大小由 `innodb_page_size` 设置项确定。

>   关于空间索引，这是一种用于存储地理空间信息的专用索引，在本文不进行讨论。

>   关于 B-Tree（即 B 树）的详细介绍不在本文讨论范围内，但有一点需要指出，在 MySQL 官方文档中有这么一句话：
>
>   “使用术语 B-Tree 旨在为索引设计提供一般类别的参考。由于 InnoDB 索引使用的存储结构具有经典的 B-Tree 设计中不存在的某些复杂特性，因此 InnoDB 使用的 B-Tree 结构可能被视为变体。”
>
>   也就是说在文档中使用 B-Tree 仅提供参考，实际使用的存储结构并不能算是 B-Tree，应当比这个复杂。在其中还有下面一段文字：
>
>   “所有人都见过 B-Tree，知道其根结点页中的条目指向叶结点页。但有时人们忽略了叶子结点页也可以相互指向的细节。这个特性允许 InnoDB 在叶子结点与叶子结点之间相互定位，而无需回到上层节点。这是你在经典的 B-Tree 中看不到的设计，这就是为什么 InnoDB 使用的索引应该被称为 B+ 树索引的原因。”
>
>   综上所述，InnoDB 实际使用的索引其物理结构应当为 B+ 树，而不是 B-Tree。

当新记录（records）插入到 InnoDB 聚集索引中时，InnoDB 会尝试保留页面 1/16 的空间，以便将来插入和更新索引记录。如果按顺序（升序或降序）插入索引记录，则生成的索引页大约 15/16 页即装满。如果以随机顺序插入记录，则页面从 1/2 页至 15/16 页即装满。

InnoDB 在创建或重建（rebuilding）B-Tree 索引时执行批量加载（bulk load）。这种创建索引的方法称为**有序索引构建**（*sorted index build*）。`innodb_fill_factor` 变量定义了在有序索引构建期间填充的每个 B-Tree 页面上可使用空间的百分比，剩余空间保留用于未来的索引增长。空间索引不支持有序索引构建。`innodb_fill_factor` 设置为 100 则会留下聚集索引页中 1/16 的空间用于将来的索引增长。

如果 InnoDB 索引页面的填充因子（fill factor，即实际的页使用空间占比）低于 `MERGE_THRESHOLD`（如果未指定，默认为 50%），InnoDB 会尝试收缩索引树以释放页面空间。 `MERGE_THRESHOLD` 设置适用于 B-Tree 和 R-Tree 索引。

>   请注意一点，B+ 树叶子结点中存储的是一整个索引页，其中可能包含多行记录，数据库会把整个页读入内存，再从中取得指定的记录。

#### 有序索引构建

TODO

### 表空间（Tablespaces）

#### 系统表空间

系统表空间是 InnoDB 数据字典（data dictionary）、双写缓冲区（doublewrite buffer）、写缓冲区（change buffer）和撤消日志（undo logs）的存储区域。如果表是在系统表空间中创建的，而不是在单表文件（file-per-table）或通用表空间（general tablespaces）中创建，则它还可能包含表（table）和索引数据（index data）。

系统表空间中可以有一个或多个数据文件。默认情况下，会在数据目录中创建一个名为 ibdata1 的系统表空间数据文件。系统表空间数据文件的大小和数量由 `innodb_data_file_path` 启动选项定义。

#### 单表文件表空间

单表文件表空间（file-per-table tablespace）包含单个 InnoDB 表的数据和索引，并存储在文件系统上的单个数据文件中。

#### 通用表空间

## InnoDB 锁机制

InnoDB 中有以下几种锁：

- 共享锁（Shared Locks）
- 排他锁（Exclusive Locks）
- 意向锁（Intent Locks）
- 记录锁（Record Locks）
- 间隙锁（Gap Locks）
- Next-Key Locks\*
- 插入意向锁（Insert Intention Locks）\*
- 自增锁（AUTO-INC Locks）\*
- 空间索引的谓词锁（Predicate Locks for Spatial Indexes）\*

### 共享锁和排他锁

InnoDB 实现了两个标准的行级锁：共享锁（S 锁）和排他锁（X 锁）：

- S 锁允许持有锁的事务读取行。
- X 锁允许持有锁的事务更新或删除行。

如果事务 T1 在行 r 上持有共享（S）锁，那么来自某个不同事务 T2 的请求在行 r 上的锁将按如下方式处理：

- T2 对 S 锁的请求可以立即被批准。结果，T1 和 T2 都在 r 上保持 S 锁。
- T2 对 X 锁的请求不能立即被批准。

如果事务 T1 在行 r 上持有排他（X）锁，则无法立即授予某个不同事务 T2 请求的 r 上任何一种类型的锁。事务 T2 必须等待事务 T1 释放对行 r 的锁。

## InnoDB 事务

InnoDB 事务模型旨在将多版本数据库的最佳特性与传统的两阶段锁定相结合。InnoDB 在行级别执行锁定，并在默认情况下以 Oracle 样式以非锁定一致读取的方式运行查询。InnoDB 中的锁信息有效地存储在空间中，因此不需要锁升级。通常，允许多个用户锁定 InnoDB 表中的每一行或任意行的子集，而不会导致 InnoDB 内存耗尽。

### 事务的隔离级别

事务的隔离属于数据库处理基础之一，属于 ACID 中的 “I“。

InnoDB 事务有四个隔离级别：

- 读未提交（READ UNCOMMITTED）
- 读已提交（READ COMMITTED）
- 可重复读（REPEATABLE READ）
- 串行（SERIALIZABLE）

其中，可重复读是 InnoDB 默认的隔离级别。

用户可以使用`SET TRANSACTION`语句自行修改单个会话及其后续连接的隔离级别（这涉及到 MySQL 连接的问题）。要为所有连接设置默认的隔离级别，可配置`--transaction-isolation`选项。

下面的列表描述了 MySQL 如何支持不同的事务级别。列表从最常用的级别到最不常用的级别。

#### REPEATABLE READ

在可重复读级别下，同一事务的一致性读是由第一次读取所建立的快照。也就是说，在同一事务中的多个普通`SELECT`（非锁定）语句彼此之间是一致的。

而对于锁定读取（带有`FOR UPDATE`的`SELECT`或 `LOCK IN SHARE MODE`）、UPDATE 和 DELETE 语句，锁（locking）取决于该语句是使用具有**唯一搜索条件（unique search condition）**还是**范围类型搜索条件（range-type search condition）**的唯一索引（unique index）：

- 对于具有唯一搜索条件的唯一索引，InnoDB 只锁定找到的索引记录，而不锁定它之前的间隙（gap）。
- 对于其他的搜索条件，InnoDB 锁定扫描范围内的所有记录，使用间隙锁（gap locks）和 next-key 锁（next-key locks）来阻止其他会话对该锁定范围的插入操作。

#### READ COMMITTED

在读提交级别下，

#### READ UNCOMMITTED

#### SERIALIZABLE

此级别类似于**REPEATABLE READ**，但如果`autocommit`被禁用（设置为`disabled`），InnoDB 隐式地将所有普通 SELECT 语句转换为`SELECT ... LOCK IN SHARE MODE`。如果启用了自动提交，则选择是其自己的事务。因此，已知它是只读的，如果作为一致（非锁定）读取执行，并且不需要为其他事务阻塞，则可以序列化它。（若要在其他事务已修改选定行时强制阻止普通选择，请禁用自动提交。）
