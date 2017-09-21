> 照着node的express框架我自己也封装了一个很简单的拥有基础功能的qbian-express框架。

# 一、项目目录结构：
```
- app.js
- qbian/
- qbian/index.js
- qbian/MIME.js
- static/
- static/index.html
- static/login.html
- static/css/
- static/css/index.css
- static/images/
- static/images/article.svg
- static/images/favicon.ico
- static/js/
- static/js/index.js
```

# 二、```app.js```文件内容

配置静态资源文件所在位置，默认在```public```文件夹下。

```
const http = require('http');
const fs = require('fs');
const app = require('./qbian/index');

// 配置静态资源文件位置，默认在public文件夹
app.static('./static');

// 拦截网站logo请求
app.get('/favicon.ico', (req, res) => {
  console.info('/favicon.ico');
  fs.readFile('./static/images/favicon.ico', (err, data) => {
    if(err) {
      return res.end('');
    }
    res.writeHead(200, {'Content-Type': "image/x-icon"});
    res.end(data.toString());
  });
});

// 拦截 get /index 请求
app.get('/index', (req, res) => {
  console.info('GET requestData ===> ', req.requestData);
  res.send(req.requestData);
});

// 拦截 post /index 请求
app.post('/index', (req, res) => {
  console.info('POST requestData ===> ', req.requestData);
  res.send(req.requestData);
});

// 拦截 put /index 请求
app.put('/index', (req, res) => {
  console.info('PUT requestData ===> ', req.requestData);
  res.send('e');
});

// 拦截 delete /index 请求
app.delete('/index', (req, res) => {
  console.info('DELETE requestData ===> ', req.requestData);
  res.send({name: 'lily'});
});

// 启动服务器
http.createServer(app.exec).listen(3000);

```
# 三、访问静态资源  login.html

因为我们配置了静态资源所在位置，所以我们启动服务后就可以直接访问资源位置了，这里我没有在response对象上封装```sendFile```方法，默认就直接访问没有做拦截。

```login.html```文件内容如下:

```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>login</title>
  </head>
  <body>
    <h1>Login</h1>
    <form action="index.html" method="get">

      <input type="text">
      <input type="text">
      <input type="submit" value="submit">
    </form>

    <script type="text/javascript" src="../js/index.js"></script>
  </body>
</html>
```

```index.js```文件内容如下：

```
alert(1);
```

这里我们访问一下```http://127.0.0.1:3000/login.html```这个地址，结果如下：

![http://127.0.0.1:3000/login.html](https://raw.githubusercontent.com/Qbian61/Qbian61.github.io/master/resource/qbian-express/login.png)

# 四、访问静态资源文件 index.html

```index.html```文件内容

```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>index</title>
    <link rel="stylesheet" href="./css/index.css">
  </head>
  <body>
    <h1>Index</h1>
    <img src="./images/article.svg" alt="" />
    <form action="login.html" method="get">
      <input type="text">
      <input type="text">
      <input type="submit" value="submit">
    </form>
  </body>
</html>

```

```index.css```文件内容

```

body {
  background-color: gray;
}

```

这里我们访问一下```http://127.0.0.1:3000/index.html```这个地址，结果如下：

![这里我们访问一下```http://127.0.0.1:3000/index.html```这个地址，结果如下：](https://raw.githubusercontent.com/Qbian61/Qbian61.github.io/master/resource/qbian-express/index.png)

# 五、访问 ```get http://127.0.0.1:3000/index```

![get http://127.0.0.1:3000/index](https://raw.githubusercontent.com/Qbian61/Qbian61.github.io/master/resource/qbian-express/get_index.png)

# 六、访问 ```post http://127.0.0.1:3000/index```

![post http://127.0.0.1:3000/index](https://raw.githubusercontent.com/Qbian61/Qbian61.github.io/master/resource/qbian-express/post_index.png)

# 七、访问 ```put http://127.0.0.1:3000/index```

![put http://127.0.0.1:3000/index](https://raw.githubusercontent.com/Qbian61/Qbian61.github.io/master/resource/qbian-express/put_index.png)

# 八、访问 ```delete http://127.0.0.1:3000/index```

![delete http://127.0.0.1:3000/index](https://raw.githubusercontent.com/Qbian61/Qbian61.github.io/master/resource/qbian-express/delete_index.png)

# 九、访问 ```patch http://127.0.0.1:3000/index```，该方法未处理。

![patch http://127.0.0.1:3000/index](https://raw.githubusercontent.com/Qbian61/Qbian61.github.io/master/resource/qbian-express/404_method.png)

# 九、访问 ```get http://127.0.0.1:3000/index1```，该路径未拦截。 404_page

![get http://127.0.0.1:3000/index1](https://raw.githubusercontent.com/Qbian61/Qbian61.github.io/master/resource/qbian-express/404_page.png)


> 源码地址：https://github.com/Qbian61/qbian-express
