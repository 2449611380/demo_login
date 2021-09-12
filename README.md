# demo_login
### 一个登录小模块

基于NodeJS 和 express、mysql编写

学完没两天凭自己的想法和思路写出来的登录，可能写法不够正规什么的，还请大佬们指出

![Alt](https://img1.baidu.com/it/u=3034346274,2536189316&fm=26&fmt=auto&gp=0.jpg)

自己发现了代码缺点，已经不够全面的判断，但基本上的，登录、注册不能空，账号或密码错误，注册账号的功能还是有哒。

就是不知道怎么打包项目，尤其是后端来着，很懵，但问题不大啦，热爱学习，一点点来准没错啦

这个demo就给像我一样的萌新看吧，毕竟简单易懂，诶嘿

请多支持 ~ ！！

------------------------------
数据库修改:
``` JavaScript 
const pool = mysql.createPool({
    host: 'localhost', // 数据库IP
    port: 3306, // 端口
    user: 'root', // 用户名
    password: '', // 密码
    database: 'node' // 数据库库名
});
```

数据表名修改:
``` JavaScript
app.get('/logon', (req, res) => {
    if (req.query.user == '' || req.query.password == '') {
        res.send('账号和密码不能为空');
    } else if (register(req.query.user, req.query.password) == true) {
        res.send('注册成功');
        // INSERT INTO `user` <- `user`是表名啦，`query`里面是原生SQL语句
        pool.query(`INSERT INTO user (user, password) VALUES('${req.query.user}', '${req.query.password}');`, (err, data) => {
            if (err) {
                throw err;
            } else {
                pool.query('select * from user', (err, data) => {
                    conData = data;
                });
            };
        });
    } else {
        res.send('注册失败，已经有相同账号了');
    };
});
```

总结和想法：

> 做这个demo的时候思路比较清晰，但是也遇到了挺多坑，也不知道为什么会报错，应该是开发经验不足吧！
> 
> 所有判断都在服务端，做完之后想到在from表单发送之前拦截到，在客户端的JS里写上一堆登录或者是注册的判断
> 
> 然后在访问路由 `获取` / `写入`;
> 
> 后端和前端结合使用，虽然头疼，但真的带给自己的成就感很多很多
> 
> 前端路长路杂，慢慢努力！！
> 
> 以上是想法和总结，描述的不好请见谅(小声说话：MarkDown怎么用QAQ)

运行：
```
npm install

node app
```

