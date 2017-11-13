> 在JavaScript中，创建对象有很多种方式，对象字面量方式，new Object()方式等，我们今天要讲的是另一种类似于Java创建对象的方式，通过函数创建JavaScript对象

```
javascript
function Person(name) {
    this.name = name;
    this.sayName = function() {
        console.log(this.name);
    }
}
var p1 = new Person('p1');
p1.sayName();// p1
var p2 = new Person('p2');
p2.sayName();// p2
console.info(p1.sayName === p2.sayName);// false
```
 上面可以发现通过一个函数创建的两个对象的对象实例的方法不是同一个（sayName引用不恒等），这就说明了在每一次创建对象时创建的是不同的对象实例，并且会对每一个对象实例创建不同的对象方法，但是在上面的例子中，我们并不想要每一个被创建的对象都拥有其自身的sayName方法，我们希望的是他们都调用同一个sayName方法，这要怎么实现呢
```
function Person(name) {
    this.name = name;
}
Person.prototype = {
    constructor : Person ,
    name : 'defaultName' ,
    sayName : function() {
        console.log(this.name);
    }
};
var p1 = new Person('p1');
p1.sayName();// p1
var p2 = new Person('p2');
p2.sayName();// p2
delete p2.name;
p2.sayName();// defaultName
console.info(p1.sayName === p2.sayName);// true
```
 上面可以看到通过同一个函数创建的两个对象的实例的方法是恒等的了，因为我们将sayName方法添加到了对象的原型上，即所有通过Person函数创建的对象他们共享同一个原型对象。在创建对象时添加的属性只是添加在了对象实例上，原型上并没有被改变，我们通过对象实例访问属性时会按就近原则查找，先查找对象实例本身有没有该属性，如果没有，再查找该对象的原型上有没有定义该属性，如果还没查找到，就会继续向上查找（如果该对象有通过原型链继承其它对象时），最终会查找到Object对象的属性上，如还没有查找到该属性，就报错了（调用属性报undefined，调用方法报Uncaught TypeError）。上面还演示了delete关键字的用法，delete只会删除对象实例上的属性，原型上定义的属性并不会删除，所有delete p2.name删除的只是p2对象实例上定义的属性 'p2'，原型上定义的 'defaultName'并没有被删除，删除后再次访问 p2.sayName() 会调用 this.name ，这次会先查找p2对象实例上有没有 name属性，因为被我们删除了，所以查找不到，然后继续向上查找 Person原型上有没有定义name属性，查找到 name='defaultName'，然后调用的就是这个原型上定义的name属性defaultName。
 我们可不可以在创建完对象后再给原型添加方法或属性呢，这也是可以的，并且创建后的对象也是可以访问到后来添加在原型上的属性和方法的。

```
Person.prototype.sex = 'man';
console.log(p2.sex); // man
```
 上面的代码是接着上一部分写的，可以看到p2在创建完成以后再次给Person.prototype添加sex属性，Person的实例对象p2也是可以访问到的。当然我们在Person.prototype上添加的所有属性Person的实例对象p1,p2都是可以访问到的，那我们怎么通过Person的实例对象给Person原型添加属性或方法呢，这个也是可以做到的。
```
p2.__proto__.age = 18;// 相当于 Person.prototype.age = 18;
console.log(p1.age);// 18
```
 上面的代码还是接着上一部分写的，可以看到对于实例对象p1,p2，它们都可以通过__proto__访问到Person的原型（prototype），其实__proto__就是在实例对象上的指向函数原型的指针。
 我们知道call()函数可以将一个对象拥有的属性和方法都赋值到另一个对象上。我们可以这样创建Person的实例对象。
```
var obj = {};
Person.call(obj, 'obj');
console.log(obj.name);// obj
```
上面创建的obj对象只会拥有Person实例对象的属性和方法，不会有Person原型对象的属性和方法，如下图：
![call函数创建的对象](https://raw.githubusercontent.com/Qbian61/Qbian61.github.io/master/resource/js/call%E5%87%BD%E6%95%B0%E5%88%9B%E5%BB%BA%E7%9A%84%E5%AF%B9%E8%B1%A1.png)
所以还需要让obj的__proto__指向Person原型对象。
````javascript
var obj = {};
obj.__proto__ = Person.prototype;
Person.call(obj, 'obj');
obj.sayName();// obj
````
这次我们再来看下obj对象的详细信息，如下图：
![将原型赋值给对象的proto](https://raw.githubusercontent.com/Qbian61/Qbian61.github.io/master/resource/js/%E5%B0%86%E5%8E%9F%E5%9E%8B%E8%B5%8B%E5%80%BC%E7%BB%99%E5%AF%B9%E8%B1%A1%E7%9A%84proto.png)