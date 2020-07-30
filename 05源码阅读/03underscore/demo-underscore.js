/**
 * 参考源码和相关博客，自己实现underscore
 */

(function () {

  /**
   * 考虑不同环境下全局的不同设定root
   */
  var root =
    typeof self === 'object' && self.self === self && self || /**浏览器  */
    typeof global === 'object' && global.global === global ||
    this ||
    {};

  var ArrayProto = Array.prototype, ObjProto = Object.prototype;
  var push = ArrayProto.push;

  /**
   * study
   *  _是一个函数
   *  _函数上直接挂载一些方法提供函数式风格
   *    _.each([1,2,3],e => console.log(e))
   *  也通过new _()创建实例，实例的prototype指向_函数的prototype
   *  来得到一致的方法，实现OOP式风格,_mixin用于实现将_函数上的
   *  实例方法拷贝到_.prototype
   *    _([1,2,3]).each(e => console.log(e))
   */
  // Create a safe reference to the Underscore object for use below.
  var _ = function (obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  }

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for their old module API. If we're in
  // the browser, add `_` as a global object.
  // (`nodeType` is checked to ensure that `module`
  // and `exports` are not HTML elements.)
  if (typeof exports != 'undefined' && !exports.nodeType) {
    if (typeof module != 'undefined' && !module.nodeType && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  _.VERSION = '1.0'

  // IEEE 754双精度最大值
  // 没看懂0是怎么表示出来的
  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
  var isArrayLike = function (collection) {
    var length = collection.length;
    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
  };

  /**
   * 暂时不实现context的绑定
   */
  _.each = function (obj, iteratee, context) {
    var i, length

    if (isArrayLike(obj)) {
      for (i = 0, length = obj.length; i < length; i++) {
        iteratee(obj[i], i, obj)
      }
    } else {
      // own Enumerable item
      var keys = Object.keys(obj)
      for (i = 0, length = keys.length; i < length; i++) {
        iteratee(keys[i], i, obj)
      }
    }
    return obj
  }

  _.isFunction = function (obj) {
    return typeof obj == 'function' || false;
  };

  _.functions = function (obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  _.chain = function (obj) {
    var instance = _(obj)
    instance._chain = true
    return instance
  }

  // 开始的chain化 后面都跟着chain化
  var chainResult = function (instance, obj) {
    return instance._chain ? _(obj).chain() : obj
  }

  /**
   * mixin用于向_同时添加静态和实例方法
   * 这里实例调用和_调用还是debug吧 看的明白些
   */
  _.mixin = function (obj) {
    _.each(_.functions(obj), function (name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function () {
        var args = [this._wrapped];
        // push.apply(args, arguments);
        args.push(...arguments)
        // 注意apply就在执行穿入的函数了
        return chainResult(this, func.apply(_, args));
      }
    })
    return _;
  }
  _.mixin(_)
}())