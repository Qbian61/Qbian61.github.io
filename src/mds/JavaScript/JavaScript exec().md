使用exec方法多次匹配一段文本中指定格式的内容。

例如```将文本内的 <img class="emoji smile" title="微笑"/> 替换为 [微笑]```

```
let reg = new RegExp(/<img[^>]*title="([^"]*)"[^>]*/>/, 'g');
    var result;
    while ( (result = reg.exec(text)) != null) {
      text = text.replace(result[0], '[' + result[1] + ']');
      reg.lastIndex = 0;
    }
    return text;
}
```

需要注意的是** 如果在一个字符串中完成了一次模式匹配之后要开始检索新的字符串，就必须手动地把 lastIndex 属性重置为 0 **。

追加一点注意事项** 正则表达式匹配的时候一定要注意结束条件，就像上面我们匹配成功后会将匹配的内容替换为我们自定义的内容，但是如果我们自定义的内容内还存在匹配的内容，这样就会存在死循环，浏览器会被卡死。 **

如果上面我们没有将```reg.lastIndex = 0```的话，两个连续的```<img class="emoji smile" title="微笑"/><img class="emoji smile" title="微笑"/>```只会匹配到第一个，因为第二次匹配的字符串被我们更新了（变短了），但是匹配的索引还是上一次的，所以就会漏掉第二个。