---
title: LeetCode刷题笔记
date: 2021-07-15 14:29:11
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

### 15. [3Sum](https://leetcode.com/problems/3sum/description/)

> Given an integer array nums, return all the triplets `[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, and `j != k`, and `nums[i] + nums[j] + nums[k] == 0`.
>
> Notice that the solution set must not contain duplicate triplets.
>
> **Example 1:**
>
> ```
> Input: nums = [-1,0,1,2,-1,-4]
> Output: [[-1,-1,2],[-1,0,1]]
> ```
>
> **Example 2:**
>
> ```
> Input: nums = []
> Output: []
> ```
>
> **Example 3:**
>
> ```
> Input: nums = [0]
> Output: []
> ```
>
> **Constraints:**
>
> - `0 <= nums.length <= 3000`
> - `-10^5 <= nums[i] <= 10^5`

#### Ideas

- 排序+双指针解法。

#### Solutions

- Common

  ```go
  func threeSum(nums []int) [][]int {
  	length := len(nums)
  	res := make([][]int, 0)
  	if length < 3 {
  		return res
  	}
  	sort.Ints(nums)
  	for k, v := range nums {
  		if v > 0 {
  			return res
  		}
  		if k > 0 && v == nums[k-1] {
  			continue
  		}
  		left, right := k+1, length-1
  		for left < right {
  			sum := v + nums[left] + nums[right]
  			if sum == 0 {
  				res = append(res, []int{v, nums[left], nums[right]})
  				for left < right && nums[left] == nums[left+1] {
  					left++
  				}
  				for left < right && nums[right] == nums[right-1] {
  					right--
  				}
  				left++
  				right--
  			} else if sum > 0 {
  				right--
  			} else {
  				left++
  			}
  		}

  	}
  	return res
  }
  ```

### 66. [Plus One](https://leetcode.com/problems/plus-one/description/)

> Given a **non-empty** array of decimal digits representing a non-negative integer, increment one to the integer.
>
> The digits are stored such that the most significant digit is at the head of the list, and each element in the array contains a single digit.
>
> You may assume the integer does not contain any leading zero, except the number 0 itself.
>
> **Example 1:**
>
> ```
> Input: digits = [1,2,3]
> Output: [1,2,4]
> Explanation: The array represents the integer 123.
> ```
>
> **Example 2:**
>
> ```
> Input: digits = [4,3,2,1]
> Output: [4,3,2,2]
> Explanation: The array represents the integer 4321.
> ```
>
> **Example 3:**
>
> ```
> Input: digits = [0]
> Output: [1]
> ```
>
> **Constraints:**
>
> - `1 <= digits.length <= 100`
> - `0 <= digits[i] <= 9`

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

> You are given two integer arrays `nums1` and `nums2`, sorted in **non-decreasing order**, and two integers `m` and `n`, representing the number of elements in `nums1` and `nums2` respectively.
>
> **Merge** `nums1` and `nums2` into a single array sorted in **non-decreasing order**.
>
> The final sorted array should not be returned by the function, but instead be _stored inside the array_ `nums1`. To accommodate this, `nums1` has a length of `m + n`, where the first `m` elements denote the elements that should be merged, and the last `n` elements are set to `0` and should be ignored. `nums2` has a length of `n`.
>
> **Example 1:**
>
> ```
> Input: nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
> Output: [1,2,2,3,5,6]
> Explanation: The arrays we are merging are [1,2,3] and [2,5,6].
> The result of the merge is [1,2,2,3,5,6] with the underlined elements coming from nums1.
> ```
>
> **Example 2:**
>
> ```
> Input: nums1 = [1], m = 1, nums2 = [], n = 0
> Output: [1]
> Explanation: The arrays we are merging are [1] and [].
> The result of the merge is [1].
> ```
>
> **Example 3:**
>
> ```
> Input: nums1 = [0], m = 0, nums2 = [1], n = 1
> Output: [1]
> Explanation: The arrays we are merging are [] and [1].
> The result of the merge is [1].
> Note that because m = 0, there are no elements in nums1. The 0 is only there to ensure the merge result can fit in nums1.
> ```
>
> **Constraints:**
>
> - `nums1.length == m + n`
> - `nums2.length == n`
> - `0 <= m, n <= 200`
> - `1 <= m + n <= 200`
> - `-10^9 <= nums1[i], nums2[j] <= 10^9`
>
> **Follow up:** Can you come up with an algorithm that runs in `O(m + n)` time?

#### Ideas

- 设置三个指针，分别位于`nums1`（不含 0）末尾、`nums1`（含 0）末尾、`nums2`末尾，从后向前对比两个数组的末尾元素，取大者放入 0 元素位置。
  - 时间复杂度：$O(m+n)$
  - 空间复杂度：$O(1)$

#### Solutions

- Three Pointers

  ```go
  func merge(nums1 []int, m int, nums2 []int, n int) {
  	index1, empty, index2 := m-1, m+n-1, n-1
  	for empty >= 0 {
  		if index2 < 0 || (index1 >= 0 && nums1[index1] >= nums2[index2]) {
  			nums1[empty] = nums1[index1]
  			index1--
  		} else {
  			nums1[empty] = nums2[index2]
  			index2--
  		}
  		empty--
  	}
  }
  ```

## String

### 3. [Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/description/)

> Given a string `s`, find the length of the **longest substring** without repeating characters.
>
> **Example 1:**
>
> ```
> Input: s = "abcabcbb"
> Output: 3
> Explanation: The answer is "abc", with the length of 3.
> ```
>
> **Example 2:**
>
> ```
> Input: s = "bbbbb"
> Output: 1
> Explanation: The answer is "b", with the length of 1.
> ```
>
> **Example 3:**
>
> ```
> Input: s = "pwwkew"
> Output: 3
> Explanation: The answer is "wke", with the length of 3.
> Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.
> ```
>
> **Example 4:**
>
> ```
> Input: s = ""
> Output: 0
> ```
>
> **Constraints:**
>
> - `0 <= s.length <= 5 * 10^4`
> - `s` consists of English letters, digits, symbols and spaces.

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

### 14. [Longest Common Prefix](https://leetcode.com/problems/longest-common-prefix/description/)

> Write a function to find the longest common prefix string amongst an array of strings.
>
> If there is no common prefix, return an empty string `""`.
>
> **Example 1:**
>
> ```
> Input: strs = ["flower","flow","flight"]
> Output: "fl"
> ```
>
> **Example 2:**
>
> ```
> Input: strs = ["dog","racecar","car"]
> Output: ""
> Explanation: There is no common prefix among the input strings.
> ```
>
> **Constraints:**
>
> - `1 <= strs.length <= 200`
> - `0 <= strs[i].length <= 200`
> - `strs[i]` consists of only lower-case English letters.

#### Ideas

#### Solutions

### 20. [Valid Parentheses](https://leetcode.com/problems/valid-parentheses/description/)

> Given a string `s` containing just the characters `'('`, `')'`, `'{'`, `'}'`, `'['` and `']'`, determine if the input string is valid.
>
> An input string is valid if:
>
> 1. Open brackets must be closed by the same type of brackets.
> 2. Open brackets must be closed in the correct order.
>
> **Example 1:**
>
> ```
> Input: s = "()"
> Output: true
> ```
>
> **Example 2:**
>
> ```
> Input: s = "()[]{}"
> Output: true
> ```
>
> **Example 3:**
>
> ```
> Input: s = "(]"
> Output: false
> ```
>
> **Example 4:**
>
> ```
> Input: s = "([)]"
> Output: false
> ```
>
> **Example 5:**
>
> ```
> Input: s = "{[]}"
> Output: true
> ```
>
> **Constraints:**
>
> - `1 <= s.length <= 10^4`
> - `s` consists of parentheses only `'()[]{}'`.

#### Ideas

- 循环将字符串里的`'{}()[]'`替换为空字符串，最终得到空字符串即为匹配。该解法实际效率较低。
- 对于括号匹配问题常见的解法是使用栈匹配。

#### Solutions

- Replace

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

- Stack

  ```go
  func isValid(s string) bool {
      stack := make([]byte, 0)
  	length := 0
  	for _, v := range []byte(s) {
  		stack = append(stack, v)
  		length++
  		for length > 1 {
  			left := stack[length-2]		// 仅用于增强代码可读性，可省略
  			right := stack[length-1]
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

## Linked List

### 21. [Merge Two Sorted Lists](https://leetcode.com/problems/merge-two-sorted-lists/description/)

> Merge two sorted linked lists and return it as a **sorted** list. The list should be made by splicing together the nodes of the first two lists.
>
> **Example 1:**
>
> ![img](LeetCode%E5%88%B7%E9%A2%98%E7%AC%94%E8%AE%B0/merge_ex1.jpg)
>
> ```
> Input: l1 = [1,2,4], l2 = [1,3,4]
> Output: [1,1,2,3,4,4]
> ```
>
> **Example 2:**
>
> ```
> Input: l1 = [], l2 = []
> Output: []
> ```
>
> **Example 3:**
>
> ```
> Input: l1 = [], l2 = [0]
> Output: [0]
> ```
>
> **Constraints:**
>
> - The number of nodes in both lists is in the range `[0, 50]`.
> - `-100 <= Node.val <= 100`
> - Both `l1` and `l2` are sorted in **non-decreasing** order.

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

### 141. [Linked List Cycle](https://leetcode.com/problems/linked-list-cycle/description/)

> Given `head`, the head of a linked list, determine if the linked list has a cycle in it.
>
> There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the `next` pointer. Internally, `pos` is used to denote the index of the node that tail's `next` pointer is connected to. **Note that `pos` is not passed as a parameter**.
>
> Return `true` _if there is a cycle in the linked list_. Otherwise, return `false`.
>
> **Example 1:**
>
> ![img](LeetCode%E5%88%B7%E9%A2%98%E7%AC%94%E8%AE%B0/circularlinkedlist.png)
>
> ```
> Input: head = [3,2,0,-4], pos = 1
> Output: true
> Explanation: There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed).
> ```
>
> **Example 2:**
>
> ![img](LeetCode%E5%88%B7%E9%A2%98%E7%AC%94%E8%AE%B0/circularlinkedlist_test2.png)
>
> ```
> Input: head = [1,2], pos = 0
> Output: true
> Explanation: There is a cycle in the linked list, where the tail connects to the 0th node.
> ```
>
> **Example 3:**
>
> ![img](LeetCode%E5%88%B7%E9%A2%98%E7%AC%94%E8%AE%B0/circularlinkedlist_test3.png)
>
> ```
> Input: head = [1], pos = -1
> Output: false
> Explanation: There is no cycle in the linked list.
> ```
>
> **Constraints:**
>
> - The number of the nodes in the list is in the range `[0, 10^4]`.
> - `-10^5 <= Node.val <= 10^5`
> - `pos` is `-1` or a **valid index** in the linked-list.
>
> **Follow up:** Can you solve it using `O(1)` (i.e. constant) memory?

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
  	for {
          // 边界条件
  		if slow == nil || fast == nil || fast.Next == nil {
  			return false
  		}
  		slow = slow.Next
  		fast = fast.Next.Next
  		if slow == fast {
  			return true
  		}
  	}
  }
  ```

### 142. [Linked List Cycle II](https://leetcode.com/problems/linked-list-cycle-ii/description/)

> Given a linked list, return the node where the cycle begins. If there is no cycle, return `null`.
>
> There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the `next` pointer. Internally, `pos` is used to denote the index of the node that tail's `next` pointer is connected to. **Note that `pos` is not passed as a parameter**.
>
> **Notice** that you **should not modify** the linked list.
>
> **Example 1:**
>
> ![img](LeetCode%E5%88%B7%E9%A2%98%E7%AC%94%E8%AE%B0/circularlinkedlist.png)
>
> ```
> Input: head = [3,2,0,-4], pos = 1
> Output: tail connects to node index 1
> Explanation: There is a cycle in the linked list, where tail connects to the second node.
> ```
>
> **Example 2:**
>
> ![img](LeetCode%E5%88%B7%E9%A2%98%E7%AC%94%E8%AE%B0/circularlinkedlist_test2.png)
>
> ```
> Input: head = [1,2], pos = 0
> Output: tail connects to node index 0
> Explanation: There is a cycle in the linked list, where tail connects to the first node.
> ```
>
> **Example 3:**
>
> ![img](LeetCode%E5%88%B7%E9%A2%98%E7%AC%94%E8%AE%B0/circularlinkedlist_test3.png)
>
> ```
> Input: head = [1], pos = -1
> Output: no cycle
> Explanation: There is no cycle in the linked list.
> ```
>
> **Constraints:**
>
> - The number of the nodes in the list is in the range `[0, 10^4]`.
> - `-10^5 <= Node.val <= 10^5`
> - `pos` is `-1` or a **valid index** in the linked-list.
>
> **Follow up:** Can you solve it using `O(1)` (i.e. constant) memory?

#### Ideas

- Map 解法同 141 题，记录指针即可。

- 快慢指针解法，当二者第一次相遇时将其中一个指针返回到链开头，二者以同样的速度往下遍历，直到二者相等即返回。

#### Solutions

- 略

- Slow-Fast Pointer

  ```go
  func detectCycle(head *ListNode) *ListNode {
  	slow, fast := head, head
  	for {
  		if slow == nil || fast == nil || fast.Next == nil {
  			return nil
  		}
  		slow = slow.Next
  		fast = fast.Next.Next
  		if slow == fast {
  			break
  		}
  	}
  	fast = head
  	for slow != fast {
  		fast = fast.Next
  		slow = slow.Next
  	}
  	return slow
  }
  ```

### 160. [Intersection of Two Linked Lists](https://leetcode.com/problems/intersection-of-two-linked-lists/description/)

> Given the heads of two singly linked-lists `headA` and `headB`, return _the node at which the two lists intersect_. If the two linked lists have no intersection at all, return `null`.
>
> For example, the following two linked lists begin to intersect at node `c1`:
>
> ![img](LeetCode%E5%88%B7%E9%A2%98%E7%AC%94%E8%AE%B0/160_statement.png)
>
> It is **guaranteed** that there are no cycles anywhere in the entire linked structure.
>
> **Note** that the linked lists must **retain their original structure** after the function returns.
>
> **Example 1:**
>
> ![img](LeetCode%E5%88%B7%E9%A2%98%E7%AC%94%E8%AE%B0/160_example_1_1.png)
>
> ```
> Input: intersectVal = 8, listA = [4,1,8,4,5], listB = [5,6,1,8,4,5], skipA = 2, skipB = 3
> Output: Intersected at '8'
> Explanation: The intersected node's value is 8 (note that this must not be 0 if the two lists intersect).
> From the head of A, it reads as [4,1,8,4,5]. From the head of B, it reads as [5,6,1,8,4,5]. There are 2 nodes before the intersected node in A; There are 3 nodes before the intersected node in B.
> ```
>
> **Example 2:**
>
> ![img](LeetCode%E5%88%B7%E9%A2%98%E7%AC%94%E8%AE%B0/160_example_2.png)
>
> ```
> Input: intersectVal = 2, listA = [1,9,1,2,4], listB = [3,2,4], skipA = 3, skipB = 1
> Output: Intersected at '2'
> Explanation: The intersected node's value is 2 (note that this must not be 0 if the two lists intersect).
> From the head of A, it reads as [1,9,1,2,4]. From the head of B, it reads as [3,2,4]. There are 3 nodes before the intersected node in A; There are 1 node before the intersected node in B.
> ```
>
> **Example 3:**
>
> ![img](LeetCode%E5%88%B7%E9%A2%98%E7%AC%94%E8%AE%B0/160_example_3.png)
>
> ```
> Input: intersectVal = 0, listA = [2,6,4], listB = [1,5], skipA = 3, skipB = 2
> Output: No intersection
> Explanation: From the head of A, it reads as [2,6,4]. From the head of B, it reads as [1,5]. Since the two lists do not intersect, intersectVal must be 0, while skipA and skipB can be arbitrary values.
> Explanation: The two lists do not intersect, so return null.
> ```
>
> **Constraints:**
>
> - The number of nodes of `listA` is in the `m`.
> - The number of nodes of `listB` is in the `n`.
> - `0 <= m, n <= 3 * 10^4`
> - `1 <= Node.val <= 10^5`
> - `0 <= skipA <= m`
> - `0 <= skipB <= n`
> - `intersectVal` is `0` if `listA` and `listB` do not intersect.
> - `intersectVal == listA[skipA + 1] == listB[skipB + 1]` if `listA` and `listB` intersect.
>
> **Follow up:** Could you write a solution that runs in `O(n)` time and use only `O(1)` memory?

#### Ideas

- 使用 Map 保存一个链表的所有节点，遍历第二个链表，如果在 Map 中已存在则返回。
- 两个链表的长度不同，让二者相遇的办法是让它们的长度变为一致，具体实现是让它们在到达链表末尾后跳转到对方的链首。

#### Solutions

- Map

  ```go
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

- Link

  ```go
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

> Given the `head` of a singly linked list, reverse the list, and return _the reversed list_.
>
> **Example 1:**
>
> ![img](LeetCode%E5%88%B7%E9%A2%98%E7%AC%94%E8%AE%B0/rev1ex1.jpg)
>
> ```
> Input: head = [1,2,3,4,5]
> Output: [5,4,3,2,1]
> ```
>
> **Example 2:**
>
> ![img](LeetCode%E5%88%B7%E9%A2%98%E7%AC%94%E8%AE%B0/rev1ex2.jpg)
>
> ```
> Input: head = [1,2]
> Output: [2,1]
> ```
>
> **Example 3:**
>
> ```
> Input: head = []
> Output: []
> ```
>
> **Constraints:**
>
> - The number of nodes in the list is the range `[0, 5000]`.
> - `-5000 <= Node.val <= 5000`
>
> **Follow up:** A linked list can be reversed either iteratively or recursively. Could you implement both?

#### Ideas

1. 遍历链表并重新创建一个链表，比较简单粗暴。
2. 记录前一个结点，并将当前节点指向前一结点。

#### Solutions

1. 略

2. 反转

   ```go
   func reverseList(head *ListNode) *ListNode {
   	var pre *ListNode = nil

   	for {
   		next := head.Next 	// 存储下一结点
   		head.Next = pre   	// 改变指针
   		if next == nil {	// 改变指针过后判断下一结点是否为空，为空则退出
   			return head
   		}
   		pre = head			// 存储当前结点
   		head = next			// 跳转到下一个结点
   	}
   	return nil
   }
   ```

## Binary Tree

### 101. [Symmetric Tree](https://leetcode.com/problems/symmetric-tree/description/)

> Given the `root` of a binary tree, _check whether it is a mirror of itself_ (i.e., symmetric around its center).
>
> **Example 1:**
>
> ![img](LeetCode%E5%88%B7%E9%A2%98%E7%AC%94%E8%AE%B0/symtree1.jpg)
>
> ```
> Input: root = [1,2,2,3,4,4,3]
> Output: true
> ```
>
> **Example 2:**
>
> ![img](LeetCode%E5%88%B7%E9%A2%98%E7%AC%94%E8%AE%B0/symtree2.jpg)
>
> ```
> Input: root = [1,2,2,null,3,null,3]
> Output: false
> ```
>
> **Constraints:**
>
> - The number of nodes in the tree is in the range `[1, 1000]`.
> - `-100 <= Node.val <= 100`
>
> **Follow up:** Could you solve it both recursively and iteratively?

#### Ideas

- 常规递归解法。

#### Solutions

- Recursion

  ```go
  func isSymmetric(root *TreeNode) bool {
  	return recursion(root.Left, root.Right)
  }

  func recursion(p, q *TreeNode) bool {
  	if p == nil && q == nil {
  		return true
  	}
  	if p == nil || q == nil {
  		return false
  	}
  	if p.Val == q.Val {
  		return recursion(p.Left, q.Right) && recursion(p.Right, q.Left)
  	}
  	return false
  }
  ```

## Hash Table

### 1. [Two Sum](https://leetcode.com/problems/two-sum/description/)

> Given an array of integers `nums` and an integer `target`, return _indices of the two numbers such that they add up to `target`_.
>
> You may assume that each input would have **\*exactly\* one solution**, and you may not use the _same_ element twice.
>
> You can return the answer in any order.
>
> **Example 1:**
>
> ```
> Input: nums = [2,7,11,15], target = 9
> Output: [0,1]
> Output: Because nums[0] + nums[1] == 9, we return [0, 1].
> ```
>
> **Example 2:**
>
> ```
> Input: nums = [3,2,4], target = 6
> Output: [1,2]
> ```
>
> **Example 3:**
>
> ```
> Input: nums = [3,3], target = 6
> Output: [0,1]
> ```
>
> **Constraints:**
>
> - `2 <= nums.length <= 10^4`
> - `-10^9 <= nums[i] <= 10^9`
> - `-10^9 <= target <= 10^9`
> - **Only one valid answer exists.**
>
> **Follow-up:** Can you come up with an algorithm that is less than `O(n2) `time complexity?

#### Ideas

- 最容易想到的方式是使用 Map 存储遍历到的数字，并判断目标数字减去当前数字的结果是否在 Map 中，如过是直接返回。

#### Solutions

- Map

  ```go
  func twoSum(nums []int, target int) []int {
  	m := make(map[int]int)
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

> Given two strings `s` and `t`, return `true` _if_ `t` _is an anagram of_ `s`_, and_ `false` _otherwise_.
>
> **Example 1:**
>
> ```
> Input: s = "anagram", t = "nagaram"
> Output: true
> ```
>
> **Example 2:**
>
> ```
> Input: s = "rat", t = "car"
> Output: false
> ```
>
> **Constraints:**
>
> - `1 <= s.length, t.length <= 5 * 10^4`
> - `s` and `t` consist of lowercase English letters.
>
> **Follow up:** What if the inputs contain Unicode characters? How would you adapt your solution to such a case?

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

### 7. [Reverse Integer](https://leetcode.com/problems/reverse-integer/description/)

> Given a signed 32-bit integer `x`, return `x` _with its digits reversed_. If reversing `x` causes the value to go outside the signed 32-bit integer range `[-231, 231 - 1]`, then return `0`.
>
> **Assume the environment does not allow you to store 64-bit integers (signed or unsigned).**
>
> **Example 1:**
>
> ```
> Input: x = 123
> Output: 321
> ```
>
> **Example 2:**
>
> ```
> Input: x = -123
> Output: -321
> ```
>
> **Example 3:**
>
> ```
> Input: x = 120
> Output: 21
> ```
>
> **Example 4:**
>
> ```
> Input: x = 0
> Output: 0
> ```
>
> **Constraints:**
>
> - `-2^31 <= x <= 2^31 - 1`

#### Ideas

- 先提出符号，对数字进行循环对 10 取余来得到高一位数字，对地位数字循环乘 10 来进位。

#### Solutions

- Math

  ```go
  func reverse(x int) int {
  	result := 0
  	for x != 0 {
  		low := x % 10
  		x /= 10
  		result = result*10 + low
  	}
  	if bit := (result >> 31); bit != 0 && bit != -1 {
  		return 0
  	}
  	return result
  }
  ```

### 9. [Palindrome Number](https://leetcode.com/problems/palindrome-number/description/)

> Given an integer `x`, return `true` if `x` is palindrome integer.
>
> An integer is a **palindrome** when it reads the same backward as forward. For example, `121` is palindrome while `123` is not.
>
> **Example 1:**
>
> ```
> Input: x = 121
> Output: true
> ```
>
> **Example 2:**
>
> ```
> Input: x = -121
> Output: false
> Explanation: From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.
> ```
>
> **Example 3:**
>
> ```
> Input: x = 10
> Output: false
> Explanation: Reads 01 from right to left. Therefore it is not a palindrome.
> ```
>
> **Example 4:**
>
> ```
> Input: x = -101
> Output: false
> ```
>
> **Constraints:**
>
> - `-2^31 <= x <= 2^31 - 1`
>
> **Follow up:** Could you solve it without converting the integer to a string?

#### Ideas

- 把数字转换为字符串，用双指针各自从左右遍历字符串判断二者对应字符是否相同，直到两个指针重叠。
- 考虑不使用字符串的解法，参考第七题反转数字，可以将`x`的低位反转存入另一个变量中，并将`x`除以 10，最后判断二者是否相等。

#### Solutions

- String

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

- Math

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

### 13. [Roman to Integer](https://leetcode.com/problems/roman-to-integer/description/)

> Roman numerals are represented by seven different symbols: `I`, `V`, `X`, `L`, `C`, `D` and `M`.
>
> ```
> Symbol       Value
> I             1
> V             5
> X             10
> L             50
> C             100
> D             500
> M             1000
> ```
>
> For example, `2` is written as `II` in Roman numeral, just two one's added together. `12` is written as `XII`, which is simply `X + II`. The number `27` is written as `XXVII`, which is `XX + V + II`.
>
> Roman numerals are usually written largest to smallest from left to right. However, the numeral for four is not `IIII`. Instead, the number four is written as `IV`. Because the one is before the five we subtract it making four. The same principle applies to the number nine, which is written as `IX`. There are six instances where subtraction is used:
>
> - `I` can be placed before `V` (5) and `X` (10) to make 4 and 9.
> - `X` can be placed before `L` (50) and `C` (100) to make 40 and 90.
> - `C` can be placed before `D` (500) and `M` (1000) to make 400 and 900.
>
> Given a roman numeral, convert it to an integer.
>
> **Example 1:**
>
> ```
> Input: s = "III"
> Output: 3
> ```
>
> **Example 2:**
>
> ```
> Input: s = "IV"
> Output: 4
> ```
>
> **Example 3:**
>
> ```
> Input: s = "IX"
> Output: 9
> ```
>
> **Example 4:**
>
> ```
> Input: s = "LVIII"
> Output: 58
> Explanation: L = 50, V= 5, III = 3.
> ```
>
> **Example 5:**
>
> ```
> Input: s = "MCMXCIV"
> Output: 1994
> Explanation: M = 1000, CM = 900, XC = 90 and IV = 4.
> ```
>
> **Constraints:**
>
> - `1 <= s.length <= 15`
> - `s` contains only the characters `('I', 'V', 'X', 'L', 'C', 'D', 'M')`.
> - It is **guaranteed** that `s` is a valid roman numeral in the range `[1, 3999]`.

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

> Given a non-negative integer `x`, compute and return _the square root of_ `x`.
>
> Since the return type is an integer, the decimal digits are **truncated**, and only **the integer part** of the result is returned.
>
> **Note:** You are not allowed to use any built-in exponent function or operator, such as `pow(x, 0.5)` or `x ** 0.5`.
>
> **Example 1:**
>
> ```
> Input: x = 4
> Output: 2
> ```
>
> **Example 2:**
>
> ```
> Input: x = 8
> Output: 2
> Explanation: The square root of 8 is 2.82842..., and since the decimal part is truncated, 2 is returned.
> ```
>
> **Constraints:**
>
> - `0 <= x <= 2^31 - 1`

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

## Sorting

### 912. [Sort an Array](https://leetcode.com/problems/sort-an-array/description/)

> Given an array of integers `nums`, sort the array in ascending order.
>
> **Example 1:**
>
> ```
> Input: nums = [5,2,3,1]
> Output: [1,2,3,5]
> ```
>
> **Example 2:**
>
> ```
> Input: nums = [5,1,1,2,0,0]
> Output: [0,0,1,1,2,5]
> ```
>
> **Constraints:**
>
> - `1 <= nums.length <= 5 * 10^4`
> - `-5 * 104 <= nums[i] <= 5 * 10^4`

#### Ideas

- 使用快速排序。

#### Solutions

## BackTracking

### 17. [Letter Combinations of a Phone Number](https://leetcode.com/problems/letter-combinations-of-a-phone-number/description/)

> Given a string containing digits from `2-9` inclusive, return all possible letter combinations that the number could represent. Return the answer in **any order**.
>
> A mapping of digit to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.
>
> ![img](https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Telephone-keypad2.svg/200px-Telephone-keypad2.svg.png)
>
> **Example 1:**
>
> ```
> Input: digits = "23"
> Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]
> ```
>
> **Example 2:**
>
> ```
> Input: digits = ""
> Output: []
> ```
>
> **Example 3:**
>
> ```
> Input: digits = "2"
> Output: ["a","b","c"]
> ```
>
> **Constraints:**
>
> - `0 <= digits.length <= 4`
> - `digits[i]` is a digit in the range `['2', '9']`.

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

## Dynamic Programming
