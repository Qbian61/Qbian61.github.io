# 一、CommonJS

**CommonJS** 原来叫 ServerJS，是以在浏览器环境之外构建 JavaScript 生态系统为目标而产生的项目，比如在服务器
和桌面环境中。
CommonJS 规范是为了解决 JavaScript 的作用域问题而定义的模块形式，可以使每个模块它自身的命名空间中执行。
该规范的主要内容是，模块必须通过 module.exports 导出对外的变量或接口，通过 require() 来导入其他模块的输出到当前模块作用域中。例子如下：

```
// moduleA.js
module.exports = function(x) {
    return x * x; 
};
```

```
// moduleB.js
const moduleA = require('./moduleA');
var result = moduleA(2);
```

CommonJS 是同步加载模块。

NodeJs就是采用commonJs规范。

# 二、AMD

**AMD（Asynchronous Module Definition）**（异步模块定义）是为浏览器环境设计的，因为 CommonJS 模块系统是同步加载的，当前浏览器环境还没有准备好同步加载模块的条件。
AMD 定义了一套 JavaScript 模块依赖异步加载标准，来解决同步加载的问题。
模块通过 define 函数定义在闭包中，格式如下：

```
define(id?: String, dependencies?: String[], factory: Function|Object);
```

id 是模块的名字，它是可选的参数。
dependencies 指定了所要依赖的模块列表，它是一个数组，也是可选的参数，每个依赖的模块的输出将作为参数一次传入 factory 中。如果没有指定 dependencies，那么它的默认值是 ["require", "exports", "module"]。

```
define(function(require, exports, module) {}）
```

factory 是最后一个参数，它包裹了模块的具体实现，它是一个函数或者对象。如果是函数，那么它的返回值就是模块的输出接口或值。
定义一个名为 moduleA 的模块，它依赖 jQuery 模块：

```
define('moduleA', ['jquery'], function($) {
    // $ 是 jquery 模块的输出
    $('body').text('hello world');
});
// 使用
define(['moduleA'], function(moduleA) {});
```

RequireJS就是采用AMD规范。

# 三、CMD

**CMD（Common Module Definition）**，在 CMD 规范中，一个模块就是一个文件。
代码的书写格式如下：

```
define(factory);
```

define是全局函数，用来定义模块。define接收factory参数，factory可以是函数，对象或字符串。
factory为对象或字符串时，表示该模块的接口就是该对象或字符串，比如要定义一个json数据模块：

```
define({"key" : "val"});
```

也可以通过字符串定义模板模块：

```
define("Hello {{name}}!")
```

factory是函数时，表示是模块的构造方法。执行该构造方法，可以得到模块对外提供的接口，factory方法在执行时，默认会传入三个参数，require，exports，module。

```
define(function(require, exports, module) {
    // 需要导出的模块
});
```

require是方法，接收模板标识作为唯一参数，用来获取其他模块提供的接口：

```
define(function(require, exports) {
    const a = require('./a');
    a.doSomething();
});
```

require是同步往下执行的，require.async(id, callback?)用来在模块内部异步加载模块，并在加载完后执行回调函数：

```
define(function(require, exports) {
    require.async(['./a', './b'], function(c, d) {
        c.doSomething();
        d.doSomething();
    });
});
```

factory是函数时的第二个参数exports，exports是一个对象，用来对外提供模块接口。

```
define(function(require, exports) {
    exports.str = 'xxxxx';  // 对外提供str属性
    
    exports.doSomething = function() {  // 对外提供 doSomething() 方法
        // TODO
    }；
});
```

除了exports外，还可以用return直接对外提供对象接口

```
define(function(require, exports) {
    return {
        str : 'xxxxx' ,
        doSomething : function() {}
    };
});
```

exports是module.exports对象的一个引用，很多时候exports都无法满足要求，例如对外提供一个实例对象：

```
define(function(require, exports, module) {
    function Person(name, age) {
        this.name = name;
        this.age = age;
    }
    module.exports = new Person('lily', 20); // 对外提供实例化后的Person对象。
});
```

module.exports还可以对外提供一个函数（exports不可以）：

```
define(function(require, exports, module) {
    var Person = function(name, age) {
        this.name = name;
        this.age = age;
    }
    module.exports = Person; // 对外提供Person函数。
});
```

sea.js就是采用CMD规范。

# 四、AMD+CMD比较

AMD默认是依赖前置，在一开始就将需要依赖的文件配置并加载好：

```
define('moduleA', ['jquery'], function($) {
    // 依赖的配置文件已经配置并加载好了。
    $('body').text('hello world');
});
```

CMD是依赖就近，需要使用的时候才会去配置加载：

```
define(function(require, exports) {
    var a = require('./a.js'); // 配置并加载，同步
    
    if(false) {
        var b = require('./b.js'); // 该配置的文件永远不会去加载，
    }
});
```