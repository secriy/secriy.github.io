---
title: "SQL Practice"
date: 2021-08-16 11:22:11
link: sql-practice
categories: 学习笔记
tags:
  - SQL
  - Database
---

{% noteblock quote cyan %}

SQL 刷题练习。

{% endnoteblock %}

<!-- more -->

## LeetCode

### [175. 组合两个表](https://leetcode-cn.com/problems/combine-two-tables/)

#### 题解

```sql
select FirstName, LastName, City, State
from Person
left join Address using (PersonId);
```

#### 知识点

- 内连接（inner join）
  ![inner-join](SQL-Practice/l.png)
- 左连接（left join）
  ![left-outer-join](SQL-Practice/l.png)
- 右连接（right join）
  ![right-outer-join](SQL-Practice/l.png)
- 全连接（full outer join）
  ![full-outer-join](SQL-Practice/l.png)
- using
  通过其后的列名来连接，等同于`where A.XXX = B.XXX`

### [176. 第二高的薪水](https://leetcode-cn.com/problems/second-highest-salary/)

#### 题解

```sql
select (
    select distinct Salary
    from Employee
    order by Salary desc
    limit 1,1
) as SecondHighestSalary;
```

#### 知识点

- distinct
  指定列重复的记录中只保留第一个记录

- order by
  排序

- desc
  降序

- limit & offset
  `limit 2 offset 1 `指从第二个记录开始的一个记录，即第二个记录和第三个记录

  MySQL 中可以使用短形式：`limit 1,2 `，同上

- as
  给查询的列指定别名

### [177. 第 N 高的薪水](https://leetcode-cn.com/problems/nth-highest-salary/)

#### 题解

```sql
CREATE FUNCTION getNthHighestSalary(N INT) RETURNS INT
BEGIN
set N = N - 1;
  RETURN (
      select (
          select distinct salary
          from Employee
          order by salary desc
          limit N,1
      ) as getNthHighestSalary
  );
END
```

#### 知识点

- function
- limit 中不能改变变量，因此需要先`set N = N - 1`

### [178. 分数排名](https://leetcode-cn.com/problems/rank-scores/)

#### 题解

```sql
select Score,
dense_rank() over(order by Score desc) as 'Rank'
from Scores;
```

```sql
select s1.Score, count(distinct(s2.Score)) as 'Rank'
from Scores s1, scores s2
where s1.Score <= s2.Score
group by s1.Id
order by `Rank`
```

#### 知识点

- MySQL 内置 `dense_rank()`用于计算排名，且排名连续
- `rank()`与`dense_rank()`的差别在于前者排名不连续，重复值会占用数字
- `row_number()` 会将每个记录依次设置序号，适用于分页
- `ntile(N)`将记录分为 N 个桶，序号从 1-N
- SQL 的执行顺序为 from where select
