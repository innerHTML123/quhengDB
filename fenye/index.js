const express=require('express');
const app=express();
const template=require('art-template');
const bodyParser=require('body-parser');
const path=require('path');
const router=require('./router.js');
const cookieParser=require("cookie-parser");
const session=require("express-session");
app.use(cookieParser())
app.use(session({
	secret: 'keyboard cat',
　　	esave: true,
　　saveUninitialized: true
}))
//设置模板路径
app.set('views',path.join(__dirname,'views'));
//设置模板引擎
app.set('view engine','html');
app.engine('html',require('express-art-template'));
app.use(bodyParser.urlencoded({express:false}));
app.use(router);
app.listen(3000,()=>{
   console.log('服务器启动成功 http://localhost:3000');
});