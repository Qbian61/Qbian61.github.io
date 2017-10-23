# 一、函数简介

在JavaScript中每一个函数的内部，除了声明时定义的形式参数外，每个函数还附加了两个参数：```this``` 和 ```arguments```。

参数```arguments```是一个数组类型的变量，数组中的值就是实际调用函数时传进来的参数列表。在定义函数时会有函数的形式参数```parameters```，在具体调用函数时，当实际参数```arguments```的个数与形式参数```parameters```的个数不匹配时，不会导致运行时错误。如果实际参数过多，超出的参数值会被忽略掉。如果实际参数值过少，缺少的值会被替换为```undefined```。函数执行时不会对参数值进行类型校验，也就是说任何类型的值都可以传递给任何参数。


参数 ```this```在面向对象编程语言中是非常重要的概念，它是指具体的类对象的实例，也就是类```new```出来的那个具体的对象本身。但是在JavaScript中的```this```的值取决于调用的模式。在JavaScript中一共有四种调用模式：方法调用模式、函数调用模式、构造器调用模式和apply调用模式。

# 二、方法调用模式

当一个函数被定义在一个对象的属性上，这时我们称这个函数是这个对象的一个方法。当这个方法被调用时，这个函数内部的this指向的就是该对象，示例如下：

```
var obj = {
    value: 1,
    add: function() {
        // 这里的 this 是绑定在 obj 这个对象上的
        this.value += 1;
        return this.value;
    }
};
console.info(obj.add()); // 2
console.info(obj.add()); // 3
```

```obj.add```方法可以通过```this```访问自己所属对象```obj```，所以它能从对象中取值或对对象进行修改。**this到对象的绑定发生在方法被调用的时候。** 通过```this```可取得它们所属对象的上下文的方法称为公共方法。

# 三、函数调用模式

当一个函数并非一个对象的属性时，那么它就是被当做一个函数来调用的。

> 例一

```
var a = 1;
var add = function(b) {
  // 这里的 this 是绑定在全局作用于 window 上的
  return this.a + b;
};
console.info(add(2)); // 3
```

> 例二

```
var a = 1;
var obj = {
  a: 2,
  add: function(b) {

    var innerAdd = function(innerB) {
      // 这里的 this 绑定的还是 window 对象上的 this
      return this.a + innerB;
    };
    console.info(innerAdd(0)); // 1
    // 这里的 this 是绑定在 obj 对象上的
    return this.a + b;
  }
};
console.info(obj.add(0)); // 2
```

以上两例可以看出，以此模式调用函数时，this被绑定到了全局对象上。如果依照**方法调用模式**推理的话，这里的this应该被绑定到外部函数上，但是这个设计缺陷也不是无法解决的，我们可以将外部函数的this赋值给一个变量。如下示例：

> 例三

```
var a = 1;
var obj = {
  a: 2,
  add: function(b) {
    // 将绑定在 obj 对象上的 this 赋值给变量 that
    var that = this;

    var innerAdd = function(innerB) {
      // 这里调用的是变量 that,这个 that 是绑定在 obj 对象上的
      return that.a + innerB;
    };
    console.info(innerAdd(0)); // 2
    // 这里的 this 是绑定在 obj 对象上的
    return this.a + b;
  }
};
console.info(obj.add(0)); // 2
```

# 四、构造器调用模式

如果在一个函数前带上```new```来调用，那么内部会创建一个连接到该函数的```prototype```成员的新对象，同时this会被绑定到那个新对象上。

如果函数定义时内部存在```return```关键词，这时return 出去的就是```this```(新创建的对象)。

```
// 定义一个 Person 函数（类）
var Person = function(name) {
  // 这里的 this 绑定的就是 new 出来的那个实例对象
  this.name = name;
};

// 定义 Person 函数（类）的原型对象
Person.prototype = {
  run: function() {
    /**
    * 这里的 this 并没有绑定在 Person.prototype 对象上
    * 而是绑定在 new 出来的那个实例对象上
    */
    console.info(this.name + '的 run 方法。');
  }
};

var lily = new Person('lily');
lily.run(); // lily的 run 方法。
```

> 提示：一个函数，如果定义的目的就是结合 new 前缀来调用，那它就被称为构造函数。并且按照约定，它们定义的函数名以大写字母开头。

# 五、apply调用模式

因为JavaScript是一门函数式的面向对象编程语言，所以函数也可以拥有方法，apply就是```Function.prototype```上的一个方法。

apply方法让我们构建一个参数数组传递给调用函数，它还可以容许我们选择this的值。apply方法接受两个参数，第一个是要绑定 this 的值，第二个就是这个函数执行时的实参 参数 数组了。

> 例一

```
var add = function(a, b) {
  return a + b;
};

var result = add.apply(null, [1, 2]);
console.info(result); // 3
```

> 例二

```
var obj = {
  name: 'obj',
  introduction: function() {
    console.info('My name is ' + this.name);
  }
};
obj.introduction.apply(obj, []); // My name is obj

var anotherObj = {
  name: 'anotherObj'
};

obj.introduction.apply(anotherObj, []); // My name is anotherObj
```


**总结：以上就是JavaScript中用到this的几种情况了，在面向对象中搞清楚this的指向是非常重要的，在JavaScript中也同等重要。**
