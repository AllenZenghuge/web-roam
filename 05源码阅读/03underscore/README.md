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

