Function.prototype.call = function (obj) {
  if (typeof this !== 'function') {
    throw new TypeError('Error')
  }
  obj = obj || window
  // 当前执行的函数为this
  obj.fn = this
  // 去除掉obj参数，剩下的都是执行函数所需要的
  // res is The result of calling the function 
  // with the specified this value and arguments.
  let res = obj.fn(...Array.from(arguments).slice(1))
  delete obj.fn
  return res
}

Function.prototype.apply = function (obj) {
  if (typeof this !== 'function') {
    throw TypeError('Error')
  }
  obj = obj || window
  obj.fn = this
  let res
  if (obj) {
    res = obj.fn(...arguments[1])
  } else {
    res = obj.fn()
  }
  return res
}


var foo = {
  value: 1
};

function bar() {
  console.log(this.value);
}

bar.call(foo); // 1

const array = ['a', 'b'];
const elements = [0, 1, 2];
array.push.apply(array, elements);
console.info(array); // ["a", "b", 0, 1, 2]