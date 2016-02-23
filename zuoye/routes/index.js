 /*
 * GET home page.
 */
/*exports.home = function(req, res){
    var mongoskin = require('mongoskin');
    var db = mongoskin.db('localhost:27017/test?auto_reconnect');
    var test1=db.collection('test1'); 
    test1.find({}).toArray(function (err, docs) {
        res.render('home', { docs:docs });
    });
};*/
exports.home=function(req,res){
    var mongoskin=require('mongoskin');
    var db=mongoskin.db('localhost:27017/test?auto_reconnect');
    var test1=db.collection('test1');
    test1.find({}).toArray(function(err,docs){
        res.render('home',{docs:docs});//render是绘制一个网页的意思
    });
};

/*exports.insert = function(req, res){
    var mongoskin = require('mongoskin');
    var db = mongoskin.db('localhost:27017/test?auto_reconnect');//test 是一个数据库 
    var test1=db.collection('test1');//'test1'是一个数据集
    test1.insert({name:req.body.name,year:parseInt(req.body.year),thing:req.body.thing,qita:req.body.qita}, function(err, result) {
        console.log(result);
    }); 
	res.redirect('/');  
};*/
 exports.insert=function(req,res){
    var mongoskin=require('mongoskin');
    var db=mongoskin.db('localhost:27017/test?auto_reconnect');
    var test1=db.collection('test1');
    test1.insert({name:req.body.name,year:parseInt(req.body.year),thing:req.body.thing,qita:req.body.qita},function(err,result){
        console.log(result);
    });
    res.redirect('/');
 };

/*exports.login = function(req, res){
    var mongoskin = require('mongoskin');
    var db = mongoskin.db('localhost:27017/test?auto_reconnect');
    var user=db.collection('user'); 
	user.count({user:req.body.user,pwd:req.body.pwd}, function(err, count) {    
            if(count>0){
			req.session.user=req.body.user;
			res.render('content', {user:req.body.user});
			}else{
				res.render('error');
			    }
    });
};*/
exports.login=function(req,res){
    var mongoskin=require('mongoskin');
    var db=mongoskin.db('localhost:27017/test?auto_reconnect');
    var user=db.collection('user');//下面的user是上文的数据集 下面语句意为 数据集中有输入的用户名 密码 则count>0
    user.count({user:req.body.user,pwd:req.body.pwd},function(err,count){
        if(count>0){
            req.session.user=req.body.user;
            res.render('content',{user:req.body.user});
        }else{
            res.render('error');
        }
    });
};

exports.param = function(req, res){
    res.render('param');  
};

exports.param_get = function(req, res){
    res.render('param_get', { x:req.query.x,y:req.param('y') });  
};

exports.param_post = function(req, res){
    res.render('param_post', { a:req.body.a});  
};