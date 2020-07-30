## 有帮助的资源

[underscore 系列之如何写自己的 underscore](https://github.com/mqyqingfeng/Blog/issues/56#%E5%87%BD%E6%95%B0%E5%AF%B9%E8%B1%A1)

[源码解析](https://yoyoyohamapi.gitbooks.io/undersercore-analysis/content/base/)



## 关于运算符

```js
// Establish the root object, `window` (`self`) in the browser, `global`
// on the server, or `this` in some virtual machines. We use `self`
// instead of `window` for `WebWorker` support.
var root = typeof self == 'object' && self.self === self && self ||
  typeof global == 'object' && global.global === global && global ||
  this ||
  {};
```

具体写起来太麻烦了，看mdn吧，说几个要点

1. &&的Operator precedence higher than ||
2. 理解&& 和 || 的执行和返回逻辑

