---
title: 'Go Standard Library: OS'
date: 2021-06-24 18:26:34
categories: 学习笔记
tags: 
  - Go
---

## Overview

os 包为操作系统功能提供了一个独立于平台的接口。也就是说，例如Windows、Linux等操作系统各自提供的特定接口，os 包是不提供支持的，它们通常由 syscall 包提供。

## File



-   func Open(name string) (*File, error)

