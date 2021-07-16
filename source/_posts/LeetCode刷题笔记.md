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

## String

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

## Linked List

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

## HashTable

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
> - `2 <= nums.length <= 104`
> - `-109 <= nums[i] <= 109`
> - `-109 <= target <= 109`
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
> - `1 <= s.length, t.length <= 5 * 104`
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

### 215. [Kth Largest Element in an Array](https://leetcode.com/problems/kth-largest-element-in-an-array/description/)

> Given an integer array `nums` and an integer `k`, return _the_ `kth` _largest element in the array_.
>
> Note that it is the `kth` largest element in the sorted order, not the `kth` distinct element.
>
> **Example 1:**
>
> ```
> Input: nums = [3,2,1,5,6,4], k = 2
> Output: 5
> ```
>
> **Example 2:**
>
> ```
> Input: nums = [3,2,3,1,2,4,5,5,6], k = 4
> Output: 4
> ```
>
> **Constraints:**
>
> - `1 <= k <= nums.length <= 104`
> - `-104 <= nums[i] <= 104`

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
> - `-231 <= x <= 231 - 1`

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
> - `-231 <= x <= 231 - 1`
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
