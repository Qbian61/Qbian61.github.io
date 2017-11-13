## 一、服务的创建方式

1、通过 factory 构造函数创建服务

2、通过 service 构造函数创建服务

3、通过 provider 构造函数创建服务

4、通过 constant 构造函数创建服务

5、通过 value 构造函数创建服务

下面讲解一下各种方法创建服务的不同之处：

> factory、serviceName和provider

### 1、通过factory创建的服务
```javascript
mainApp.factory("serviceName", function(otherServiceNames) {// otherServiceNames是该服务依赖的其它已创建的服务
    var obj = {// 通过创建新对象，给对象添加方法，属性，然后返回该对象的方式创建服务
        attrName : 'xxx' ,
        methodName : function(args) {
                // Do something ...
            }
    };   
    return obj; // 返回新创建的对象
});
// 以上可以看出，通过factory构造函数创建的服务有点类似于下面这种JavaScript创建对象的方式
var serviceName = (function(otherServiceNames) {
    var obj = {
        attrName : 'xxx' ,
        methodName : function(args) {
                // Do something ...
            }
    };
    return obj;
})(otherServiceNames);
```

### 2、通过service创建服务

```javascript
mainApp.service("serviceName", function(otherServiceNames) {// otherServiceNames是该服务依赖的其它已创建的服务
    this.methodName = function(args) { // 通过给 this 对象添加方法
        // Do something ...
    };
});
// 以上可以看出，通过service构造函数创建的服务有点类似于下面这种，通过构造器+关键字new创建对象的方式
function Person(name, age) {// Person构造函数
    this.name = name;
    this.age = age;
    this.sayName = function() {
        console.info("My name is " + this.name);
    }
}
var p1 = new Person('zhangsan', 20); // 通过关键字new创建Person实例对象
```

service是通过new创建的，所以需要通过this给其添加属性。
### 3、通过provider创建服务：
provider多是创建配置信息相关的服务，根据不同开发场景配置不同的信息，在应用启动时，service调用相关配置信息前，我们就需要在provider完成相关的配置已提供给service服务调用。

```
mainApp.config(function($provide) {
    $provide.provider('serviceName', function(otherServiceNames) {// otherServiceNames是该服务依赖的其它已创建的服务
        this.$get = function() {
            var obj = {
                attrName : 'xxx' ,
                methodName : function() {
                    // Do something ...
                }
            };
            return obj;
        };
    });
});
```

> constant 和 value比较

### 4、通过constant方法创建的服务返回的常量可以注入到配置函数(config)中，而value创建的服务不可以。所以constant方法常用于创建配置信息，value常用于创建对象和函数。

```
// 通过constant构造函数创建名为$servCfg的服务
mainApp.constant('$servCfg', {
    ip1 : '127.0.0.1:8080/demo1/' ,
    ip2 : '127.0.0.1:8080/demo2/'
});
// 通过value构造函数创建名为$LOGO的服务
mainApp.value('$LOGO', 'Hello world!');
```

通过以上实例对比信息，我们可以看到在这五种服务被创建的时候factory、serviceName和provider都是可以依赖其它已经创建好的服务的，也就是可以注入其它服务被自己使用，而constant 和 value却不可以。还有就是在可以被注入到app.config()中的只有provider和constant。


> 二次包装服务的装饰器

## 二、$provide.decorator()装饰器，对需要调用的服务进一步的包装。

```
// 通过factory构造函数创建名为$student的服务
mainApp.factory('$student', function() {
    return {
        name : 'lily' ,
        age : 20
    };
});
// 对$student服务进一步包装
mainApp.config(function($provide) {
    // $student:被包装的服务，$delegate:被包装的$student服务的代理对象
    $provide.decorator('$student', ['$delegate', function($delegate) {
        $delegate.sex = 'woman';    // 通过代理对象$delegate给$student添加sex属性
        return $delegate;
    }]);
});
// 将$student服务注入到myContr控制器中
mainApp.controller('myContr', ['$scope', '$student', function($scope, $student) {
    $scope.person = $student;
}]);
```

myContr模板部分

```
html
<div ng-controller="myContr">
    <!--name、age属性是创建服务时初始化的属性-->
    <li>{{person.name}}<li>
    <li>{{person.age}}<li>
    <!--sex属性是通过包装器后期添加的属性-->
    <li>{{person.sex}}<li>
</div>
```

以上就是AngularJs中五种创建服务的方式对比及其对服务包装器的使用说明。