---
layout: page
body: [article, grid, comments]
meta:
  header: false
  footer: false
valine:
  placeholder: 大佬轻喷~
music:
  server: netease
  type: song
  id: 1304960504
sidebar: false
---

{% p center logo large, 关于我，和我的博客 %}

{% noteblock %}
一个会写代码的后端菜鸡，安全专业，爱好广泛，精通摸鱼。
{% endnoteblock %}

{% checkbox red checked, 爱好：看书（辅助睡眠）、搬砖、不务正业…… %}

{% checkbox yellow checked, 编程：主要使用 Golang，业余 C 和 Python。 %}

{% checkbox green checked, 音乐：喜欢听我喜欢听的我喜欢的曲子。 %}

{% checkbox cyan checked, 美术：一窍不通。 %}

{% checkbox blue checked, 文学：故事会。 %}

{% note success, 希望明天能过得更好。  %}

{% btns circle center grid5 %}
<a href=''>
<b>支付宝</b>
{% p blue, 求打赏不是要饭 %}
<img src='https://upyun.secriy.com/statics/img/alipay.png'>
</a>
<a href=''>
<b>微信</b>
{% p green, 求打赏不是要饭 %}
<img src='https://upyun.secriy.com/statics/img/wechat.jpg'>
</a>
{% endbtns %}
