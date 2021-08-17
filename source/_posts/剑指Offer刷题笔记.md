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

## 4. [二维数组中的查找](https://leetcode-cn.com/problems/er-wei-shu-zu-zhong-de-cha-zhao-lcof/)

### Ideas

- 将这个二维数组看作一个矩阵，其行列都递增排列。很明显解题方法是对比某一中间数字，不断缩小范围，所以要确定对比的数字。

  从左上角入手对比并不会缩小很明显的范围，右下角同理，而左下角和右上角数字满足。

  选取右上角进行对比，当前对比的数字为 num，当 target > num，缩小范围，排除第一行。当 target < num，排除最后一列，直到找到目标数字。

### Solutions

- Common

  ```go
  func findNumberIn2DArray(matrix [][]int, target int) bool {
      if len(matrix) == 0 {
          return false
      }
      var row int
      var col = len(matrix[0])-1
      for row < len(matrix) && col >= 0{
          num := matrix[row][col]
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

## 5. [替换空格](https://leetcode-cn.com/problems/ti-huan-kong-ge-lcof/)

### Ideas

- 对于字符数组（如 C 实现）的原地实现，可以先遍历一遍数组，得出空格个数$x$，则新数组长度为$length+2x$。扩容后使用双指针解法，从最后一个非空元素开始移到数组末尾，遇到空格新增三个目标字符，直到替换完最后一个空格。

- 对于 Golang 非原地实现，可以直接遍历字符串将其替换为*%20*。

### Solutions

- Common

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

## 7. [重建二叉树](https://leetcode-cn.com/problems/zhong-jian-er-cha-shu-lcof/)

### Ideas

- 递归

### Solutions

- 递归

  ```go
  func buildTree(preorder []int, inorder []int) *TreeNode {
      for k, v := range inorder {
          if v == preorder[0] {
              return &TreeNode{
                  Val: preorder[0],
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

## 10-1. [斐波那契数列](https://leetcode-cn.com/problems/fei-bo-na-qi-shu-lie-lcof/)

### Ideas

- 典型动态规划

### Solutions

- DP

  ```go
  func fib(n int) int {
      if n <= 1 {
          return n
      }
      pre1, pre2, res := 0, 1, 0
      for i := 2; i <= n; i++ {
          res = (pre1 + pre2)%1000000007
          pre1 = pre2
          pre2 = res
      }
      return res
  }
  ```

## 10-2. [青蛙跳台阶问题](https://leetcode-cn.com/problems/qing-wa-tiao-tai-jie-wen-ti-lcof/)

### Ideas

- 斐波那契数列解法，典型动态规划

### Solutions

- DP

  ```go
  func numWays(n int) int {
      if n == 0 {
          return 1
      }
      if n <= 2 {
          return n
      }
      pre1, pre2, res := 1, 2, 0
      for i := 3; i <= n; i++ {
          res = (pre1 + pre2) % 1000000007
          pre1 = pre2
          pre2 = res
      }
      return res
  }
  ```

## 11. [旋转数组的最小数字](https://leetcode-cn.com/problems/xuan-zhuan-shu-zu-de-zui-xiao-shu-zi-lcof/)

### Ideas

- 遍历找到逆序的第一个元素

### Solutions

- 高低

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

## 12. [矩阵中的路径](https://leetcode-cn.com/problems/ju-zhen-zhong-de-lu-jing-lcof/)

### Ideas

- 回溯法

### Solutions

- BackTracking

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

## 13. [机器人的运动范围](https://leetcode-cn.com/problems/ji-qi-ren-de-yun-dong-fan-wei-lcof/)

### Ideas

- DFS
- BFS

### Solutions

- DFS

  ```go
  func movingCount(m int, n int, k int, ) int {
      visited := make([][]bool, m)
      for i := range visited {
          visited[i] = make([]bool, n)
      }
      return dfs(0, 0, m, n, k, &visited)
  }
  
  func dfs(row, col, m, n, k int, visited *[][]bool) int {
      if row >= m || col >= n || (*visited)[row][col] {
          return 0
      }
      if row % 10 + row / 10 + col % 10 + col / 10 > k {
          return 0
      }
      (*visited)[row][col] = true
      return 1 + dfs(row+1, col, m, n, k, visited) + dfs(row, col+1, m, n, k, visited)
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

## 15. [二进制中 1 的个数](https://leetcode-cn.com/problems/er-jin-zhi-zhong-1de-ge-shu-lcof/)

### Ideas

- 位运算，移位

### Solutions

- 移位

  ```go
  func hammingWeight(num uint32) int {
      var count int
      for i := 0; i < 32; i++ {
          if num%2 == 1 {
              count++
          }
          num = num >> 1
      }
      return count
  }
  ```

## 16. [数值的整数次方](https://leetcode-cn.com/problems/shu-zhi-de-zheng-shu-ci-fang-lcof/)

### Ideas

- 快速幂

### Solutions

- Mid

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

## 17. [打印从 1 到最大的 n 位数](https://leetcode-cn.com/problems/da-yin-cong-1dao-zui-da-de-nwei-shu-lcof/)

### Ideas

- 直接生成指定大小的列表，迭代填充后返回

### Solutions

- Common

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

### Ideas

- **递归**

### Solutions

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

### Ideas

- 头尾双指针

### Solutions

- 头尾双指针

  ```go
  func exchange(nums []int) []int {
      length := len(nums)
      if length < 2 {
          return nums
      }
      idx1, idx2 := 0, length-1
      for idx1 < idx2 {
          if nums[idx1]%2 != 0 {
              idx1++
              continue
          }
          if nums[idx2]%2 == 0 {
              idx2--
              continue
          }
          nums[idx1], nums[idx2] = nums[idx2], nums[idx1]
      }
      return nums
  }
  ```

## 22. [链表中倒数第 k 个节点](https://leetcode-cn.com/problems/lian-biao-zhong-dao-shu-di-kge-jie-dian-lcof/)

### Ideas

- 由于是倒数 k 个节点，因此可以先遍历一遍链表得到链表长度，再减去 k 得到结果链表的起始位置，最后将从该位置开始的链表返回即可。

- **双指针**的思路是首先遍历到链表第 k 个节点，然后再用一个指针去从头遍历，第二个指针遍历的过程中第一个指针也同步往后移动，直到指向末尾，返回第二个指针。

### Solutions

- 计算长度

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

- 双指针

  ```go
  func getKthFromEnd(head *ListNode, k int) *ListNode {
      count := 0
      p := head
      for head != nil {
          if count == k {
              p = p.Next
          } else {
              count++
          }
          head = head.Next
      }
      return p
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

## 25. [合并两个排序的链表](https://leetcode-cn.com/problems/he-bing-liang-ge-pai-xu-de-lian-biao-lcof/)

### Ideas

- **递归**实现

### Solutions

- 递归

  ```go
  func mergeTwoLists(l1 *ListNode, l2 *ListNode) *ListNode {
      if l1 == nil {
          return l2
      }
      if l2 == nil {
          return l1
      }
      if l1.Val < l2.Val {
          l1.Next = mergeTwoLists(l1.Next, l2)
          return l1
      } else {
          l2.Next = mergeTwoLists(l1, l2.Next)
          return l2
      }
  }
  ```

## 26. [树的子结构](https://leetcode-cn.com/problems/shu-de-zi-jie-gou-lcof/)

### Ideas

- 递归

### Solutions

- 递归

  ```go
  func isSubStructure(A *TreeNode, B *TreeNode) bool {
      if A == nil || B == nil {
          return false
      }
      return isEqual(A, B) || isSubStructure(A.Left, B) || isSubStructure(A.Right, B)
  }
  
  func isEqual(A, B *TreeNode) bool {
      if B == nil {
          return true
      }
      if A == nil || A.Val != B.Val {
          return false
      }
      return isEqual(A.Left, B.Left) && isEqual(A.Right, B.Right)
  }
  ```

## 27. [二叉树的镜像](https://leetcode-cn.com/problems/er-cha-shu-de-jing-xiang-lcof/)

### Ideas

- 递归交换

### Solutions

- 递归

  ```go
  func mirrorTree(root *TreeNode) *TreeNode {
      if root == nil {
          return root
      }
      root.Left, root.Right = root.Right, root.Left
      mirrorTree(root.Left)
      mirrorTree(root.Right)
      return root
  }
  ```

## 28. [对称的二叉树](https://leetcode-cn.com/problems/dui-cheng-de-er-cha-shu-lcof/)

### Ideas

- **递归**
  - 入口参数：
    - `root.Left`
    - `root.Right`
  - 递归出口：
    - `node1` 为 `nil`，`node2`不为`nil`，返回`false`
    - `node1` 不为 `nil`，`node2`为`nil`，返回`false`
    - `node1` 为 `nil`，`node2`为`nil`，返回`false`
  - 递归调用：
    - `node1`和`node2`值相等，且`node1`左右儿子结点的值等于`node2`右左儿子结点返回`true`

#### Solutions

- 递归

  ```go
  func isSymmetric(root *TreeNode) bool {
      if root == nil {
          return true
      }
      return helper(root.Left, root.Right)
  }
  
  func helper(node1, node2 *TreeNode) bool {
      if node1 == nil || node2 == nil {
          if node1 == node2 {
              return true
          }
          return false
      }
      return node1.Val == node2.Val && helper(node1.Left, node2.Right) && helper(node1.Right, node2.Left)
  }
  ```

## 29. [顺时针打印矩阵](https://leetcode-cn.com/problems/shun-shi-zhen-da-yin-ju-zhen-lcof/)

### Ideas

- 循环

### Solutions

- Common

  ```go
  func spiralOrder(matrix [][]int) []int {
      if len(matrix) == 0 {
          return []int{}
      }
      var res []int
      rowMin, colMin := 0, 0
      rowMax, colMax := len(matrix), len(matrix[0])
      for {
          // 左->右
          for i:=colMin; i<colMax; i++ {
              res = append(res, matrix[rowMin][i])
          }
          rowMin++
          if rowMin >= rowMax {
              break
          }
          // 上->下
          for i:=rowMin; i<rowMax; i++ {
              res = append(res, matrix[i][colMax-1])
          }
          colMax--
          if colMin >= colMax {
              break
          }
          // 右->左
          for i:=colMax-1; i>=colMin; i-- {
              res = append(res, matrix[rowMax-1][i])
          }
          rowMax--
          if rowMin >= rowMax {
              break
          }
          // 下->上
          for i:=rowMax-1; i >=rowMin; i-- {
              res = append(res, matrix[i][colMin])
          }
          colMin++
          if colMin >= colMax {
              break
          }
      }
      return res
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

## 31. [栈的压入、弹出序列](https://leetcode-cn.com/problems/zhan-de-ya-ru-dan-chu-xu-lie-lcof/)

### Ideas

- **模拟栈**输入

### Solutions

- 模拟栈

  ```go
  func validateStackSequences(pushed []int, popped []int) bool {
      var stack []int		// 模拟栈
      // 入栈
      for i := 0; i < len(pushed); i++ {
          stack = append(stack, pushed[i])
          // 循环出栈
          for len(stack)>0 && stack[len(stack)-1] == popped[0] {
              popped = popped[1:]
              stack = stack[:len(stack)-1]
              if len(popped) == 0 {
                  break
              }
          }
      }
      return len(popped) == 0
  }
  ```

## 32-1. [从上到下打印二叉树](https://leetcode-cn.com/problems/cong-shang-dao-xia-da-yin-er-cha-shu-lcof/)

### Ideas

- 层序遍历

### Solutions

- 层序遍历

  ```go
  func levelOrder(root *TreeNode) []int {
      if root == nil {
          return nil
      }
      queue := make([]*TreeNode, 0)	// 过程队列
      result := make([]int, 0)		// 存储结果
      queue = append(queue, root)
      for len(queue) > 0 {
          root := queue[0]
          if root.Left != nil {
              queue = append(queue, root.Left)
          }
          if root.Right != nil {
              queue = append(queue, root.Right)
          }
          result = append(result, root.Val)
          queue = queue[1:] // 出队
      }
      return result
  }
  ```

## 32-2. [从上到下打印二叉树 II](https://leetcode-cn.com/problems/cong-shang-dao-xia-da-yin-er-cha-shu-ii-lcof/)

### Ideas

### Solutions

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

## 34. [二叉树中和为某一值的路径](https://leetcode-cn.com/problems/er-cha-shu-zhong-he-wei-mou-yi-zhi-de-lu-jing-lcof/)

### Ideas

- 回溯法，设置一个二维列表`res`存储结果，设置一个列表`tmp`存放当前路径。

### Solutions

- 回溯法

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

## 39. [数组中出现次数超过一半的数字](https://leetcode-cn.com/problems/shu-zu-zhong-chu-xian-ci-shu-chao-guo-yi-ban-de-shu-zi-lcof/)

### Ideas

- 常规**Map**思路是记录每个数字的出现次数，返回最大者。

- 由于需要找到的数字的出现次数超过数组大小的一半，因此可以将不相等的数字从数组中剔除，最终留下的就是众数。基于这个思路简化的**摩尔投票法**设定一个变量，当选中的两个数字不等则将该变量-1 操作，相等则+1。

### Solutions

- 摩尔投票法

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

## 42. [连续子数组的最大和](https://leetcode-cn.com/problems/lian-xu-zi-shu-zu-de-zui-da-he-lcof/)

### Ideas

- DP

### Solutions

- DP

## 50. [第一个只出现一次的字符](https://leetcode-cn.com/problems/di-yi-ge-zhi-chu-xian-yi-ci-de-zi-fu-lcof/)

### Ideas

- Map 计数两次遍历
- 和 Map 思路相同，但是由于题目说明字符只能是小写字母，因此可以用字符数组存储

### Solutions

- Map 计数两次遍历

  ```go
  func firstUniqChar(s string) byte {
      m := make(map[byte]int)
      byteArr := []byte(s)
      for _, v := range byteArr {
          m[v]++
      }
      for _, v := range byteArr {
          if m[v] == 1 {
              return v
          }
      }
      return byte(' ')
  }
  ```

- 字符数组

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

## 52. [两个链表的第一个公共节点](https://leetcode-cn.com/problems/liang-ge-lian-biao-de-di-yi-ge-gong-gong-jie-dian-lcof/)

### Ideas

- 二者遍历到`nil`时，跳转到对方链路的头结点继续遍历，从而使两条链路长度相等。

### Solutions

- 交叉遍历

  ```go
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

## 53-1. [在排序数组中查找数字 I](https://leetcode-cn.com/problems/zai-pai-xu-shu-zu-zhong-cha-zhao-shu-zi-lcof/)

### Ideas

- 二分查找

### Solutions

- 二分查找

  ```go
  func search(nums []int, target int) int {
      left, right := 0, len(nums)-1
      count := 0
      for left < right {
          mid := (left+right)/2
          if nums[mid] < target {
              left = mid+1
          } else {
              right = mid
          }
      }
      for left < len(nums) {
          if nums[left] == target {
              count++
          }
          left++
      }
      return count
  }
  ```

## 55-1. [二叉树的深度](https://leetcode-cn.com/problems/er-cha-shu-de-shen-du-lcof/)

### Ideas

- 递归解法

### Solutions

- 递归

  ```go
  func maxDepth(root *TreeNode) int {
      if root == nil {
          return 0
      }
      return max(maxDepth(root.Left), maxDepth(root.Right)) + 1
  }
  
  func max(a, b int) int {
      if a >= b {
          return a
      }
      return b
  }
  ```

## 57-1. [和为 s 的两个数字](https://leetcode-cn.com/problems/he-wei-sde-liang-ge-shu-zi-lcof/)

### Ideas

- 双指针

### Solutions

- 双指针

  ```go
  func twoSum(nums []int, target int) []int {
      left, right := 0, len(nums)-1
      for left < right {
          if nums[left] + nums[right] == target {
              return []int{nums[left], nums[right]}
          } else if nums[left] + nums[right] < target {
              left++
          } else {
              right--
          }
      }
      return nil
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

## 64. [求 1+2+…+n](https://leetcode-cn.com/problems/qiu-12n-lcof/)

### Ideas

- 数学问题，解法：$y=(x+1)*(x/2)+(x\pmod2)*(x+1)/2$​​

  不保留小数位

### Solutions

- Math

  ```go
  func Sum_Solution( n int ) int {
      return (n + 1) * (n / 2) + (n % 2) * (n + 1) / 2
  }
  ```

## 65. [不用加减乘除做加法](https://leetcode-cn.com/problems/bu-yong-jia-jian-cheng-chu-zuo-jia-fa-lcof/)

### Ideas

- 位运算，或用来计算和，与用来计算进位，循环计算

### Solutions

- 位运算

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
