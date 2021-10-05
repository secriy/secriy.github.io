---
title: "LeetCode 刷题笔记"
date: 2021-07-15 14:29:11
link: leetcode-practice
categories: 算法刷题
tags:
  - Algorithms
mathjax: true
---

{% noteblock quote cyan %}

LeetCode 刷题记录。

{% endnoteblock %}

<!-- more -->

## Array

### 26. [Remove Duplicates from Sorted Array](https://leetcode.com/problems/remove-duplicates-from-sorted-array/)

#### Ideas

- 双指针
  - left 移动条件：left 为 0 或 left 元素和 left-1 的元素不相等
  - right 移动条件：right 和 left 不等（相等则用 right 覆盖 left）

#### Solutions

- 双指针

  ```go
  func removeDuplicates(nums []int) int {
      left, right := 0, 1
      for right <= len(nums) {
          // left 左移条件
          if left == 0 || nums[left-1] != nums[left] {
              left++
          }
          // right 越界跳出（此时 left 左移条件已经执行了）
          if right == len(nums) {
              break
          }
          // right 右移条件
          if nums[left] == nums[right] {
              right++
          } else {
              nums[left] = nums[right]
          }
      }
      return left
  }
  ```

### 27.[Remove Element](https://leetcode.com/problems/remove-element/)

#### Ideas

- 双指针，左指针一步步走，右指针遇到目标数就跳过数字并跳到下一循环。简单来说就是把除了等于目标数的元素都覆盖到前面去

#### Solutions

- 双指针

  ```go
  func removeElement(nums []int, val int) int {
      left, right := 0, 0
      for right < len(nums) {
          // 跳过
          if nums[right] == val {
              right++
              continue
          }
          nums[left] = nums[right]
          left++
          right++
      }
      return left
  }
  ```

### 31. [Next Permutation](https://leetcode.com/problems/next-permutation/)

#### Ideas

- 双指针
  首先要找到左指针元素比其后一个元素小的位置作为 left，在 left 左侧的元素都不需要变动，其后的值必定是递减的，在这后面的值里找一个大于 left 的最小值，二者交换值，最终再将 left 之后的元素按递增排序

#### Solutions

- 双指针

  ```go
  func nextPermutation(nums []int)  {
      left, right := len(nums)-2, len(nums)-1
      // 固定left位置
      for left >=0 && nums[left] >= nums[left+1] {
          left--
      }
      if left >= 0 {
          // 查找left右侧大于left的最小值
          for right >=0 && nums[left] >= nums[right] {
              right--
          }
          // 交换
          nums[left], nums[right] = nums[right], nums[left]
      }
      // 翻转
      reverse(nums[left+1:])
  }
  
  func reverse(nums []int) {
      for i, n := 0, len(nums)-1; i <= n/2 ; i++ {
          nums[i], nums[n-i] = nums[n-i], nums[i]
      }
  }
  ```

### 66. [Plus One](https://leetcode.com/problems/plus-one/description/)

#### Ideas

- 从数组末端开始遍历，当当前数字+1 后大于 9 即进位，将当前数字置 0。如果当前位置为数组首端，在数组前面插入一个 1 即可。

#### Solutions

- Common

  ```go
  func plusOne(digits []int) []int {
  	for i := len(digits) - 1; i >= 0; i-- {
          digits[i]++
  		if digits[i] > 9 {
  			digits[i] = 0
  			if i == 0 {
  				digits = append([]int{1}, digits...)
  				break
  			}
  			continue
  		}
  		break
  	}
  	return digits
  }
  ```

### 88. [Merge Sorted Array](https://leetcode.com/problems/merge-sorted-array/description/)

#### Ideas

- 设置三个指针，分别位于`nums1`（不含 0）末尾、`nums1`（含 0）末尾、`nums2`末尾，从后向前对比两个数组的末尾元素，取大者放入 0 元素位置。
  - 时间复杂度：$O(m+n)$
  - 空间复杂度：$O(1)$

#### Solutions

- Three Pointers

  ```go
  func merge(nums1 []int, m int, nums2 []int, n int)  {
      for i:= m+n-1; i >= 0; i-- {
          if n-1 < 0 || (m-1 >= 0 && nums1[m-1] >= nums2[n-1]) {
              nums1[i] = nums1[m-1]
              m--
          } else {
              nums1[i] = nums2[n-1]
              n--
          }
      }
  }
  ```

### [169. Majority Element](https://leetcode-cn.com/problems/majority-element/)

#### 摩尔投票法

假设一个数为众数，当有数字与其相同时众数统计数量加一，不同时统计数量减一，统计数量为 0 则重新设置众数，这样到最后除目标数字以外都会被抵消掉。

```go
func majorityElement(nums []int) int {
    // num 为众数，sum 为和
    num, sum := 0, 0
    for i := range nums {
        if sum == 0 {
            num = nums[i]
        }
        if nums[i] != num {
            sum--
        } else {
            sum++
        }
    }
    return num
}
```

## Stack

### [155. Min Stack](https://leetcode-cn.com/problems/min-stack/)

设置辅助栈，当有比辅助栈栈顶更小或与其相等的值输入则入栈。弹出时当栈顶相等时弹出辅助栈栈顶。

```go
type MinStack struct {
    Stack []int
    Helper []int
}


func Constructor() MinStack {
    return MinStack{[]int{}, []int{}}
}


func (this *MinStack) Push(val int)  {
    if len(this.Helper) == 0 || val <= this.Helper[len(this.Helper)-1] {
        this.Helper = append(this.Helper, val)
    }
    this.Stack = append(this.Stack, val)
}


func (this *MinStack) Pop()  {
    if this.Stack[len(this.Stack)-1] == this.Helper[len(this.Helper)-1] {
        this.Helper = this.Helper[:len(this.Helper)-1]
    }
    this.Stack = this.Stack[:len(this.Stack)-1]
}


func (this *MinStack) Top() int {
    return this.Stack[len(this.Stack)-1]
}


func (this *MinStack) GetMin() int {
    return this.Helper[len(this.Helper)-1]
}


/**
 * Your MinStack object will be instantiated and called as such:
 * obj := Constructor();
 * obj.Push(val);
 * obj.Pop();
 * param_3 := obj.Top();
 * param_4 := obj.GetMin();
 */
```

## String

### 3. [Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/description/)

#### Ideas

- 使用滑动窗口解法，利用双指针确定最大的窗口。

#### Solutions

- Sliding-Window

  ```go
  func lengthOfLongestSubstring(s string) int {
  	res, left, right := 0, 0, 0
  	m := make(map[byte]bool, 0)
  	for right < len(s) {
  		if _, ok := m[s[right]]; !ok {
  			m[s[right]] = true
  			if right-left+1 > res {
  				res = right - left + 1
  			}
  			right++
  		} else {
  			delete(m, s[left])
  			left++
  		}
  	}
  	return res
  }
  ```

  ```go
  func lengthOfLongestSubstring(s string) int {
      m := make(map[byte]int)
      left, right := 0, 0
      max := 0
      for left < len(s) && right < len(s) {
          // duplicate
          if v, ok := m[s[right]]; ok && v >= left{
              left = v+1
          } else {
              if right-left+1 > max {
                  max = right-left+1
              }
          }
          m[s[right]] = right
          right++
      }
      return max
  }
  ```

### 14. [Longest Common Prefix](https://leetcode.com/problems/longest-common-prefix/description/)

#### Ideas

#### Solutions

### [20. Valid Parentheses](https://leetcode.com/problems/valid-parentheses/description/)

#### 字符串替换

循环将字符串里的`'{}()[]'`替换为空字符串，最终得到空字符串即为匹配。该解法实际效率较低。

```go
func isValid(s string) bool {
	for strings.Contains(s, "[]") || strings.Contains(s, "{}") || strings.Contains(s, "()") {
		s = strings.Replace(s, "[]", "", -1)
		s = strings.Replace(s, "{}", "", -1)
		s = strings.Replace(s, "()", "", -1)
	}
	if s == "" {
		return true
	}
	return false
}
```

#### 栈匹配

对于括号匹配问题常见的解法是使用栈匹配。

```go
func isValid(s string) bool {
    stack := make([]byte, 0)
	length := 0	// 记录栈顶
	for _, v := range []byte(s) {
		stack = append(stack, v)
		length++
		for length > 1 {
			left := stack[length-2]		// 栈末尾倒数第二个
			right := stack[length-1]	// 栈末尾倒数第一个
			if (left == '(' && right == ')') || (left == '{' && right == '}') || (left == '[' && right == ']') {
                length -= 2
				stack = stack[:length]
				continue
			}
			break
		}
	}
	return len(stack) == 0
}
```

### [58. Length of Last Word](https://leetcode-cn.com/problems/length-of-last-word/)

#### 双指针

从后向前遍历，分别记录第一个非空格字符和第二个空格字符串的位置。

```go
func lengthOfLastWord(s string) int {
    left, right := len(s)-1, len(s)-1
    for i := len(s)-1; i >= 0; i-- {
        if left == right && s[i] == ' ' {
            right--
        } else if s[i] == ' ' {
            break
        }
        left--
    }
    return right - left
}
```

### 75. [Sort Colors](https://leetcode.com/problems/sort-colors/)

#### Ideas

- 荷兰国旗问题，使用双指针，参见[漫画：常考的荷兰国旗问题你还不会吗？（初级）](https://cloud.tencent.com/developer/article/1624933)

#### Solutions

- 双指针

  ```go
  func sortColors(nums []int)  {
      pa, pb := 0, len(nums)-1
      for i := 0; i <= pb; i++ {
          if nums[i] == 0 {
              nums[i], nums[pa] = nums[pa], nums[i]
              pa++
          }
          if nums[i] == 2 {
              nums[i], nums[pb] = nums[pb], nums[i]
              pb--
              i--
          }
      }
  }
  ```

### 345. [Reverse Vowels of a String](https://leetcode.com/problems/reverse-vowels-of-a-string/)

#### Ideas

- 双指针，题目要求仅翻转元音字母，字符串翻转通过左右双指针交换即可，让两个指针遇到非元音字母时跳过
  - 时间复杂度：$O(n)$
  - 空间复杂度：$O(1)$（Go 中为$O(n)$）

#### Solutions

- 双指针

  ```go
  func reverseVowels(s string) string {
      tmp := []byte(s)
      pa, pb := 0, len(s)-1
      for pa < pb {
          for pa < len(s) && !strings.Contains("aeiouAEIOU", string(tmp[pa])) {
              pa++
          }
          for pb > 0 && !strings.Contains("aeiouAEIOU", string(tmp[pb])) {
              pb--
          }
          if pa < pb {
              tmp[pa], tmp[pb] = tmp[pb], tmp[pa]
              pa++
              pb--
          }
      }
      return string(tmp)
  }
  ```

## Linked List

### 2. [Add Two Numbers](https://leetcode-cn.com/problems/add-two-numbers/)

#### 常规

用 l1 存加法结果，l1 长度小于 l2 时将 l2 后半部分链表接到 l1 末尾。

```go
func addTwoNumbers(l1 *ListNode, l2 *ListNode) *ListNode {
    carry := 0 // 进位
    dummy := l1 // 结果
    var pre *ListNode // 指向最后一个结点
    for l1 != nil {
        pre = l1
        if l1.Next == nil && l2 != nil {
            // l2 长度大于 l1，将 l2 链接到 l1 上
            l1.Next = l2.Next
            l2.Next = nil
        }
        if l2 != nil {
            l1.Val += (l2.Val + carry)
        } else {
            l1.Val += carry
        }

        carry = l1.Val/10
        l1.Val %= 10

        if l1 != nil {
            l1 = l1.Next
        }
        if l2 != nil {
            l2 = l2.Next
        }
    }

    if carry > 0 {
        pre.Next = &ListNode{Val: carry}
    }

    return dummy
}
```

### 19. [Remove Nth Node From End of List](https://leetcode.com/problems/remove-nth-node-from-end-of-list/)

#### Ideas

- **双指针**，第一个指针一直往下走，并将倒数的数值`n`减一，直到`n==0`第二个指针再走，其中用`pre`指针记录第二个指针的原位置。第一个指针到底（为`nil`）时则返回。

#### Solutions

- 双指针

  ```go
  func removeNthFromEnd(head *ListNode, n int) *ListNode {
      pre, p1, p2 := head, head, head		// pre记录前置节点
      for p2 != nil {
          if n == 0 {
              pre = p1
              p1 = p1.Next
          } else {
              n--
          }
          p2 = p2.Next
      }
      // 判断是否删除的是链表头节点，若是直接返回下一节点
      if pre == p1 {
          return pre.Next
      }
      // 删除pre节点后一节点（即p1s）
      pre.Next = p1.Next
      return head
  }
  ```

- 双指针（改良）

  ```go
  func removeNthFromEnd(head *ListNode, n int) *ListNode {
      dummy := new(ListNode) // 在 head 前防止虚拟节点，解决删除的是第一个元素的问题
      dummy.Next = head
      p := head	// p 是用于探底的指针
      head = dummy
      // p 先走
      for n > 0 {
          p = p.Next
          n--
      }
      // dummy 跟着往后走，直到 p 到底
      for p != nil {
          dummy = dummy.Next
          p = p.Next
      }
      // 删除结点
      dummy.Next = dummy.Next.Next
      return head.Next
  }
  
  ```

### 21. [Merge Two Sorted Lists](https://leetcode.com/problems/merge-two-sorted-lists/description/)

#### Ideas

- 递归解法。

#### Solutions

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

### 61. [Rotate List](https://leetcode.com/problems/rotate-list/)

#### Ideas

- 双指针解法，本题要求得到循环`n`次的链表，循环次数可能比链表本身的长度还要长，因此可以将链表串成循环链表，再将其从中间拆分
  时间复杂度：$O(n+k)$
  空间复杂度：$O(1)$

#### Solutions

- 双指针

  ```go
  func rotateRight(head *ListNode, k int) *ListNode {
    	if head == nil {
      	return head
      }
      p := head
      // 计算链表长度
      count := 0
      for {
          count++
          if p.Next == nil {
              break
          }
          p = p.Next
      }
      // 连接链表头尾
      p.Next = head
      // 定位中断位置
      k = count - (k%count)
      for k > 1 {
          head = head.Next
          k--
      }
      // 截断循环链表
      tmp := head.Next
      head.Next = nil
      return tmp
  }
  ```

### 83. [Remove Duplicates from Sorted List](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list/)

```go
func deleteDuplicates(head *ListNode) *ListNode {
    dummy := new(ListNode)
    dummy.Next = head

    slow, fast := dummy, head
    for slow.Next != nil {
        fast = slow.Next
        for fast.Next != nil && slow.Next.Val == fast.Next.Val {
            slow.Next = fast.Next
            fast = slow.Next
        }
        slow = slow.Next
    }

    return dummy.Next
}
```

### 92.

#### Ideas

#### Solutions

- 反转

  ```go
  func reverseBetween(head *ListNode, left, right int) *ListNode {
      dummy := new(ListNode)
      dummy.Next = head
      pre := dummy
      for i := 1; i < left; i++ {
  		pre = pre.Next
      }
      head = pre.Next
      for i := left; i < right; i++ {
          next := head.Next
  		head.Next = next.Next
          next.Next = pre.Next
          pre.Next = next
      }
      return dummy.Next
  }
  ```

### 141. [Linked List Cycle](https://leetcode.com/problems/linked-list-cycle/description/)

#### Ideas

- 最简单的方法是使用 Map 保存结点，当遇到重复即返回。
  - 时间复杂度：$O(n)$
  - 空间复杂度：$O(n)$
- 使用快慢指针，如果存在循环则二者必然交叉，当遇到交叉即返回。
  - 时间复杂度：$O(n)$
  - 空间复杂度：$O(1)$

#### Solutions

- Map

  ```go
  func hasCycle(head *ListNode) bool {
  	m := make(map[*ListNode]bool)
  	for head != nil {
  		if _, ok := m[head]; ok {
  			return true
  		}
  		m[head] = true
  		head = head.Next
  	}
  	return false
  }
  ```

- Slow-Fast Pointer

  ```go
  func hasCycle(head *ListNode) bool {
  	slow, fast := head, head
  	for fast != nil && fast.Next != nil {
  		slow = slow.Next
  		fast = fast.Next.Next
  		if slow == fast {
  			return true
  		}
  	}
      return false
  }
  ```

### 142. [Linked List Cycle II](https://leetcode.com/problems/linked-list-cycle-ii/description/)

#### Ideas

- Map 解法同 141 题，记录指针即可。

- 快慢指针解法，当二者第一次相遇时将其中一个指针返回到链开头，二者以同样的速度往下遍历，直到二者相等即返回。

#### Solutions

- 略

- Slow-Fast Pointer

  ```go
  func detectCycle(head *ListNode) *ListNode {
      slow, fast := head, head
      for fast != nil && fast.Next != nil {
          slow = slow.Next
          fast = fast.Next.Next
          if slow == fast {
              fast = head
              for fast != slow {
                  slow = slow.Next
                  fast = fast.Next
              }
              return fast
          }
      }
      return nil
  }
  ```

### [160. Intersection of Two Linked Lists](https://leetcode.com/problems/intersection-of-two-linked-lists/description/)

#### Hash Table

使用 Map 保存一个链表的所有节点，遍历第二个链表，如果在 Map 中已存在则返回。

```go
/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */
func getIntersectionNode(headA, headB *ListNode) *ListNode {
	m := make(map[*ListNode]bool)
	for headA != nil {
		m[headA] = true
		headA = headA.Next
	}
	for headB != nil {
		if _, ok := m[headB]; ok {
			return headB
		}
		headB = headB.Next
	}
	return nil
}
```

#### Two points

两个链表的长度不同，让二者相遇的办法是让它们的长度变为一致，具体实现是让它们在到达链表末尾后跳转到对方的链首。

```go
/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */	
func getIntersectionNode(headA, headB *ListNode) *ListNode {
    // 边界判断
	if headA == nil || headB == nil {
		return nil
	}
	pA, pB := headA, headB
	for pA != pB {
		if pA != nil {
			pA = pA.Next
		} else {
			pA = headB
		}
		if pB != nil {
			pB = pB.Next
		} else {
			pB = headA
		}
	}
	return pA
}
```

### 206. [Reverse Linked List](https://leetcode.com/problems/reverse-linked-list/description/)

#### Ideas

- 遍历链表并重新创建一个链表，比较简单粗暴。
- 记录前一个结点，并将当前节点指向前一结点。
- 递归

#### Solutions

- 反转

  ```go
  func reverseList(head *ListNode) *ListNode {
  	var prev, next *ListNode
  	for {
  		next = head.Next 	// 存储下一结点
  		head.Next = prev   	// 改变指针
  		prev = head			// 存储当前结点
  		head = next			// 跳转到下一个结点
  	}
  	return prev
  }
  ```

- 递归

  ```go
  func reverseList(head *ListNode) *ListNode {
      if head == nil || head.Next == nil {
          return head
      }
      dummy := reverseList(head.Next)
      head.Next.Next = head	// 让下一结点指向自己
      head.Next = nil			// 删除指向下一结点的指针
      return dummy
  }
  ```

## Binary Tree

### 94. [Binary Tree Inorder Traversal](https://leetcode.com/problems/binary-tree-inorder-traversal/description/)

#### Ideas

- 递归
- 迭代

#### Solutions

- 递归

  ```go
  func inorderTraversal(root *TreeNode) []int {
  	result := make([]int, 0)
  	helper(root, &result)
  	return result
  }

  func helper(root *TreeNode, result *[]int) {
  	if root == nil {
  		return
  	}
  	helper(root.Left, result)
  	*result = append(*result, root.Val)
  	helper(root.Right, result)
  }
  ```

- 迭代

  ```go
  func inorderTraversal(root *TreeNode) []int {
  	stack := make([]*TreeNode, 0)
  	result := make([]int, 0)
  	for root != nil || len(stack) > 0 {
  		for root != nil {
  			stack = append(stack, root)
  			root = root.Left
  		}
  		if len(stack) > 0 {
  			root = stack[len(stack)-1]
  			stack = stack[:len(stack)-1]
  			result = append(result, root.Val)
  			root = root.Right
  		}
  	}
  	return result
  }
  ```

### 100. [Same Tree](https://leetcode.com/problems/same-tree/)

#### Ideas

- 递归 DFS

#### Solutions

- 递归

  ```go
  func isSameTree(p *TreeNode, q *TreeNode) bool {
      if p == nil && q == nil {
          return true
      }
      if p == nil || q == nil || p.Val != q.Val  {
          return false
      }
      return isSameTree(p.Left, q.Left) && isSameTree(p.Right, q.Right)
  }
  ```

### 101. [Symmetric Tree](https://leetcode.com/problems/symmetric-tree/description/)

#### Ideas

- 常规递归解法。

#### Solutions

- Recursion

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
      if left == nil || right == nil || left.Val != right.Val {
          return false
      }
      return helper(left.Left, right.Right) && helper(left.Right, right.Left)
  }
  ```

### [102. Binary Tree Level Order Traversal](https://leetcode-cn.com/problems/binary-tree-level-order-traversal/)

#### 层序遍历

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
        return nil
    }
    result := make([][]int, 0)
    queue := []*TreeNode{root}
    for len(queue) > 0 {
        tmp := make([]int, 0)
        for i := len(queue); i > 0; i-- {
            root := queue[0]
            if root.Left != nil {
                queue = append(queue, root.Left)
            }
            if root.Right != nil {
                queue = append(queue, root.Right)
            }
            tmp = append(tmp, root.Val)
            queue = queue[1:]
        }
        result = append(result, tmp)
    }
    return result
}
```

### 105. [Construct Binary Tree from Preorder and Inorder Traversal](https://leetcode-cn.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/)

#### 递归

```go
func buildTree(preorder []int, inorder []int) *TreeNode {
    if len(preorder) == 0 {
        return nil
    }

    // 找中序序列左右子树分界点
    i := 0
    for ; i < len(inorder); i++ {
        if preorder[0] == inorder[i] {
            break
        }
    }

    root := &TreeNode{preorder[0], nil, nil}
    // len(inorder[:i]) 为左子树结点数量
    root.Left = buildTree(preorder[1:1+len(inorder[:i])], inorder[:i])
    root.Right = buildTree(preorder[1+len(inorder[:i]):], inorder[i+1:])

    return root
}
```

### 110.[Balanced Binary Tree](https://leetcode.com/problems/balanced-binary-tree/)

#### Ideas

- 递归，先递归求左右子树的深度，判断深度差是否满足条件，递归所有子树

#### Solutions

- 递归

  ```go
  func isBalanced(root *TreeNode) bool {
      if root == nil {
          return true
      }
      // 求左右子树深度差
      sub := helper(root.Left) - helper(root.Right)
      if sub > 1 || sub < -1 {
          return false
      } else {
          // 递归判断子树
          return isBalanced(root.Left) && isBalanced(root.Right)
      }
  }
  
  // 求二叉树深度，来自 LeetCode 104
  func helper(root *TreeNode) int {
      if root == nil {
          return 0
      }
      return max(helper(root.Left), helper(root.Right)) + 1
  }
  
  func max(a, b int) int {
      if a > b {
          return a
      }
      return b
  }
  ```

### 113. [Path Sum II](https://leetcode.com/problems/path-sum-ii/)

#### Ideas

- 回溯

#### Solutions

- 回溯

  ```go
  func pathSum(root *TreeNode, targetSum int) [][]int {
      results := make([][]int, 0)
      tmp := make([]int, 0)
      backtracking(root, targetSum, tmp, &results)
      return results
  }
  
  func backtracking(root *TreeNode, targetSum int, tmp []int, results *[][]int) {
      if root == nil {
          return
      }
      tmp = append(tmp, root.Val)
      // 递归出口
      if targetSum == root.Val && root.Left == nil && root.Right == nil {
          dst := make([]int, len(tmp))
          copy(dst, tmp)
          *results = append(*results, dst)
          return
      }
      backtracking(root.Left, targetSum-root.Val, tmp, results)
      backtracking(root.Right, targetSum-root.Val, tmp, results)
      tmp = tmp[:len(tmp)-1]
  }
  ```

### [226. Invert Binary Tree](https://leetcode-cn.com/problems/invert-binary-tree/)

#### 递归

```go
/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */
func invertTree(root *TreeNode) *TreeNode {
    if root == nil {
        return nil
    }
    root.Left, root.Right = root.Right, root.Left
    invertTree(root.Left)
    invertTree(root.Right)
    return root
}
```

### [543. Diameter of Binary Tree](https://leetcode-cn.com/problems/diameter-of-binary-tree/)

#### 递归

本题的核心是求二叉树的所有左右子树深度和中最大的一个和的值，因此可以使用递归求其深度和。

```go
/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */

var maxNum = 0

func diameterOfBinaryTree(root *TreeNode) int {
    maxNum = 0	// 重置全局变量，防止测试用例干扰
    depth(root)
    return maxNum
}

func depth(root *TreeNode) int {
    if root == nil {
        return 0
    }
    l := depth(root.Left)
    r := depth(root.Right)
    maxNum = max(maxNum, l + r)
    return max(l, r) + 1
}

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}
```

### [617. Merge Two Binary Trees](https://leetcode-cn.com/problems/merge-two-binary-trees/)

#### 递归

递归方法合并二叉树最为简单。

```go
/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */
func mergeTrees(root1 *TreeNode, root2 *TreeNode) *TreeNode {
    if root1 == nil && root2 == nil {
        // 递归出口
        return nil
    }
    if root1 == nil {
        return root2
    }
    if root2 == nil {
        return root1
    }
    root1.Val += root2.Val

    root1.Left = mergeTrees(root1.Left, root2.Left)
    root1.Right = mergeTrees(root1.Right, root2.Right)

    return root1
}
```

## Hash Table

### [1. Two Sum](https://leetcode-cn.com/problems/two-sum/)

最容易想到的方式是使用 Map 存储遍历到的数字，并判断目标数字减去当前数字的结果是否在 Map 中，如过是直接返回。

-   时间复杂度：$O(n)$
-   空间复杂度：$O(n)$

```go
func twoSum(nums []int, target int) []int {
    m := make(map[int]int)	// key: number, value: index
	for k, v := range nums {
		if idx, ok := m[target-v]; ok {
			return []int{k, idx}
		}
		m[v] = k
	}
	return nil
}
```

### 242. [Valid Anagram](https://leetcode.com/problems/valid-anagram/description/)

#### Ideas

1. 使用 HashTable 存储`s`中所有字符的出现次数，和 t 进行对比，相同则返回`true`。
2. 和 HashTable 同样的思路，但由于存储的是小写字母，因此可以直接用一个长度为 26 的数组存储每一个字符的 ASCII 码值。

#### Solutions

1. HashTable

   ```go
   func isAnagram(s string, t string) bool {
   	m := make(map[rune]int)
   	for _, v := range s {
   		m[v]++
   	}
   	for _, v := range t {
   		m[v]--
   	}
   	for _, v := range m {
   		if v != 0 {
   			return false
   		}
   	}
   	return true
   }
   ```

2. 数组

   ```go
   func isAnagram(s string, t string) bool {
   	arr := [26]int{0}
   	for _, v := range s {
   		arr[v%97]++
   	}
   	for _, v := range t {
   		arr[v%97]--
   	}
   	for _, v := range arr {
   		if v != 0 {
   			return false
   		}
   	}
   	return true
   }
   ```

## Math

### [7. Reverse Integer](https://leetcode.com/problems/reverse-integer/description/)

先提出符号，对数字进行循环对 10 取余来得到高一位数字，对地位数字循环乘 10 来进位。

```go
func reverse(x int) int {
    result := 0
    for x != 0 {
        result = result*10 + x%10
        x /= 10
    }
    if bit := result >> 31; bit != 0 && bit != -1 {
        // 判断是否超出范围
        return 0    
    }
    return result
}
```

### [9. Palindrome Number](https://leetcode.com/problems/palindrome-number/description/)

#### 翻转数字

按照第七题写法判断翻转过后是否相等。

```go
func isPalindrome(x int) bool {
    if x < 0 {
        return false
    }
    return x == reverse(x)
}

// 翻转数字
func reverse(x int) int {
    res := 0
    for x != 0 {
        res = res*10 + x%10
        x /= 10
    }
    return res
}
```

简化：

```go
func isPalindrome(x int) bool {
    if x < 0 {
        return false
    }
    tmp := x
    y := 0
    for x != 0 {
        y = y*10 + x%10
        x /= 10
    }
    return tmp == y
}
```

可以将`x`的低位反转存入另一个变量中，并将`x`除以 10，最后判断二者是否相等。

```go
func isPalindrome(x int) bool {
	if x < 0 || (x%10 == 0 && x != 0) {
		return false // x为负数或10的倍数返回false
	}
	num := 0
	for x > num {
		num = num*10 + x%10
		x /= 10
	}
	return x == num || x == num/10
}
```

#### 转换为字符串

把数字转换为字符串，用双指针各自从左右遍历字符串判断二者对应字符是否相同，直到两个指针重叠。

```go
func isPalindrome(x int) bool {
	str := strconv.FormatInt(int64(x), 10)
	length := len(str)
	for i := 0; 2*i < length-1; i++ {
		if str[i] != str[length-1-i] {
			return false
		}
	}
	return true
}
```

### 13. [Roman to Integer](https://leetcode.com/problems/roman-to-integer/description/)

#### Ideas

- 最简单粗暴的解法就是使用`switch`语句判断每一种情况，当遇到能作为前缀的数字时判断后面的数字是否是组合数的情况，如果是则减去多余的值。
- 仍然是`switch`判断每一种情况，但首先把其中带有前缀的字符替换为其他字符。

#### Solutions

- Switch

  ```go
  func romanToInt(s string) int {
  	result := 0
  	for i := 0; i < len(s); i++ {
  		switch s[i] {
  		case 'I':
  			result += 1
  			if i+1 != len(s) && (s[i+1] == 'V' || s[i+1] == 'X') {
  				result += -2
  			}
  		case 'V':
  			result += 5
  		case 'X':
  			result += 10
  			if i+1 != len(s) && (s[i+1] == 'L' || s[i+1] == 'C') {
  				result += -20
  			}
  		case 'L':
  			result += 50
  		case 'C':
  			result += 100
  			if i+1 != len(s) && (s[i+1] == 'D' || s[i+1] == 'M') {
  				result += -200
  			}
  		case 'D':
  			result += 500
  		case 'M':
  			result += 1000
  		}
  	}
  	return result
  }

  ```

  判断前一字符的解法为：

  ```go
  func romanToInt(s string) int {
  	result := 0
  	for i := 0; i < len(s); i++ {
  		switch s[i] {
  		case 'I':
  			result += 1
  		case 'V':
  			result += 5
  			if i > 0 && s[i-1] == 'I' {
  				result -= 2
  			}
  		case 'X':
  			result += 10
  			if i > 0 && s[i-1] == 'I' {
  				result -= 2
  			}
  		case 'L':
  			result += 50
  			if i > 0 && s[i-1] == 'X' {
  				result -= 20
  			}
  		case 'C':
  			result += 100
  			if i > 0 && s[i-1] == 'X' {
  				result -= 20
  			}
  		case 'D':
  			result += 500
  			if i > 0 && s[i-1] == 'C' {
  				result -= 200
  			}
  		case 'M':
  			result += 1000
  			if i > 0 && s[i-1] == 'C' {
  				result -= 200
  			}
  		}
  	}
  	return result
  }
  ```

- Replace

  ```go
  func romanToInt(s string) int {
  	s = strings.Replace(s, "IV", "1", -1)
  	s = strings.Replace(s, "IX", "2", -1)
  	s = strings.Replace(s, "XL", "3", -1)
  	s = strings.Replace(s, "XC", "4", -1)
  	s = strings.Replace(s, "CD", "5", -1)
  	s = strings.Replace(s, "CM", "6", -1)
  	result := 0
  	fmt.Println(s)
  	for _, v := range s {
  		result += getVal(v)
  	}
  	return result
  }
  
  func getVal(r rune) int {
  	switch r {
  	case '1':
  		return 4
  	case '2':
  		return 9
  	case '3':
  		return 40
  	case '4':
  		return 90
  	case '5':
  		return 400
  	case '6':
  		return 900
  	case 'I':
  		return 1
  	case 'V':
  		return 5
  	case 'X':
  		return 10
  	case 'L':
  		return 50
  	case 'C':
  		return 100
  	case 'D':
  		return 500
  	case 'M':
  		return 1000
  	default:
  		return 0
  	}
  }
  ```

### 69. [Sqrt(x)](https://leetcode.com/problems/sqrtx/description/)

#### Ideas

- 采用二分查找的方式，不断缩小范围。

#### Solutions

- Binary Search

  ```go
  func mySqrt(x int) int {
  	if x == 1 {
  		return 1
  	}
  	left, right := 0, x
  	for {
  		mid := (left + right) / 2
  		if mid*mid == x || left == right-1 {
  			return mid
  		}
  		if mid*mid > x {
  			right = mid
  		} else {
  			left = mid
  		}
  
  	}
  }
  ```

## Two Pointers

### [11. Container With Most Water](https://leetcode-cn.com/problems/container-with-most-water/)

```go
func maxArea(height []int) int {
    left, right := 0, len(height)-1
    max := 0
    for left < right {
        capacity, min := 0, 0
        if height[left] < height[right] {
            min = height[left]
            capacity = min * (right - left)
            left++
        } else {
            min = height[right]
            capacity = min * (right - left)
            right--
        }
        if capacity > max {
            max = capacity
        }
    }
    return max
}
```

### [80. Remove Duplicates from Sorted Array II](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array-ii/)

双指针，一个指针不断前进，另一个指针停留在重复的第三个数上，用前者替换后者内容。

```go
func removeDuplicates(nums []int) int {
    p := 0
    for i := range nums {
        if p < 2 || nums[i] != nums[p-2] {
            nums[p] = nums[i]
            p++
        }
    }
    return p
}
```

### [82. Remove Duplicates from Sorted List II](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list-ii/)

虚结点`dummy`指向链表头，使用`slow`、`fast`双指针来标记非重复结点和每一个结点。当遇到

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
func deleteDuplicates(head *ListNode) *ListNode {
    dummy := &ListNode{Next: head}

    slow, fast := dummy, head

    for slow.Next != nil {
        for fast = slow.Next; fast.Next != nil && fast.Next.Val == slow.Next.Val; {
            fast = fast.Next
        }
        if slow.Next != fast {
            slow.Next = fast.Next
        } else {
            slow = slow.Next
        }
    }
    return dummy.Next
}
```

### [86. Partition List](https://leetcode-cn.com/problems/partition-list/)

用两个结点分别生成两个链表，一个记录小于`x`的结点，另一个记录大于等于`x`的结点，最后拼接返回。

```go
/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */
func partition(head *ListNode, x int) *ListNode {
    dummyMin := new(ListNode)
    dummyMax := new(ListNode)

    tmp1 := dummyMin
    tmp2 := dummyMax

    for head != nil {
        if head.Val < x {
            tmp1.Next = head
            head = head.Next
            tmp1 = tmp1.Next
            tmp1.Next = nil
        } else {
            tmp2.Next = head
            head = head.Next
            tmp2 = tmp2.Next
            tmp2.Next = nil
        }
    }
    tmp1.Next = dummyMax.Next
    return dummyMin.Next
}
```

## BackTracking

### 17. [Letter Combinations of a Phone Number](https://leetcode.com/problems/letter-combinations-of-a-phone-number/description/)

#### Ideas

- DFS 标准解法

#### Solutions

- DFS

  ```go
  var chars = [][]byte{
  	{'a', 'b', 'c'}, 	  // 2
      {'d', 'e', 'f'}, 	  // 3
  	{'g', 'h', 'i'}, 	  // 4
  	{'j', 'k', 'l'}, 	  // 5
  	{'m', 'n', 'o'}, 	  // 6
  	{'p', 'q', 'r', 's'}, // 7
  	{'t', 'u', 'v'},	  // 8
  	{'w', 'x', 'y', 'z'}, // 9
  }
  
  var result []string
  
  func letterCombinations(digits string) []string {
      // 边界判断
  	if len(digits) == 0 {
  		return []string{}
  	}
      // 清空全局变量，防止下一示例直接使用了该变量
  	result = []string{}
  	dfs(digits, 0, "")
  	return result
  }
  
  func dfs(digits string, level int, str string) {
  	// 递归出口
  	if level == len(digits) {
  		result = append(result, str)
  		return
  	}
      // 将输入的单个digit转换为数字
  	digit, _ := strconv.Atoi(string(digits[level]))
  	// 在单个键位的字符中循环
  	for i := 0; i < len(chars[digit-2]); i++ {
          // 下一层递归
  		dfs(digits, level+1, str+string(chars[digit-2][i]))
  	}
  }
  
  ```

### 39. [Combination Sum](https://leetcode.com/problems/combination-sum/)

#### Ideas

- 回溯法

#### Solutions

- 回溯

  ```go
  func combinationSum(candidates []int, target int) [][]int {
      res := make([][]int, 0)
      tmp := make([]int, 0)
      backtracking(candidates, target, 0, &res, &tmp)
      return res
  }
  
  func backtracking(candidates []int, target, index int, res *[][]int, tmp *[]int) {
      if target <= 0 {
          if target == 0 {
          	dst := make([]int, len(*tmp))
  	        copy(dst, *tmp)
      	    *res = append(*res, dst)
          }
          return
      }
  
      for i := index; i < len(candidates); i++ {
          target -= candidates[i]
          *tmp = append(*tmp, candidates[i])
          backtracking(candidates, target, i, res, tmp)
          *tmp = (*tmp)[:len(*tmp)-1]
          target += candidates[i]
      }
  }
  ```

### 46. [Permutations](https://leetcode.com/problems/permutations/)

#### Ideas

- 典型回溯

#### Solutions

- 回溯

  ```go
  func permute(nums []int) [][]int {
      res := make([][]int, 0)
      tmp := make([]int, 0)
      visited := make([]bool, len(nums))
      backtracking(nums, &res, &tmp, &visited)
      return res
  }
  
  func backtracking(nums []int, res *[][]int, tmp *[]int, visited *[]bool) {
      if len(nums) == 0 {
          return
      }
      if len(*tmp) == len(nums) {
          dst := make([]int, len(*tmp))
          copy(dst, *tmp)
          *res = append(*res, dst)
          return
      }
      for i := 0; i < len(nums); i++ {
          if (*visited)[i] {
              continue
          }
          *tmp = append(*tmp, nums[i])
          (*visited)[i] = true
          backtracking(nums, res, tmp, visited)
          (*visited)[i] = false
          *tmp = (*tmp)[:len(*tmp)-1]
      }
  }
  ```

### 47. [Permutations II](https://leetcode.com/problems/permutations-ii/)

#### Ideas

- 回溯，相较于 46 题，需要跳过重复元素，因此首先要判断元素是否已经存在。

#### Solutions

- 回溯

  ```go
  func permuteUnique(nums []int) [][]int {
      sort.Ints(nums)
      res := make([][]int, 0)
      tmp := make([]int, 0)
      visited := make([]bool, len(nums))
      backtracking(nums, &res, &tmp, &visited)
      return res
  }
  
  func backtracking(nums []int, res *[][]int, tmp *[]int, visited *[]bool) {
      if len(nums) == 0 {
          return
      }
      if len(*tmp) == len(nums) {
          dst := make([]int, len(*tmp))
          copy(dst, *tmp)
          *res = append(*res, dst)
          return
      }
      for k, v := range nums {
          // 当左相邻元素和当前元素相等且未访问过时跳出
          if (*visited)[k] || k > 0 && !(*visited)[k-1] && v == nums[k-1] {
              continue
          }
          *tmp = append(*tmp, nums[k])
          (*visited)[k] = true
          backtracking(nums, res, tmp, visited)
          (*visited)[k] = false
          *tmp = (*tmp)[:len(*tmp)-1]
      }
  }
  ```

## Dynamic Programming

### 64. [Minimum Path Sum](https://leetcode.com/problems/minimum-path-sum/)

#### DP

简单的动态规划，从判断上、左元素大小，取小值加到当前位置，可以使用原数组存结果：

```
1	3	1	->	1	4	5
1   5   1	->	2	7	6
4	2	1   ->	6	8	7
```

```go
func minPathSum(grid [][]int) int {
    for i := 0; i < len(grid); i++ {
        for j := 0; j < len(grid[0]); j++ {
            if i == 0 && j > 0 {
                // 第一行
                grid[i][j] = grid[i][j-1] + grid[i][j]
            } else if  i > 0 && j == 0 {
                // 第一列
                grid[i][j] = grid[i-1][j] + grid[i][j]
            } else if i > 0 {
                grid[i][j] = min(grid[i-1][j], grid[i][j-1]) + grid[i][j]
            }
        }
    }
    return grid[len(grid)-1][len(grid[0])-1]
}

func min(a, b int) int {
    if a < b {
        return a
    }
    return b
}
```

### [121. Best Time to Buy and Sell Stock](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock/)

记录最小值以及当前值与最小值的差值，记录最大的那个差值。

```go
func maxProfit(prices []int) int {
    minNum := prices[0]
    maxNum := 0
    for i := 1; i < len(prices); i++ {
        if res := prices[i] - minNum; res > maxNum {
            // 记录最大的差值
            maxNum = res
        }
        if prices[i] < minNum {
            // 记录最小值
            minNum = prices[i]
        }
    }
    return maxNum
}
```

### 122. [Best Time to Buy and Sell Stock II](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/)

#### Ideas

- DP
- 贪心

#### Solutions

- DP

  ```go
  func maxProfit(prices []int) int {
      length := len(prices)
      // 滚动数组节省空间
      var dp [2][2]int
      dp[0][0] = 0			 // cash
      dp[0][1] = -prices[0] 	 // stock
      for i := 1; i < length; i++ {
          dp[1][0] = max(dp[0][0], dp[0][1]+prices[i])
          dp[1][1] = max(dp[0][1], dp[0][0]-prices[i])
          dp[0] = dp[1]
      }
      return dp[1][0]
  }

  func max(a, b int) int {
      if a > b {
          return a
      }
      return b
  }
  ```

- 贪心

### 338.[Counting Bits](https://leetcode.com/problems/counting-bits/)

- 动态规划，存在如下规律：

  - 对于奇数$i$，其含二进制 1 个数与$i/2$含二进制 1 个数相等
  - 对于偶数$i$，其含二进制 1 个数等于$i-1$含二进制 1 个数加一

  ```go
  func countBits(n int) []int {
      dp := make([]int, n+1)
      for i := 1; i <= n; i++ {
          if i%2 == 0 {
              dp[i] = dp[i/2]
          } else {
              dp[i] = dp[i-1] + 1
          }
      }
      return dp
  }
  ```

## Greedy

### [45. Jump Game II](https://leetcode.com/problems/jump-game-ii/)

#### Ideas

- 贪心策略，从后找最靠左的能找到自己的位置，从该位置重复上述操作，直到数组开头。

#### Solutions

- 贪心

  ```go
  func jump(nums []int) int {
      length := len(nums)
      if length == 1 {
          return 0
      }
      count := 0
      for i := length-1; i > 0; i-- {
          for j := 0; j < i; j++ {
              if nums[j] >= i-j {
                  i = j+1
                  break
              }
          }
          count++
      }
      return count
  }
  ```

- ?

  ```go
  func jump(nums []int) int {
  	curJump, farthestJump, jumps := 0, 0, 0
  	for i := 0; i < len(nums)-1; i++ {
  	    // push index of furthest jump during current iteration
  		if i+nums[i] > farthestJump {
  			farthestJump = i + nums[i]
  		}
  
  		// if current iteration is ended - setup the next one
  		if i == curJump {
  			jumps, curJump = jumps+1, farthestJump
  
  			if curJump >= len(nums)-1 {
  				return jumps
  			}
  		}
  	}
  
  	// it's guaranteed to never hit it
  	return 0
  }
  ```

### 55. [Jump Game](https://leetcode.com/problems/jump-game/)

#### Ideas

#### Solutions

- ?

  ```go
  func canJump(nums []int) bool {
      if len(nums) == 1 {
          return true
      }
      cur, further, jumps := 0, 0, 0
      for i := 0; i < len(nums)-1; i++ {
          if i+nums[i] > further {
              further = i+nums[i]
          }
          if i == cur {
              jumps++
              cur = further
              if cur >= len(nums)-1 {
                  return true
              }
          }
      }
      return false
  }
  ```

### [135. Candy](https://leetcode-cn.com/problems/candy/)

贪心策略：先从左往右扫一遍，将右边大于左边的加一；再从右往左扫一遍，将左边大于右边的加一。注意第二次扫可能已经分配的足够多了，可以和原始值对比再考虑是否加一。

```go
func candy(ratings []int) int {
    nums := make([]int, len(ratings))

    nums[0] = 1	// 填充初始的 1

    // 左 -> 右
    for i := 1; i < len(ratings); i++ {
        nums[i] = 1	// 填充初始的 1
        if ratings[i] > ratings[i-1] {
            nums[i] = nums[i-1] + 1
        }
    }

    // 右 -> 左
    for i := len(ratings)-1; i > 0; i-- {
        if ratings[i] < ratings[i-1] {
            nums[i-1] = max(nums[i-1], nums[i] + 1)
        }
    }

    // 数组求和
    for i := 1; i < len(nums); i++ {
        nums[0] += nums[i]
    }
    return nums[0]
}

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}
```

### 781. [Rabbits in Forest](https://leetcode-cn.com/problems/rabbits-in-forest/)

#### 数组

相同数字每`num + 1`个代表`num + 1`个兔子，可以使用 Map 来记录每一种数字出现的次数，当次数为 0，兔子的统计数量加上`num + 1`，非 0 时，则将其减一，不统计。

由题设，`answers[i] < 1000`，因此可以使用一个长度为 1000 的数组来代替 Map。

```go
func numRabbits(answers []int) int {
    arr := make([]int, 1000)
    count := 0
    for _, v := range answers {
        if arr[v] == 0 {
            arr[v] = v
            count += v + 1
        } else {
            arr[v]--
        }
    }
    return count
}
```

#### 贪心

先统计所有数字出现的次数，通过公式计算出结果。

如 1 出现了 3 次，则表示有$(x+y)/(y+1)*(y+1)$，$y = 1$，$x = 3$，即 3 个兔子。

```go
func numRabbits(answers []int) (ans int) {
    count := map[int]int{}
    for _, y := range answers {
        count[y]++
    }
    for y, x := range count {
        ans += (x + y) / (y + 1) * (y + 1)
    }
    return
}
```

## Bit Manipulation

### [136. Single Number](https://leetcode-cn.com/problems/single-number/)

简单异或运算，相同的值都会变为 0。

```go
func singleNumber(nums []int) int {
    res := 0
    for i := range nums {
        res ^= nums[i]
    }
    return res
}
```

