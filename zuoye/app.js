/*
Module dependencies.
*/
var express = require('express')//找‘expresss’ 1.先在node.js内置的库中找 2.（有./直接在2）再到app.js所在的文件夹中node_modules/express/index.js中
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')//这就是node.js中内置的
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');//__dirname环境变量 指当前目录
app.set('view engine', 'ejs'); //视图引擎 'ejs'在node_modules中
//app.set('view engine', 'html');  
//app.engine('html', require('ejs').renderFile); 
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.cookieParser()); //自己手动添加
app.use(express.session({secret:'xxyz'})); //自己手动添加
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));//‘public’ 提供下载目录 可以随意改

// development only
if ('development' == app.get('env')) {  //正式使用时这里要有开发者模式 改为密匙模式
  app.use(express.errorHandler());
}

//app.get('/', routes.home);
app.get('/',routes.home);
app.get('/test/:name/:year', function(req, res) {
    console.log(req.params.name);
    console.log(req.params.year);
    res.end();
});//这是在浏览器中做实验 在浏览器地址栏中输入/test/hxb/3000 能在黑窗口中显示出来

app.get('/test', function(req, res) {
    console.log(req.query.name);
    console.log(req.query.year);
    res.end();
});//同上 方法2而已

app.get('/param', routes.param);
app.get('/param_get', routes.param_get);
app.post('/param_post', routes.param_post);


app.post('/test',function(req,res){
	res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})
	res.end(req.body.name+req.body.year);
});


app.get('/insert', function(req, res){
	res.render('insert');//render()里面跟的一定是文件
});
app.post('/insert', routes.insert);
/* app.get('/insert',function(req,res){
	res.render('insert');
})
app.post('/insert',routes.insert);*/

app.get('/login', function(req, res){
	if(req.session.user){res.render('content',{user:req.session.user})}
	  else{res.render('login');}
});

app.post('/login', routes.login);

app.get('/content', function(req, res){
	if(req.session.user){res.render('content',{user:req.session.user})}
	  else{res.render('login');}
});

app.get('/logout', function(req, res){
	req.session.user='';
	res.render('logout');
});

app.get('/cookie_set',function(req,res){
	res.cookie('num', 1, { maxAge:5000});
	res.redirect('/cookie_view');
});

app.get('/cookie_view',function(req,res){
	res.render('cookie_view',{num:req.cookies.num});
});
app.get('/cookie_clear',function(req,res){
	res.clearCookie('num');
	res.redirect('cookie_view');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

//localhost:3000/