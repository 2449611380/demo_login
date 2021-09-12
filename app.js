const express = require('express');
const mysql = require('mysql');
const app = express();

const pool = mysql.createPool({
    host: 'localhost', // 数据库IP
    port: 3306, // 端口
    user: 'root', // 用户名
    password: '', // 密码
    database: 'node' // 数据库库名
});

let conData;

pool.query('select * from user', (err, data) => {
    conData = data;
});

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile('/index.html');
});

// 登录路由
app.get('/login', (req, res) => {
    if (req.query.user == '' || req.query.password == '') {
        res.send('账号和密码不能为空');
    } else if (signIn(req.query.user, req.query.password) == true) {
        res.send('登录成功');
        pool.query('select * from user', (err, data) => {
            conData = data;
        });
    } else {
        res.send('账号或密码错误');
    };
});

app.get('/logon', (req, res) => {
    if (req.query.user == '' || req.query.password == '') {
        res.send('账号和密码不能为空');
    } else if (register(req.query.user, req.query.password) == true) {
        res.send('注册成功');
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

function signIn(user, password) {
    for (let i = 0; i < conData.length; i++) {
        console.log(user, conData[i].user, password, conData[i].password);
        if (user == conData[i].user && password == conData[i].password) {
            return true;
        };
    };

    return false;
};

function register(user) {
    let userArr = [];
    for (let i = 0; i < conData.length; i++) {
        userArr.push(user != conData[i].user)
    };

    for (let i = 0; i < userArr.length; i++) {
        if (userArr[i] === false) {
            return false;
        };
    };
    return true;
};

app.listen(3000, () => {
    console.log(`Server Path: 3000`);
});