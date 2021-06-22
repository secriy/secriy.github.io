---
title: 剑指Offer刷题笔记
date: 2021-06-22 12:41:24
categories: 算法刷题
tags:
  - Algorithms
mathjax: true
---

{% noteblock quote cyan %}

剑指 Offer 刷题记录。

{% endnoteblock %}

<!-- more -->

## JZ01：二维数组中的查找

> 在一个二维数组中（每个一维数组的长度相同），每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。请完成一个函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。
>
> [
>
> [1,2,8,9],
> [2,4,9,12],
> [4,7,10,13],
> [6,8,11,15]
>
> ]
>
> 给定 target = 7，返回 true。
>
> 给定 target = 3，返回 false。

### 思路

将这个二维数组看作一个矩阵，其行列都递增排列。很明显解题方法是对比某一中间数字，不断缩小范围，所以要确定对比的数字。

从左上角入手对比并不会缩小很明显的范围，右下角同理，而左下角和右上角数字满足。

选取右上角进行对比，当前对比的数字为 num，当 target > num，缩小范围，排除第一行。当 target < num，排除最后一列，直到找到目标数字。

### 题解

```go
func Find( target int ,  array [][]int ) bool {
    var row int
    var col = len(array[0])-1
    for row < len(array) && col >= 0{
        num := array[row][col]
        if num == target {
            return true	// 找到目标数字
        }
        if num > target {
            col--	// 排除最后一列
        } else {
            row++	// 排除第一行
        }
    }

    return false
}
```

## JZ02：替换空格

> 请实现一个函数，将一个字符串中的每个空格替换成“%20”。例如，当字符串为 We Are Happy. 则经过替换之后的字符串为 We%20Are%20Happy。

### 思路

1. 对于字符数组（如 C 实现）的原地实现，可以先遍历一遍数组，得出空格个数$x$，则新数组长度为$length+2x$。扩容后使用双指针解法，从最后一个非空元素开始移到数组末尾，遇到空格新增三个目标字符，直到替换完最后一个空格。

2. 对于 Golang 非原地实现，可以直接遍历字符串将其替换为*%20*。

### 题解

```go
func replaceSpace( s string ) string {
    var newString string
    for _, v := range s {
        if string(v) == " "{
            newString += "%20"
        } else {
            newString += string(v)
        }
    }

    return newString
}
```

## JZ03：从尾到头打印链表

> 输入一个链表的头节点，按链表从尾到头的顺序返回每个节点的值（用数组返回）。

### 思路

1. 简单思路是使用一个栈存储每次遍历的值，最后从栈中取出即可。
2. 递归思路是递归调用函数，首先将最深层函数的结果返回，该方法等同于栈方案。

### 题解

#### 存储结果

```go
func printListFromTailToHead( head *ListNode ) []int {
    var result []int
    for head != nil{
        result = append(result, head.Val)
        head = head.Next
    }
    // 反转Slice
    for i, j := 0, len(ret)-1; i < j; i, j = i+1, j-1 {
        ret[i], ret[j] = ret[j], ret[i]
    }

    return ret
}
```

#### 递归

```go
func printListFromTailToHead( head *ListNode ) []int {
	if head == nil {
        return []int{}
    }

    return append(printListFromTailToHead(head.Next), head.Val)
}
```

## JZ04：重建二叉树

> 输入某二叉树的前序遍历和中序遍历的结果，请重建出该二叉树。假设输入的前序遍历和中序遍历的结果中都不含重复的数字。例如输入前序遍历序列{1,2,4,7,3,5,6,8}和中序遍历序列{4,7,2,1,5,3,8,6}，则重建二叉树并返回。

### 思路

### 题解
