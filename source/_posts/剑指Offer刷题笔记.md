---
title: "剑指Offer刷题笔记"
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

1. 将这个二维数组看作一个矩阵，其行列都递增排列。很明显解题方法是对比某一中间数字，不断缩小范围，所以要确定对比的数字。

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

## JZ04：重建二叉树^

> 输入某二叉树的前序遍历和中序遍历的结果，请重建出该二叉树。假设输入的前序遍历和中序遍历的结果中都不含重复的数字。例如输入前序遍历序列{1,2,4,7,3,5,6,8}和中序遍历序列{4,7,2,1,5,3,8,6}，则重建二叉树并返回。

### 思路

### 题解

## JZ05：用两个栈实现队列

> 用两个栈来实现一个队列，分别完成在队列尾部插入整数(push)和在队列头部删除整数(pop)的功能。 队列中的元素为 int 类型。保证操作合法，即保证 pop 操作时队列内已有元素。

### 思路

1. 入队操作即往 Stack1 中放入数字。

   出队操作先把 Stack1 中数字全部弹出放入 Stack2，再弹出 Stack2 中数字。

### 题解

```go
func Push(node int) {
    stack1 = append(stack1, node)
}

func Pop() int{
    if len(stack2) == 0 {
        for i:= len(stack1)-1; i>=0; i-- {
            stack2 = append(stack2, stack1[i])
        }
        stack1 = []int{}
    }
    length := len(stack2)
    ret := stack2[length-1]
    stack2 = stack2[:length-1]
    return ret
}
```

## JZ06：旋转数组的最小数字

> 把一个数组最开始的若干个元素搬到数组的末尾，我们称之为数组的旋转。
> 输入一个非递减排序的数组的一个旋转，输出旋转数组的最小元素。
> NOTE：给出的所有元素都大于 0，若数组大小为 0，请返回 0。

### 思路

1. 数组正常应为递增排列，旋转数组后会存在后一元素小于前一元素的现象。

   遍历数组，发现有元素其后一元素小于自身的，则后一元素为最小值，返回。

   如果没有发现旋转，则返回数组首元素。

### 题解

```go
func minNumberInRotateArray( rotateArray []int ) int {
    length := len(rotateArray)
    if length == 0 {
        return 0
    }
    for k, v := range rotateArray {
        if k == length-1 {
            break
        }
        if v > rotateArray[k+1] {
            return rotateArray[k+1]
        }
    }
    return rotateArray[0]
}
```

## JZ07：斐波那契数列^

> 大家都知道斐波那契数列，现在要求输入一个整数 n，请你输出斐波那契数列的第 n 项（从 0 开始，第 0 项为 0，第 1 项是 1）。
>
> $n\leq39$

### 思路

### 题解

## JZ08：跳台阶^

### 思路

### 题解

## JZ14：链表中倒数最后 k 个结点

> 输入一个链表，输出一个链表，该输出链表包含原链表中从倒数第 k 个结点至尾节点的全部节点。
>
> 如果该链表长度小于 k，请返回一个长度为 0 的链表。

### 思路

1.  由于是倒数 k 个节点，因此可以先遍历一遍链表得到链表长度，再减去 k 得到结果链表的起始位置，最后将从该位置开始的链表返回即可。
2.  双指针的思路是首先遍历到链表第 k 个节点，然后再用一个指针去从头遍历，第二个指针遍历的过程中第一个指针也同步往后移动，直到指向末尾，返回第二个指针。

### 题解

#### 计算长度

```go
func FindKthToTail( pHead *ListNode ,  k int ) *ListNode {
    count := 0
    p := pHead
    for p != nil {
        count++
        p = p.Next
    }
    if count < k {
        return nil
    }
    for i := 0; i <count-k; i++{
        pHead = pHead.Next
    }

    return pHead
}
```

#### 双指针

```go
func FindKthToTail( pHead *ListNode ,  k int ) *ListNode {
    if pHead == nil {
        return nil
    }
    p := pHead
    for ; k>0; k-- {
        if p == nil {
            return nil
        }
        p = p.Next
    }
    for p != nil {
        p = p.Next
        pHead = pHead.Next
    }

    return pHead
}
```

## JZ15：反转链表^

> 输入一个链表，反转链表后，输出新链表的表头。

### 思路

1. 基本思路是从头到尾遍历链表，依次将链表指针指向前一个结点（首先把前一个结点记录下来）。

### 题解

```go
func ReverseList( pHead *ListNode ) *ListNode {
    var pre, tmp *ListNode // pre用来记录前一个结点，初始为nil
    for pHead != nil {
        tmp = pHead // tmp是临时存储后一个结点的指针
        pHead = pHead.Next
        tmp.Next = pre
        pre = tmp
    }

    return pre
}
```

## JZ16：合并两个排序的链表^

> 输入两个单调递增的链表，输出两个链表合成后的链表，当然我们需要合成后的链表满足单调不减规则。

### 思路

### 题解

## JZ18：二叉树的镜像^

> 操作给定的二叉树，将其变换为源二叉树的镜像。
>
> ```
> 比如：    源二叉树
>             8
>            /  \
>           6   10
>          / \  / \
>         5  7 9 11
>         镜像二叉树
>             8
>            /  \
>           10   6
>          / \  / \
>         11 9 7  5
> ```

### 思路

1. 递归解法的思路是对左右子树进行递归交换。

### 题解

#### 递归

> 难度 1 分

```go
func Mirror( pRoot *TreeNode ) *TreeNode {
    if pRoot == nil {
        return pRoot
    }
    pRoot.Left, pRoot.Right = pRoot.Right, pRoot.Left
    if pRoot.Left != nil {
        Mirror(pRoot.Left)
    }
    if pRoot.Right != nil {
        Mirror(pRoot.Right)
    }
    return pRoot
}
```

## JZ50：数组中重复的数字

> 在一个长度为 n 的数组里的所有数字都在 0 到 n-1 的范围内。 数组中某些数字是重复的，但不知道有几个数字是重复的。也不知道每个数字重复几次。请找出数组中任一一个重复的数字。 例如，如果输入长度为 7 的数组[2,3,1,0,2,5,3]，那么对应的输出是 2 或者 3。存在不合法的输入的话输出-1

### 思路

1. 遍历数组，将每个数字放入 Map 中，当遍历过程中发现键已在 Map 中时直接返回该键。
2. 题目中提到数组内的数字都在 0 到 n-1 的范围内，而找到数组中重复元素的关键就是遍历过程中知道重复元素所在的位置，因此将每个元素按照`numbers[i]==i`的规则放到固定的位置。

### 题解

#### Map

> 难度 1 分

```go
func duplicate( numbers []int ) int {
    m := make(map[int]bool)
    for _, v := range numbers {
        if _, ok := m[v]; ok {
            return v
        }
        m[v] = true
    }
    return -1
}
```

#### 替换法

> 难度 3 分

```go
func duplicate( numbers []int ) int {
    for i := 0; i < len(numbers); i++ {
        if numbers[i] != i {
            if numbers[i] == numbers[numbers[i]] {
                return numbers[i]
            }
            numbers[numbers[i]], numbers[i] = numbers[i], numbers[numbers[i]]
            i--
        }
    }
    return -1;
}
```
