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

## 3. [数组中重复的数字](https://leetcode-cn.com/problems/shu-zu-zhong-zhong-fu-de-shu-zi-lcof/)

### Ideas

- 遍历数组，将每个数字放入 Map 中，当遍历过程中发现键已在 Map 中时直接返回该键。
- 题目中提到数组内的数字都在 0 到 n-1 的范围内，而找到数组中重复元素的关键就是遍历过程中知道重复元素所在的位置，因此将每个元素按照`numbers[i]==i`的规则放到固定的位置。

### Solutions

- Map

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

- 替换法

  > 难度 3 分

  ```go
  func findRepeatNumber(nums []int) int {
      for i := 0; i < len(nums); i++ {
          for nums[i] != i {
              if nums[i] == nums[nums[i]] {
                  return nums[i]
              }
              nums[i], nums[nums[i]] = nums[nums[i]], nums[i]
          }
      }
      return -1
  }
  ```

## 4. [二维数组中的查找](https://leetcode-cn.com/problems/er-wei-shu-zu-zhong-de-cha-zhao-lcof/)

### 常规

将这个二维数组看作一个矩阵，其行列都递增排列。很明显解题方法是对比某一中间数字，不断缩小范围，所以要确定对比的数字。

从左上角入手对比并不会缩小很明显的范围，右下角同理，而左下角和右上角数字满足。

选取右上角进行对比，当前对比的数字为 num，当 target > num，缩小范围，排除第一行。当 target < num，排除最后一列，直到找到目标数字。

```go
func findNumberIn2DArray(matrix [][]int, target int) bool {
    row, col := len(matrix)-1, 0
    for row >= 0 && row < len(matrix) && col < len(matrix[0]){
        if target == matrix[row][col] {
            return true
        }
        if target < matrix[row][col] {
            row--
        } else {
            col++
        }
    }
    return false
}
```

## 5. [替换空格](https://leetcode-cn.com/problems/ti-huan-kong-ge-lcof/)

### 常规

- 对于字符数组（如 C 实现）的原地实现，可以先遍历一遍数组，得出空格个数$x$，则新数组长度为$length+2x$。扩容后使用双指针解法，从最后一个非空元素开始移到数组末尾，遇到空格新增三个目标字符，直到替换完最后一个空格。

- 对于 Golang 非原地实现，可以直接遍历字符串将其替换为*%20*。

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

## 6. [从尾到头打印链表](https://leetcode-cn.com/problems/cong-wei-dao-tou-da-yin-lian-biao-lcof/)

### Ideas

- 简单思路是使用一个栈存储每次遍历的值，最后从栈中取出即可。

- 递归思路是递归调用函数，首先将最深层函数的结果返回，该方法等同于栈方案。

### Solutions

- 存储结果

  ```go
  func reversePrint(head *ListNode) []int {
      var result []int
      for head != nil{
          result = append(result, head.Val)
          head = head.Next
      }
      // 反转Slice
      for i, j := 0, len(result)-1; i < j; i, j = i+1, j-1 {
          result[i], result[j] = result[j], result[i]
      }
      return result
  }
  ```

- 递归

  ```go
  func reversePrint(head *ListNode) []int {
      if head == nil {
          return []int{}
      }
      return append(reversePrint(head.Next), head.Val)
  }
  ```

## [7. 重建二叉树](https://leetcode-cn.com/problems/zhong-jian-er-cha-shu-lcof/)

### 递归

```go
/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */
func buildTree(preorder []int, inorder []int) *TreeNode {
    for k, v := range inorder {
        if v == preorder[0] {
            return &TreeNode{
                Val: v,
                Left: buildTree(preorder[1:k+1], inorder[:k]),
                Right: buildTree(preorder[k+1:], inorder[k+1:]),
            }
        }
    }
    return nil
}
```

## 9. [用两个栈实现队列](https://leetcode-cn.com/problems/yong-liang-ge-zhan-shi-xian-dui-lie-lcof/)

### Solutions

- Common

  ```go
  type CQueue struct {
      Nums   []int
      Length int
  }
  
  func Constructor() CQueue {
      return CQueue{}
  }
  
  func (this *CQueue) AppendTail(value int)  {
      this.Nums = append(this.Nums, value)
      this.Length++
  }
  
  func (this *CQueue) DeleteHead() int {
      if this.Length == 0 {
          return -1
      }
      tmp := this.Nums[0]
      this.Nums = this.Nums[1:]
      this.Length--
      return tmp
  }
  ```

## [10- I. 斐波那契数列](https://leetcode-cn.com/problems/fei-bo-na-qi-shu-lie-lcof/)

### 动态规划

```go
func fib(n int) int {
    pre, post := 0, 1
    for i := 2; i <= n; i++ {
        pre, post = post, (pre+post)%1000000007
    }
    if n == 0 {
        return pre
    }
    return post
}
```

## [10- II. 青蛙跳台阶问题](https://leetcode-cn.com/problems/qing-wa-tiao-tai-jie-wen-ti-lcof/)

### 动态规划

斐波那契数列解法，典型动态规划

```go
func numWays(n int) int {
    pre, post := 1, 1
    for i := 2; i <= n; i++ {
        pre, post = post, (pre+post)%1000000007
    }
    return post
}
```

## 11. [旋转数组的最小数字](https://leetcode-cn.com/problems/xuan-zhuan-shu-zu-de-zui-xiao-shu-zi-lcof/)

### 迭代

遍历找到逆序的第一个元素

```go
func minArray(numbers []int) int {
    pre1, pre2 := 0, 1
    length := len(numbers)
    if length < 2 {
        return numbers[0]
    }
    for pre2 < length {
        if numbers[pre2] < numbers[pre1] {
            return numbers[pre2]
        }
        pre1++
        pre2++
    }
    return numbers[0]
}
```

### 二分法

```go
func minArray(numbers []int) int {
    low, high := 0, len(numbers)-1
    mid := 0
    for low < high {
        mid = (low+high)>>1
        if numbers[mid] < numbers[high] {
            // 右侧有序
            high = mid
        } else if numbers[mid] > numbers[high] {
            // 左侧有序
            low = mid + 1
        } else {
           	// 去重
            high--
        }
    }
    return numbers[low]
}
```

## [12. 矩阵中的路径](https://leetcode-cn.com/problems/ju-zhen-zhong-de-lu-jing-lcof/)

### 回溯

```go
func exist(board [][]byte, word string) bool {
    rows, cols := len(board), len(board[0])
    // 创建Visited数组
    visited := make([][]bool, rows)
    for i := range visited {
        visited[i] = make([]bool, cols)
    }
    var find bool
    for i := 0; i < rows; i++ {
        for j := 0; j < cols; j++ {
            backtracking(i, j, &board, &visited, &word, 0, &find)
        }
    }
    return find
}

func backtracking(row, col int, board *[][]byte, visited *[][]bool, word *string, idx int, find *bool) {
    if row < 0 || row >= len(*board) || col < 0 || col >= len((*board)[0]) {
        return
    }
    if (*board)[row][col] != byte((*word)[idx]) || *find || (*visited)[row][col] {
        return
    }
    if idx == len(*word)-1 {
        *find = true
        return
    }
    (*visited)[row][col] = true
    backtracking(row+1, col, board, visited, word, idx+1, find)
    backtracking(row-1, col, board, visited, word, idx+1, find)
    backtracking(row, col+1, board, visited, word, idx+1, find)
    backtracking(row, col-1, board, visited, word, idx+1, find)
    (*visited)[row][col] = false
}
```

### 回溯优化

```go
func exist(board [][]byte, word string) bool {
   m, n := len(board), len(board[0])
   for i := 0; i < m; i++ {
       for j := 0; j < n; j++ {
            if dfs(board, i, j, 0, word) {
                return true
            }
        }
    }
    return false
}

func dfs(board [][]byte, row, col, level int, word string) bool {
    if level == len(word) {
        return true
    }

    if row < 0 || col < 0 || row == len(board) || col == len(board[0]) {
        return false
    }

    if board[row][col] != word[level] {
        return false
    }

    temp := board[row][col]
    board[row][col] = ' ' // 将数组元素改为空格来代替 Visited 数组的功能
    if dfs(board, row, col + 1, level + 1, word) ||
    dfs(board, row, col - 1, level + 1, word) ||
    dfs(board, row + 1, col, level + 1, word) ||
    dfs(board, row - 1, col, level + 1, word)  {
        return true
    }
    board[row][col] = temp
    return false
}
```

## [13. 机器人的运动范围](https://leetcode-cn.com/problems/ji-qi-ren-de-yun-dong-fan-wei-lcof/)

### DFS

```go
func movingCount(m int, n int, k int) int {
    visited := make([][]bool, m)
    for k := range visited {
        visited[k] = make([]bool, n)
    }
    return dfs(m, n, k, 0, 0, visited)
}

func dfs(m, n, k, row, col int, visited [][]bool) int {
    if row >= m || col >= n || visited[row][col] {
        return 0
    }
    if row%10 + row/10 + col%10 + col/10 > k {
        return 0
    }
    visited[row][col] = true
    return dfs(m, n, k, row, col+1, visited) + dfs(m, n, k, row+1, col, visited) + 1
}
```

## 14-1. [剪绳子](https://leetcode-cn.com/problems/jian-sheng-zi-lcof/)

### Ideas

- 数学运算，一直找 3

### Solutions

- 数学

  ```go
  func cuttingRope(n int) int {
      if n <= 3 {
          return n-1
      }
      sum := 1
      for n > 4 {
          sum *= 3
          n-=3
      }
      return sum*n
  }
  ```

## [15. 二进制中1的个数](https://leetcode-cn.com/problems/er-jin-zhi-zhong-1de-ge-shu-lcof/)

### 位运算

位运算，移位统计。

```go
func hammingWeight(num uint32) int {
    count := 0
    for i := 0; i < 32; i++ {
        if num%2 == 1 {
            count++
        }
        num = num >> 1
    }
    return count
}
```

## [16. 数值的整数次方](https://leetcode-cn.com/problems/shu-zhi-de-zheng-shu-ci-fang-lcof/)

### 快速幂

```go
func myPow(x float64, n int) float64 {
    if n == 0 {
        return 1
    }
    if n == 1 {
        return x
    }
    if n == -1 {
        return 1/x
    }
    mid := myPow(x, n/2)
    return mid * mid * myPow(x, n%2)
}
```

## [17. 打印从1到最大的n位数](https://leetcode-cn.com/problems/da-yin-cong-1dao-zui-da-de-nwei-shu-lcof/)

### 不考虑大数

```go
func printNumbers(n int) []int {
    count := 1
    for i := 0; i < n; i++ {
        count *= 10
    }
    result := make([]int, count - 1)
    for i := range result {
        result[i] = i + 1
    }
    return result
}
```

### 标准库

```go
func printNumbers(n int) []int {
    res := make([]int, int(math.Pow(10, float64(n)))-1)
    for i := range res {
        res[i] = i+1
    }
    return res
}
```

## 18. [删除链表的节点](https://leetcode-cn.com/problems/shan-chu-lian-biao-de-jie-dian-lcof/)

- 虚拟结点

  ```go
  func deleteNode(head *ListNode, val int) *ListNode {
      dummy := new(ListNode)
      dummy.Next = head
      head = dummy
      for head != nil && head.Next != nil {
          if head.Next.Val == val {
              head.Next = head.Next.Next
          }
          head = head.Next
      }
      return dummy.Next
  }
  ```

- 递归

  ```go
  func deleteNode(head *ListNode, val int) *ListNode {
      if head == nil {
          return head
      }
      if head.Val == val {
          return head.Next
      }
      head.Next = deleteNode(head.Next, val)
      return head
  }
  ```

## 21. [调整数组顺序使奇数位于偶数前面](https://leetcode-cn.com/problems/diao-zheng-shu-zu-shun-xu-shi-qi-shu-wei-yu-ou-shu-qian-mian-lcof/)

- 头尾双指针

  ```go
  func exchange(nums []int) []int {
      low, high := 0, len(nums) - 1
      for low < high {
          if nums[high] % 2 == 0 {
              high--
          }
          if nums[low] % 2 != 0 {
              low++
          }
          if low < high && nums[low] % 2 == 0 && nums[high] % 2 != 0 {
              nums[low], nums[high] = nums[high], nums[low]
          }
      }
      return nums
  }
  ```

## [22. 链表中倒数第 k 个节点](https://leetcode-cn.com/problems/lian-biao-zhong-dao-shu-di-kge-jie-dian-lcof/)

### 计算长度

由于是倒数 k 个节点，因此可以先遍历一遍链表得到链表长度，再减去 k 得到结果链表的起始位置，最后将从该位置开始的链表返回即可。

$O(n)$|$O(1)$

```go
func getKthFromEnd(head *ListNode, k int) *ListNode {
    count := 0
    p := head
    for p != nil {
        count++
        p = p.Next
    }
    if count < k {
        return nil
    }
    for i := 0; i <count-k; i++{
        head = head.Next
    }

    return head
}
```

### 双指针

首先遍历到链表第 k 个节点，然后再用一个指针去从头遍历，第二个指针遍历的过程中第一个指针也同步往后移动，直到指向末尾，返回第二个指针。
$O(n)$|$O(1)$

```go
func getKthFromEnd(head *ListNode, k int) *ListNode {
    slow, fast := head, head
    for k > 0 {
        fast = fast.Next
        k--
    }
    for fast != nil {
        slow = slow.Next
        fast = fast.Next
    }
    return slow
}
```

## 23. [反转链表](https://leetcode-cn.com/problems/fan-zhuan-lian-biao-lcof/)

### Ideas

- 记录前一结点，遍历链表修改结点

### Solutions

- preNode

  ```go
  func reverseList(head *ListNode) *ListNode {
      if head == nil {
          return head
      }
      var pre, next *ListNode
      for {
          next = head.Next
          head.Next = pre
          if next == nil {
              break
          }
          pre = head
          head = next
      }
      return head
  }
  ```

## [25. 合并两个排序的链表](https://leetcode-cn.com/problems/he-bing-liang-ge-pai-xu-de-lian-biao-lcof/)

### 递归

```go
/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */
func mergeTwoLists(l1 *ListNode, l2 *ListNode) *ListNode {
    if l1 == nil {
        return l2
    }
    if l2 == nil {
        return l1
    }
    if l1.Val <= l2.Val {
        l1.Next = mergeTwoLists(l1.Next, l2)
        return l1
    } else {
        l2.Next = mergeTwoLists(l1, l2.Next)
        return l2
    }
}
```

## [26. 树的子结构](https://leetcode-cn.com/problems/shu-de-zi-jie-gou-lcof/)

### 递归

-   时间复杂度：$O(mn)$
-   空间复杂度：$O(m)$

>   m 为 A 树规模，n 为 B 树规模

```go
/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */
func isSubStructure(A *TreeNode, B *TreeNode) bool {
    if A == nil || B == nil {
        return false
    }
    // 判断当前结点、递归左子树、递归右子树
    return subTree(A, B) || isSubStructure(A.Left, B) || isSubStructure(A.Right, B)
}

// 判断 B 是否是 A 包含根节点的子树
func subTree(A *TreeNode, B *TreeNode) bool {
    if B == nil {
        // B 递归完毕
        return true
    }
    if A == nil || A.Val != B.Val {
        // A 递归完毕或 A B 当前结点不相等
        return false
    }
    // 往左右子树分别递归判断
    return subTree(A.Left, B.Left) && subTree(A.Right, B.Right)
}
```

## [27. 二叉树的镜像](https://leetcode-cn.com/problems/er-cha-shu-de-jing-xiang-lcof/)

### 递归

```go
/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */
func mirrorTree(root *TreeNode) *TreeNode {
    if root == nil {
        return nil
    }
    root.Left, root.Right = root.Right, root.Left	// 交换左右子树
    mirrorTree(root.Left)
    mirrorTree(root.Right)
    return root
}
```

### 队列

```go
/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */
func mirrorTree(root *TreeNode) *TreeNode {
    if root == nil {
        return nil
    }
    queue := []*TreeNode{root}
    for len(queue) > 0 {
        node := queue[0]
        queue = queue[1:]
        node.Left, node.Right = node.Right, node.Left
        if node.Left != nil {
            queue = append(queue, node.Left)
        }
        if node.Right != nil {
            queue = append(queue, node.Right)
        }
    }
    return root
}
```

## [28. 对称的二叉树](https://leetcode-cn.com/problems/dui-cheng-de-er-cha-shu-lcof/)

### 递归（DFS）

```go
func isSymmetric(root *TreeNode) bool {
    if root == nil {
        return true
    }
    return helper(root.Left, root.Right)
}

func helper(left, right *TreeNode) bool {
    if left == nil && right == nil {
        return true
    }

    if left == nil || right == nil {
        return false
    }

    if left.Val != right.Val {
        return false
    }

    return helper(left.Left, right.Right) && helper(left.Right, right.Left)
}
```

## [29. 顺时针打印矩阵](https://leetcode-cn.com/problems/shun-shi-zhen-da-yin-ju-zhen-lcof/)

### 模拟

模拟路径、缩小边界即可。

- 时间复杂度：$O(mn)$
- 空间复杂度：$O(1)$


>   m 和 n 分别为行和列的长度，result 数组为必须使用的空间，因此空间复杂度为$O(1)$

```go
func spiralOrder(matrix [][]int) []int {
    if len(matrix) == 0 {
        // 边界判断
        return nil
    }
    // 存储结果
    result := make([]int, len(matrix) * len(matrix[0]))
    index := 0

    // 限制边界
    rowMin, rowMax, colMin, colMax := 0, len(matrix), 0, len(matrix[0])

    for {
        // 左 -> 右
        for i := colMin; i < colMax; i++ {
            result[index] = matrix[rowMin][i]
            index++
        }
        rowMin++
        if rowMin >= rowMax {
            break
        }
        // 上 -> 下
        for i := rowMin; i < rowMax; i++ {
            result[index] = matrix[i][colMax-1]
            index++
        }
        colMax--
        if colMin >= colMax {
            break
        }
        // 右 -> 左
        for i := colMax-1; i >= colMin; i-- {
            result[index] = matrix[rowMax-1][i]
            index++
        }
        rowMax--
        if rowMin >= rowMax {
            break
        }
        // 下 -> 上
        for i := rowMax-1; i >= rowMin; i-- {
            result[index] = matrix[i][colMin]
            index++
        }
        colMin++
        if colMin >= colMax {
            break
        }
    }
    return result
}
```

## 30. [包含 min 函数的栈](https://leetcode-cn.com/problems/bao-han-minhan-shu-de-zhan-lcof/)

### Ideas

- 使用**辅助栈**，push 时将更小的值放入辅助栈，pop 时当二者栈顶一致时弹出辅助栈栈顶元素。

### Solutions

- 辅助栈

  ```go
  type MinStack struct {
  	Nums []int
  	Helper []int
  }
  
  /** initialize your data structure here. */
  func Constructor() MinStack {
  	return MinStack{make([]int, 0), make([]int, 0)}
  }
  
  func (this *MinStack) Push(x int)  {
  	if len(this.Helper) == 0 || x <= this.Helper[len(this.Helper)-1] {
  	this.Helper = append(this.Helper, x)
  	}
  	this.Nums = append(this.Nums, x)
  }
  
  func (this *MinStack) Pop()  {
  	num := this.Nums[len(this.Nums)-1]
  	hnum := this.Helper[len(this.Helper)-1]
  	this.Nums = this.Nums[:len(this.Nums)-1]
  	if num == hnum {
  		this.Helper = this.Helper[:len(this.Helper)-1]
  	}
  }
  
  func (this *MinStack) Top() int {
  	return this.Nums[len(this.Nums)-1]
  }
  
  func (this *MinStack) Min() int {
  	return this.Helper[len(this.Helper)-1]
  }
  
  /**
   * Your MinStack object will be instantiated and called as such:
   * obj := Constructor();
   * obj.Push(x);
   * obj.Pop();
   * param_3 := obj.Top();
   * param_4 := obj.Min();
   */
  ```

## [31. 栈的压入、弹出序列](https://leetcode-cn.com/problems/zhan-de-ya-ru-dan-chu-xu-lie-lcof/)

### 模拟

- 时间复杂度：$O(n)$
- 空间复杂度：$O(n)$

```go
func validateStackSequences(pushed []int, popped []int) bool {
    stack := make([]int, 0)	// 模拟栈
    for i := range pushed {
        stack = append(stack, pushed[i]) // 压栈
        for len(popped) > 0 && len(stack) > 0 && stack[len(stack)-1] == popped[0] {
            // 循环出栈
            stack = stack[:len(stack)-1]
            popped = popped[1:]
        }
    }
    return len(stack) == 0
}
```

## [32 - I. 从上到下打印二叉树](https://leetcode-cn.com/problems/cong-shang-dao-xia-da-yin-er-cha-shu-lcof/)

### 层序遍历

- 时间复杂度：$O(n)$
- 空间复杂度：$O(n)$

```go
/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */
func levelOrder(root *TreeNode) []int {
    if root == nil {
        return []int{}
    }

    queue := []*TreeNode{root}	// 队列
    result := make([]int, 0)	// 存放结果

    for len(queue) > 0 {
        root := queue[0]
        if root.Left != nil {
            queue = append(queue, root.Left)
        }
        if root.Right != nil {
            queue = append(queue, root.Right)
        }
        result = append(result, root.Val)
        queue = queue[1:]
    }

    return result
}
```

## [32 - II. 从上到下打印二叉树 II](https://leetcode-cn.com/problems/cong-shang-dao-xia-da-yin-er-cha-shu-ii-lcof/)

### 层序遍历

- 时间复杂度：
- 空间复杂度：

```go
/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */
func levelOrder(root *TreeNode) [][]int {
    if root == nil {
        return [][]int{}
    }
    queue := []*TreeNode{root}
    result := make([][]int, 0)

    for len(queue) > 0 {
        tmp := make([]int, 0)	// 单层结点值
        for i := len(queue); i > 0; i-- {
            // 出队
            node := queue[0]
            queue = queue[1:]
            tmp = append(tmp, node.Val)
            if node.Left != nil {
                queue = append(queue, node.Left)
            }
            if node.Right != nil {
                queue = append(queue, node.Right)
            }
        }
        result = append(result, tmp)
    }
    return result
}
```

## [32 - III. 从上到下打印二叉树 III](https://leetcode-cn.com/problems/cong-shang-dao-xia-da-yin-er-cha-shu-iii-lcof/)\*

### 双端队列

```go
/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */
func levelOrder(root *TreeNode) [][]int {
    if root == nil {
        return [][]int{}
    }

    queue := []*TreeNode{root}
    result := make([][]int, 0)

    for len(queue) > 0 {
        tmp := make([]int, 0)
        for i := len(queue); i > 0; i-- {
            node := queue[0]
            queue = queue[1:]
            if node.Left != nil {
                queue = append(queue, node.Left)
            }
            if node.Right != nil {
                queue = append(queue, node.Right)
            }
            tmp = append(tmp, node.Val)
        }
        result = append(result, tmp)
        if len(queue) == 0 {
            break
        }
        tmp = make([]int, 0)
        for i := len(queue); i > 0; i-- {
            node := queue[len(queue)-1]
            queue = queue[:len(queue)-1]
            if node.Right != nil {
                queue = append([]*TreeNode{node.Right}, queue...)
            }
            if node.Left != nil {
                queue = append([]*TreeNode{node.Left}, queue...)
            }
            tmp = append(tmp, node.Val)
        }
        result = append(result, tmp)
    }

    return result
}
```

## 33. [二叉搜索树的后序遍历序列](https://leetcode-cn.com/problems/er-cha-sou-suo-shu-de-hou-xu-bian-li-xu-lie-lcof/)

### Ideas

- **递归**思路是后序遍历最右结点为根结点，其左边第一个大于根结点的值后面的值也必定大于根结点，如不满足则返回`false`，递归由此切分的左右子树，当子树只有一个结点则返回`true`。

### Solutions

- 递归

  ```go
  func verifyPostorder(postorder []int) bool {
     return verify(postorder, 0, len(postorder)-1)
  }
  
  func verify(postorder []int, left, right int) bool {
      if left >= right {
          return true
      }
      tmp := left
      for postorder[tmp] < postorder[right] {
          tmp++
      }
      for _, v := range postorder[tmp:right] {
          if v < postorder[right] {
              return false
          }
      }
      return verify(postorder, left, tmp-1) && verify(postorder, tmp, right-1)
  }
  ```

## [34. 二叉树中和为某一值的路径](https://leetcode-cn.com/problems/er-cha-shu-zhong-he-wei-mou-yi-zhi-de-lu-jing-lcof/)

### 回溯（DFS）

回溯法，设置一个二维列表`res`存储结果，设置一个列表`tmp`存放当前路径。

```go
func pathSum(root *TreeNode, target int) [][]int {
    res := make([][]int, 0)
    tmp := make([]int, 0)
    backtracking(root, target, &res, &tmp)
    return res
}

func backtracking(root *TreeNode, target int, res *[][]int, tmp *[]int) {
    if root == nil {
        return
    }
    target -= root.Val
    *tmp = append(*tmp, root.Val)
    if target == 0 && root.Left == nil && root.Right == nil {
        // 深拷贝，防止共用底层数组导致结果重复
        dest := make([]int, len(*tmp))
        copy(dest, *tmp)
        *res = append(*res, dest)
    }
    backtracking(root.Left, target, res, tmp)
    backtracking(root.Right, target, res, tmp)
    *tmp = (*tmp)[:len(*tmp)-1]
}
```

## [35. 复杂链表的复制](https://leetcode-cn.com/problems/fu-za-lian-biao-de-fu-zhi-lcof/)\*

### 哈希表

哈希表的思路是用一个哈希表存储原链表结点和新链表结点的对应关系，然后将`Next`和`Random`属性复制过去。

-   时间复杂度：$O(n)$
-   空间复杂度：$O(n)$

```go
/**
 * Definition for a Node.
 * type Node struct {
 *     Val int
 *     Next *Node
 *     Random *Node
 * }
 */

func copyRandomList(head *Node) *Node {
    if head == nil {
        return nil
    }

    m := make(map[*Node]*Node)

    for cur := head; cur != nil; cur = cur.Next {
        m[cur] = &Node{cur.Val, nil, nil}
    }

    for cur := head; cur != nil; cur = cur.Next {
        m[cur].Next = m[cur.Next]
        m[cur].Random = m[cur.Random]
    }

    return m[head]
}
```

## [38. 字符串的排列](https://leetcode-cn.com/problems/zi-fu-chuan-de-pai-lie-lcof/)

### 回溯（DFS）

使用标准的回溯加上`visited`数组去重可以完成字符串的所有排列，但当输入的字符串中存在重复字符，结果集就会有重复。需要在同一层判断重复元素并跳过。可以先对字符串进行字符排序，让重复字符位置连续。

```go
func permutation(s string) []string {
    // 排序字符串
    t := []byte(s)
    sort.Slice(t, func(a, b int) bool {return t[a] < t[b]})
    s = string(t)
    res := make([]string, 0)	// 结果集
    visited := make([]bool, len(s))	// 判断是否访问
    dfs(s, "", &res, visited)
    return res
}

func dfs(s, tmp string, res *[]string, visited []bool) {
    if len(tmp) == len(s) {
        *res = append(*res, tmp)
        return
    }

    for i := 0; i < len(s); i++ {
        if visited[i] || (i > 0 && s[i-1] == s[i] && !visited[i-1]) {
            continue
        }
        visited[i] = true
        dfs(s, tmp + s[i:i+1], res, visited)
        visited[i] = false
    }
}
```

## [39. 数组中出现次数超过一半的数字](https://leetcode-cn.com/problems/shu-zu-zhong-chu-xian-ci-shu-chao-guo-yi-ban-de-shu-zi-lcof/)

### 摩尔投票法

由于需要找到的数字的出现次数超过数组大小的一半，因此可以将不相等的数字从数组中剔除，最终留下的就是众数。基于这个思路简化的**摩尔投票法**设定一个变量，当选中的两个数字不等则将该变量-1 操作，相等则+1。

```go
func majorityElement(nums []int) int {
    num, sum := 0, 0
    for _, v := range nums {
        if sum == 0 {
            num = v		// 当sum为0重新设置众数
        }
        if v != num {
            sum--
        } else {
            sum++
        }
    }
    return num
}
```

## 40. [最小的 k 个数](https://leetcode-cn.com/problems/zui-xiao-de-kge-shu-lcof/)

### Ideas

- 排序
- 大根堆

### Solutions

## [42. 连续子数组的最大和](https://leetcode-cn.com/problems/lian-xu-zi-shu-zu-de-zui-da-he-lcof/)

### 动态规划

- 时间复杂度：$O(n)$
- 空间复杂度：$O(n)$

```go
func maxSubArray(nums []int) int {
    dp := make([]int, len(nums))
    dp[0] = nums[0]
    maxNum := dp[0]
    for i := 1; i < len(nums); i++ {
        dp[i] = max(dp[i-1] + nums[i], nums[i])
        if dp[i] > maxNum {
            maxNum = dp[i]
        }
    }
    return maxNum
}

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}
```

### 动态规划（OPT）

- 时间复杂度：$O(n)$
- 空间复杂度：$O(1)$

```go
func maxSubArray(nums []int) int {
    pre, post := nums[0], 0
    maxNum := pre
    for i := 1; i < len(nums); i++ {
        pre, post = post, max(pre + nums[i], nums[i])
        maxNum = max(maxNum, post)
    }
    return maxNum
}

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}
```

## [47. 礼物的最大价值](https://leetcode-cn.com/problems/li-wu-de-zui-da-jie-zhi-lcof/)

### 动态规划

遍历整个矩阵，从上到下填充当前路径的最大值。

-   时间复杂度：$O(mn)$
-   空间复杂度：$O(1)$

```go
func maxValue(grid [][]int) int {
    for i := range grid {
        for j := range grid[0] {
            if i == 0 && j > 0 {
                grid[i][j] += grid[i][j-1]
            } else if i > 0 && j == 0 {
                grid[i][j] += grid[i-1][j]
            } else if i > 0 && j > 0 {
                grid[i][j] += max(grid[i-1][j], grid[i][j-1])
            }
        }
    }
    return grid[len(grid)-1][len(grid[0])-1]
}

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}
```

## [50. 第一个只出现一次的字符](https://leetcode-cn.com/problems/di-yi-ge-zhi-chu-xian-yi-ci-de-zi-fu-lcof/)

### HashMap

简单思路是使用 HashMap 统计每个字符的出现次数，再遍历一次取目标值。

- 时间复杂度：$O(n)$
- 空间复杂度：$O(n)$

```go
func firstUniqChar(s string) byte {
    m := make(map[byte]int)
    for i := range s {
        m[s[i]]++
    }
    for i := range s {
        if m[s[i]] == 1 {
            return s[i]
        }
    }
    return ' '
}
```

### 字符数组

和 Map 思路相同，但是由于题目说明字符只能是小写字母，因此可以用字符数组存储。

- 时间复杂度：$O(n)$
- 空间复杂度：$O(1)$

```go
func firstUniqChar(s string) byte {
    m := make([]int, 26)
    for _, v := range s {
        m[v-'a']++
    }
    for _, v := range s {
        if m[v-'a'] == 1 {
            return byte(v)
        }
    }

    return byte(' ')
}
```

## [52. 两个链表的第一个公共节点](https://leetcode-cn.com/problems/liang-ge-lian-biao-de-di-yi-ge-gong-gong-jie-dian-lcof/)

### 双指针

二者遍历到`nil`时，跳转到对方链路的头结点继续遍历，从而使两条链路长度相等。

- 时间复杂度：$O(n)$
- 空间复杂度：$O(1)$

```go
/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */
func getIntersectionNode(headA, headB *ListNode) *ListNode {
    if headA == nil || headB == nil {
        return nil
    }
    pa, pb := headA, headB
    for pa != pb {
        if pa == nil {
            pa = headB
        } else {
            pa = pa.Next
        }
        if pb == nil {
            pb = headA
        } else {
            pb = pb.Next
        }
    }
    return pa
}
```

## [53 - I. 在排序数组中查找数字 I](https://leetcode-cn.com/problems/zai-pai-xu-shu-zu-zhong-cha-zhao-shu-zi-lcof/)

### 二分查找

二分查找到第一个目标数字，再从该位置向后遍历统计等于目标值的元素个数。

```go
func search(nums []int, target int) int {
    length := len(nums)
    left, right, mid := 0, length - 1, 0
    for left < right {
        mid = (left+right)>>1
        if nums[mid] < target {
            left = mid + 1
        } else {
            right = mid
        }
    }
    count := 0
    for left < length && nums[left] == target {
        count++
        left++
    }
    return count
}
```

### 两次二分查找

```go
func search(nums []int, target int) int {
    length := len(nums)
    left, right, mid := 0, length - 1, 0
    // 找左边界
    for left < right {
        mid = (left+right)>>1
        if nums[mid] < target {
            left = mid + 1
        } else {
            right = mid
        }
    }
    l := left // 记录左边界

    if length > 0 && nums[l] != target {
        // 找不到，提前返回
        return 0
    }

    // 找右边界
    right = length-1
    for left <= right {
        mid = (left+right)>>1
        if nums[mid] <= target {
            left = mid + 1
        } else {
            right = mid - 1
        }
    }

    return right - l + 1
}
```

### 两次二分查找（OPT）

可以注意到，查找`target-1`右边界时，会定位到`target`的左边界，以此简化代码如下：

```go
func search(nums []int, target int) int {
    length := len(nums)
    left, right, mid := 0, length-1, 0
    helper := func(l, r, t int) int {
        for l <= r {
            mid = (l+r)>>1
            if nums[mid] <= t {
                l = mid + 1
            } else {
                r = mid - 1
            }
        }
        return r
    }

    return helper(left, right, target) - helper(left, right, target-1)
}
```

## [53 - II. 0 ～ n-1 中缺失的数字](https://leetcode-cn.com/problems/que-shi-de-shu-zi-lcof/)

### 二分查找

数组只缺少一个数字，缺失数字之前的数字下标和其值相等，因此可使用二分法进行查找。

- 时间复杂度：$O(log{n})$
- 空间复杂度：$O(1)$

```go
func missingNumber(nums []int) int {
    length := len(nums)

    if length - 1 == nums[length-1] {
        // 当缺失的数字在数组最后时的情况
        return nums[length-1] + 1
    }

    left, right, mid := 0, length - 1, 0
    for left < right {
        // 二分法查找目标数字
        mid = (left + right) / 2
        if nums[mid] == mid {
            // 下标匹配，表明左半部分有序
            left = mid + 1
        } else {
            // 左半部分无序
            right = mid
        }
    }

    return left
}
```

## [54. 二叉搜索树的第k大节点](https://leetcode-cn.com/problems/er-cha-sou-suo-shu-de-di-kda-jie-dian-lcof/)

### 中序遍历

由于二叉搜索树的特性，即中序遍历结果有序，因此可以使用中序遍历得到结果。

时间复杂度：$O(n)$

空间复杂度：$O(n)$

>   最差情况：当树退化为链表时。

```go
/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */
var res = 0
var count = 0
func kthLargest(root *TreeNode, k int) int {
    res = 0		// 重置全局变量值，防止用例干扰
    count = 0
    inorder(root, k)
    return res
}

func inorder(root *TreeNode, k int) {
    if root == nil {
        return
    }
    inorder(root.Right, k)	// 先遍历右子树，得到中序遍历结果的逆序
    count++
    if count == k {
        // 当遍历的结点数等于 k 则返回
        res = root.Val
        return
    }
    inorder(root.Left, k)
}
```

## [55 - I. 二叉树的深度](https://leetcode-cn.com/problems/er-cha-shu-de-shen-du-lcof/)

### 递归（DFS）

- 时间复杂度：$O(n)$
- 空间复杂度：$O(n)$

```go
func maxDepth(root *TreeNode) int {
    if root == nil {
        return 0
    }
    return max(maxDepth(root.Left), maxDepth(root.Right)) + 1
}

// 返回较大值
func max(a, b int) int {
    if a >= b {
        return a
    }
    return b
}
```

### 层序遍历（BFS）

- 时间复杂度：$O(n)$
- 空间复杂度：$O(n)$

```go
/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */
func maxDepth(root *TreeNode) int {
    if root == nil {
        return 0
    }
    count := 0	// 统计层数
    queue := []*TreeNode{root} // 队列
    for len(queue) > 0 {
        for i := len(queue); i > 0; i-- {
            node := queue[0]
            queue = queue[1:]
            if node.Left != nil {
                queue = append(queue, node.Left)
            }
            if node.Right != nil {
                queue = append(queue, node.Right)
            }
        }
        count++
    }
    return count
}
```

## [55 - II. 平衡二叉树](https://leetcode-cn.com/problems/ping-heng-er-cha-shu-lcof/)\*

### DFS

```go
/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */
func isBalanced(root *TreeNode) bool {
    if root == nil {
        // 递归完毕，返回
        return true
    }
    if sub := depth(root.Left) - depth(root.Right); sub <= 1 && -sub <= 1 {
        // 当前结点平衡，递归求下一结点
        return isBalanced(root.Left) && isBalanced(root.Right)
    }
    return false
}

// depth 求子树高度
func depth(root *TreeNode) int {
    if root == nil {
        return 0
    }
    return max(depth(root.Left), depth(root.Right)) + 1
}

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}
```

## [56 - I. 数组中数字出现的次数](https://leetcode-cn.com/problems/shu-zu-zhong-shu-zi-chu-xian-de-ci-shu-lcof/)\*



## [56 - II. 数组中数字出现的次数 II](https://leetcode-cn.com/problems/shu-zu-zhong-shu-zi-chu-xian-de-ci-shu-ii-lcof/)\*

### 哈希表

简单粗暴，效率不高。

```go
func singleNumber(nums []int) int {
    m := make(map[int]int)
    for _, v := range nums {
        m[v]++
    }
    for k, v := range m {
        if v == 1 {
            return k
        }
    }
    return 0
}
```

### 位运算



## [57. 和为 s 的两个数字](https://leetcode-cn.com/problems/he-wei-sde-liang-ge-shu-zi-lcof/)

### 双指针

-   时间复杂度：$O(n)$
-   空间复杂度：$O(1)$

```go
func twoSum(nums []int, target int) []int {
    low, high := 0, len(nums) - 1
    for low < high {
        if nums[low] + nums[high] == target {
            return []int{nums[low], nums[high]}
        } else if nums[low] + nums[high] > target {
            high--
        } else {
            low++
        }
    }
    return nil
}
```

### 二分查找

对每个数字二分查找目标值。

-   时间复杂度：$O(nlogn)$
-   空间复杂度：$O(1)$

## [58 - I. 翻转单词顺序](https://leetcode-cn.com/problems/fan-zhuan-dan-ci-shun-xu-lcof/)

### 库函数

>   该解法效率极低。

```go
func reverseWords(s string) string {
    s = strings.Trim(s, " ")
    arr := strings.Split(s, " ")
    res := ""
    for i := len(arr)-1; i >= 0; i-- {
        if !strings.Contains(arr[i], " ") && arr[i] != "" {
            res += strings.Trim(arr[i], " ")
            if i > 0 {
                res += " "
            }
        }
       
    }
    return res
}
```

## [63. 股票的最大利润](https://leetcode-cn.com/problems/gu-piao-de-zui-da-li-run-lcof/)

### 动态规划

由于本题股票只能购买一次，实际上就是找整数对（买入价格，卖出价格），找出差值最大的整数对即可。

-   时间复杂度：$O(n)$
-   空间复杂度：$O(1)$

```go
func maxProfit(prices []int) int {
    if len(prices) <= 1 {
        return 0
    }

    res := 0			// 差值
    min := prices[0]	// 记录最低买入价

    for i := 1; i < len(prices); i++ {
        if prices[i] < min {
            // 记录更低的价格
            min = prices[i]
        } else {
            // 将更大的差值
            res = max(res, prices[i] - min)
        }
    }
    return res
}

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}
```

## 58-2. [左旋转字符串](https://leetcode-cn.com/problems/zuo-xuan-zhuan-zi-fu-chuan-lcof/)

### Ideas

- 使用拼接字符串

### Solutions

- 字符串拼接

  ```go
  func LeftRotateString(str string, n int) string {
      if len(str) <= 1 {
          return str
      }
      return str[n:] + string(str[0:n])
  }
  ```

## [61. 扑克牌中的顺子](https://leetcode-cn.com/problems/bu-ke-pai-zhong-de-shun-zi-lcof/)

### 排序 + 数学

1.  首先通过排序方便检查重复并判断有序
2.  记录 0 的个数
3.  当非 0 的数字出现重复，则可以确定不满足条件
4.  0 的个数正好等于第一个非零数字的下标
5.  非零数字的两端差值小于 5 则表明中间能够用 0 填充使其满足条件

- 时间复杂度：$O(n)$
- 空间复杂度：$O(n)$

```go
func isStraight(nums []int) bool {
    sort.Ints(nums)	// 排序
    count := 0
    for i := 0; i < 4; i++ {
        if nums[i] == 0 {
            // 统计 0 的个数
            count++
        } else if nums[i] == nums[i+1] {
            // 非 0 数字重复
            return false
        }
    }
    return nums[4] - nums[count] < 5
}
```

## [64. 求 1+2+…+n](https://leetcode-cn.com/problems/qiu-12n-lcof/)

### 数学

解法：

$f(x) = x(1 + x)/2$

>   梯形面积公式。

```go
func sumNums(n int) int {
    return (1 + n) * n / 2
}
```

## [65. 不用加减乘除做加法](https://leetcode-cn.com/problems/bu-yong-jia-jian-cheng-chu-zuo-jia-fa-lcof/)

### 位运算

使用`sum`记录和，`carry`记录进位的大小。

```go
func add(a int, b int) int {
    for b != 0 {
        sum := a ^ b
        carry := a & b << 1
        a = sum
        b = carry
    }
    return a
}
```

```go
func add(a int, b int) int {
    for b != 0 {
        a, b = a ^ b, a & b << 1
    }
    return a
}
```

## 68-2. [二叉树的最近公共祖先](https://leetcode-cn.com/problems/er-cha-shu-de-zui-jin-gong-gong-zu-xian-lcof/)

### Ideas

- 由于是二叉搜索树，因此从根结点遍历，判断目标节点在其左子树还是右子树，不断遍历直到根结点的值大于小目标值，小于大目标值。

### Solutions

- Common

  ```go
  func lowestCommonAncestor(root, p, q *TreeNode) *TreeNode {
  	for root != nil {
  		if root.Val < p.Val && root.Val < q.Val {
  			root = root.Right
  		} else if root.Val > p.Val && root.Val > q.Val {
  			root = root.Left
  		} else {
  			break
  		}
  	}
  	return root
  }
  ```
