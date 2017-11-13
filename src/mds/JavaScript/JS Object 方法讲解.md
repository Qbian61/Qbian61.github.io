# 一、Object.assign()

将多个对象的**可枚举**属性拷贝到目标对象上，并且返回赋值后的目标对象。

> Object.assign(target, ...sources)

- target：目标对象
- ...sources：源对象

**测试如下：**

```
var source1 = {
  name1: 'source1',
  age1: 18
};

var source2 = {
  name2: 'source2',
  age2: 19
};

var target = Object.assign({name: 'target'}, source1, source2);

console.info(JSON.stringify(target)); 
// 输出如下：
{
    "name":"target",
    "name1":"source1",
    "age1":18,
    "name2":"source2",
    "age2":19
}
```

# 二、Object.create()

获取一个类的原型（prototype）对象，返回值为参数类的原型对象。可用于类继承。

> Object.create(proto[, propertiesObject])

- proto：类原型

**测试如下：**
```
// 父类
function Super1Class() {
  this.name = 'Super1Class';
}

Super1Class.prototype = {
  super1Method: function() {
    console.info('My name is ' + this.name);
  }
};

// 子类
function MyClass() {
  this.name = 'MyClass';
}

MyClass.prototype = Object.create(Super1Class.prototype); 
// 类似于下面这种方式
// MyClass.prototype = new  Super1Class();

var myClass = new MyClass();

console.info(myClass instanceof Super1Class); 
// true
console.info(myClass instanceof MyClass);   
// true
console.info(myClass.super1Method()); 
// My name is MyClass
```

# 三、Object.defineProperties()

给对象定义属性，如果存在该属性，则用新定义的属性更新已存在的属性，如果不存在该属性，则添加该属性。

> Object.defineProperties(obj, props)

- obj：被添加属性的对象
- props：添加或更新的属性对象

**测试如下：**
```
var obj = {
  name: 'obj'
};

Object.defineProperties(obj, {
  name: {
    value: 'newName',
    writable: true
  },
  newProp1: {
    value: 'newProp1',
    writable: true,
    enumerable: true
  },
  newProp2: {
    value: 'newProp2',
    writable: true
  }
});

console.info(JSON.stringify(obj));
// 输出结果如下
{
    "name":"newName",
    "newProp1":"newProp1"
}
```

从以上输出结果可以看到，Object.defineProperties()定义的覆盖属性name只是更新了旧属性name的值及其writable属性，并没有更新name属性的可枚举性。

但是我们通过Object.defineProperties()定义的新属性newProp2默认是不可枚举的，所以在JSON.stringify(obj)时并没有序列化该新定义的属性。

**以上结果可以得出结论：**

JSON.stringify()序列化对象到JSONObject时，只会序列化该对象可枚举的属性。

# 四、Object.defineProperty()

在对象上定义新属性，或修改对象现有属性，并返回该对象。

> Object.defineProperty(obj, prop, descriptor)

- obj：被添加属性的对象
- prop：属性名
- descriptor：属性描述

**测试如下：**

```
var obj = {};

var mame = 'obj';
Object.defineProperty(obj, 'name', {
  configurable: true,
  enumerable: true,
  get: function() {
    console.info('get name .');
    return mame;
  },
  set: function(newName) {
    console.info('set new name is ' + newName);
    mame = newName;
  }
});

console.info(JSON.stringify(obj));
obj.name = 'xxx';
console.info(JSON.stringify(obj));
// 输出结果如下：
get name .
{"name":"obj"}
set new name is xxx
get name .
{"name":"xxx"}
```

从以上测试结果可以看出，我们在序列化对象是会调用一次属性的get方法，在给对象属性赋值时，会调用一次属性的set方法。

# 五、Object.entries()

遍历获取对象上所有**可枚举**的属性，返回结果是一个二维数组```[['key1', 'value1'], ['key2', 'value2'], ......]```

> Object.entries(obj)

- obj：被遍历的对象

**测试如下：**

```
var obj = {
  name: 'obj',
  age: 18
};

var kvs = Object.entries(obj);

console.info(JSON.stringify(kvs)); 
// [["name","obj"],["age",18]]

for(let [key, value] of Object.entries(obj)) {
  console.info(key + ' --> ' + value); 
  // name --> obj, age --> 18
}

Object.entries(obj).forEach(function([key, value]) {
  console.info(key + ' --> ' + value); 
  // name --> obj, age --> 18
});

for(let key in obj) {
  console.info('key --> ' + key); 
  // key --> name, key --> age
}
```

# 六、Object.freeze()

将一个对象上的属性冻结，阻止添加、删除、更新属性到该对象及其原型。返回被冻结的对象。

> Object.freeze(obj)

- obj：被冻结的对象

**测试如下：**

```
'use strict'

var obj = {
  name: 'obj'
};

obj['age'] = 18;
obj.name = 'newName';

console.info(JSON.stringify(obj)); 
// {"name":"newName","age":18}

var o = Object.freeze(obj);

console.info(o === obj); 
// true

// 开启严格模式报错
obj['sex'] = 'man'; 
// Uncaught TypeError: Cannot add property sex, object is not extensible
obj.name = 'updateName'; 
// Uncaught TypeError: Cannot assign to read only property 'name' of object '#<Object>'

console.info(JSON.stringify(obj)); 
// {"name":"newName","age":18}
```

**被冻结的对象所有属性只可读。**

# 七、Object.getOwnPropertyDescriptor()

获取一个对象**指定名称**的直接属性的描述信息（直接在对象上的属性，而不是原型链上的属性），存在则返回该属性的描述信息，不存在则返回undefined。

> Object.getOwnPropertyDescriptor(obj, prop)

- obj：目标对象
- prop：被获取的属性名

**测试如下：**

```
function Obj() {
  this.name = 'obj';
}

Obj.prototype = {
  age: 18,
  sex: function() {
    return 'man';
  }
};

var obj = new Obj();

var descName = Object.getOwnPropertyDescriptor(obj, 'name');
console.info(JSON.stringify(descName)); 
// {"value":"obj","writable":true,"enumerable":true,"configurable":true}

var descAge = Object.getOwnPropertyDescriptor(obj, 'age');
console.info(JSON.stringify(descAge)); 
// undefined

var descSex = Object.getOwnPropertyDescriptor(obj, 'sex');
console.info(JSON.stringify(descSex)); 
// undefined
```

# 八、Object.getOwnPropertyDescriptors()

获取一个对象**所有**的直接属性的描述信息（直接在对象上的属性，而不是原型链上的属性）。

> Object.getOwnPropertyDescriptors(obj)

- obj：目标对象

**测试如下：**

```
function Obj() {
  this.name = 'obj';
  this.age = 18;
}

Obj.prototype = {
  sex: function() {
    return 'man';
  }
};

var obj = new Obj();

var descObj = Object.getOwnPropertyDescriptors(obj);
console.info(JSON.stringify(descObj));
// 输出结果如下
{"name":
  {
    "value":"obj",
    "writable":true,
    "enumerable":true,
    "configurable":true
  },
  "age":{
    "value":18,
    "writable":true,
    "enumerable":true,
    "configurable":true
  }
}
```

# 九、Object.getOwnPropertyNames()

获取一个对象所有的直接属性的属性名称（直接在对象上的属性，而不是原型链上的属性）。返回属性名称字符串数组。

> Object.getOwnPropertyNames(obj)

- obj：目标对象

**测试如下：**

```
function Obj() {
  this.name = 'obj';
  this.age = 18;
}

Obj.prototype = {
  sex: function() {
    return 'man';
  }
};

var obj = new Obj();

var objProps = Object.getOwnPropertyNames(obj);
console.info(JSON.stringify(objProps));
// ["name","age"]
```

# 十、Object.getOwnPropertySymbols()

获取对象上所有的```Symbol```类型的属性列表。

> Object.getOwnPropertySymbols(obj)

- obj：目标对象

**测试如下：**

```
const obj = {
  name: 'obj'
};

const name = Symbol('name');

obj[name] = '我是 Symbol 类型的 name 值';

var objSymbolProps = Object.getOwnPropertySymbols(obj);

console.info(objSymbolProps);
// [Symbol(name)]
console.info(obj[objSymbolProps[0]]);
// 我是 Symbol 类型的 name 值
```

# 十一、Object.getPrototypeOf()

获取一个对象上的原型对象，其功能和 obj._ _proto_ _等同。 。

> Object.getPrototypeOf(obj)

- obj：目标对象

**测试如下：**

```
function MyClass() {}

MyClass.prototype = {
  name: 'MyClass'
};

var obj = Object.create(MyClass.prototype);

console.info(Object.getPrototypeOf(obj) === MyClass.prototype);
// true

console.info(obj.__proto__ === MyClass.prototype);
// true
```

# 十二、Object.is()

比较两个对象是否相同，值类型对象比较值是否相等，引用类型对象比较内存地址是否相同。

> Object.is(value1, value2);

- value1：第一个被比较的对象
- value2：第二个被比较的对象

**测试如下：**

```
Object.is('foo', 'foo');     // true
Object.is(window, window);   // true

Object.is('foo', 'bar');     // false
Object.is([], []);           // false
Object.is({}, {});           // false

var obj1 = {
  name: 'obj'
};

var obj2 = {
  name: 'obj'
};

Object.is(obj1, obj1);       // true
Object.is(obj1, obj2);       // false

Object.is(null, null);       // true

Object.is(0, -0);            // false
Object.is(-0, -0);           // true
Object.is(NaN, 0/0);         // true
```

# 十三、Object.keys()

返回对象的可枚举属性数组。

> Object.keys(obj)

- obj：目标对象

**测试如下：**

```
var arr = ['a', 'b', 'c'];

console.info(Object.keys(arr));
// ["0", "1", "2"]

var obj = { 1: 'a', 0: 'b', 2: 'c' };

console.log(Object.keys(obj));
// ["0", "1", "2"] 
```
以上结果可以看到Object.keys(obj)还会对属性名进行排序。