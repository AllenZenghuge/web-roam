# jQuery理解与相关基础

## Immediately Invoked Function Expression(IIFE)

[简单介绍](https://medium.com/javascript-in-plain-english/https-medium-com-javascript-in-plain-english-stop-feeling-iffy-about-using-an-iife-7b0292aba174)

[MDN](https://developer.mozilla.org/en-US/docs/Glossary/IIFE)

[JQ解析1](https://www.cnblogs.com/vajoy/p/3623103.html)

两种写法

```js
// 源码中所用的写法
function(x){
    alert(2* x); 
})(3);
 

(function(x){
    alert(2* x); 
}(3));
```



jQuery就是通过这种方式进入就invoke的，还不污染全局变量，也保证内部代码不被外界随意修改



```js
(function (global, factory) {
  // 兼容nodejs
  ...
  // 为什么要传入window而不让函数自己向上一层找？因为寻找少了一步，会快一点
  factory(global)
})(
	typeof window !== "undefined" ? window : this,
  function(window,noGlobal){
    // 具体实现
  }
);
```





## Prototype相关

[轻松理解JS中的面向对象，顺便搞懂prototype和__proto__](https://juejin.im/post/5e50e5b16fb9a07c9a1959af)



实现无new构造

```js
// 没有new，仅仅是调用jQuery的构造函数，就可以返回一个实例
$('div') !== $('div') // true
```



if

```js
function jQuery() {
  return new jQuery();
}
```

这样就死循环了,所以我们想要实现这个效果，需要new 别的函数 返回产生的实例



源码中的设计

```js
 var
	version = "3.4.1",

	jQuery = function( selector, context ) {
		// 返回new之后的对象
		return new jQuery.fn.init( selector, context );
	};
// 注意这里，fn是指向jQuery.prototype的另一个指针
jQuery.fn = jQuery.prototype = {
	// jQuery当前版本
	jquery: version,
	// 修正构造器为jQuery
	constructor: jQuery,
	length: 0,
};
init = jQuery.fn.init = function( selector, context, root ) {
	// ...
	if ( !selector ) {
		return this;
	}
	// ...
};
// 把init的prototype也指向jQuery.prototype
init.prototype = jQuery.fn;
```

![image-20200720233121795](http://picbed.sedationh.cn/image-20200720233121795.png)