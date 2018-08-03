var express = require('express');
var router = express.Router();
var path = require('path');
var hash = require('pbkdf2-password')();
var bodyParser = require('body-parser');
var request = require('request');


//关联主程序
var userDao = require('../dao/userDao.js');

//// 创建 application/x-www-form-urlencoded 编码解析
//var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/', function(req, res, next) {
//	res.sendFile(path.join(__dirname, '../views/hitcard.html'));
	//res.render('index', { title: '我是谁诶诶诶诶诶诶~'});
});
function outputObj(obj) {
	var description = "";
	for(var i in obj) {
		description += i + " = " + obj[i] + "\n";
	}
	console.log(description);
}

//网页
//不会模板渲染还有别的办法吗
//什么样的数据 需要存到redis
//流程流程
/**
 * 登录打卡
 */
router.post('/weblogin', async function(req, res, next) {
	//是否存在此用户
	if(req.session.user && (req.session.user.nickName == req.body.nickName)){//存在
		//times=1 上班打卡，  times=2下班打卡， times=0初始值
		if(req.session.user.overdate==(new Date()).toISOString().split("T")[0]){
			res.redirect(`/hitcardIsOver.html`);
		}
		req.session.user.times && (req.session.user.times+=1) || (req.session.user.times==0);
	}else{//不存在
		req.session.user = req.body;//将用户信息存入session
		req.session.user.times = 0;//表示还打过卡
		req.session.user.overdate = "";
	}
	res.redirect(`/hitcard.html?nickname=${req.session.user.nickName}&times=${req.session.user.times}`);	
	console.log(req.session)
});
/**
 * 打卡操作接口
 */
router.post('/hitcard', async function(req, res, next) {
	console.log(req.session.user.nickName, req.body);
	//判断用户是否合法
	if(req.session.user.nickName == req.body.nickName){//合法
		//数据库插入一条打卡记录
		let result = await userDao.addHitCardLog({nickName:req.session.user.nickName, hitTime:req.body.hitTime, times:req.body.times});
		if(req.body.times == 2){//今日打卡结束
			req.session.user.overdate = req.body.hitTime.split(" ")[0];//记录日期部分
			req.session.user.times = 0;
			res.jsonp({
			  status: 200,
			  message: "ok",
			  data: {
			   	message: "已完成打卡",
			  }
			});
		}
		console.log(result);
		res.jsonp({
		  status: 200,
		  message: "ok",
		  data: {
		   	message: "打卡成功",
		  }
		});
	}else{
		res.jsonp({
		  status: 200,
		  message: "ok",
		  data: {
		   	message: "恶意用户",
		  }
		});
	}
});	
router.get('/hitCardLog', async function(req, res, next) {
	let result = await userDao.getHitCardLog();
	res.jsonp({
		  status: 200,
		  message: "ok",
		  data: {
		   	result
		  }
		});
});

//微信小程序登陆
router.post('/login', async function(req, res, next) {
	console.log(req.body.userInfo);
	let appid = 'wx2a67e2e4bf531217';
	let secret = '64bfb35d7a86198875121a8bcae944a2';
	let code = req.body.userInfo.code;
	delete req.body.userInfo.code;
	let url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${code}&grant_type=authorization_code`
    request(url, async function (error, response, body) {
    	let body2 = JSON.parse(body);
	 	let session_key = body2.session_key;
	  	let openid = body2.openid;
	  let result = await userDao.isOpdenidExist(openid);
	  console.log("******************isOpdenidExist*************************");
	  console.log(result);
	  if(result.length > 0){
	  	//存在
	  	res.jsonp({
		  status: 200,
		  message: "ok",
		  data: {
		   	message: "成功登录",
		   	userId: result[0].id
		  }
		});
	  	
	  }else{
	  	req.body.userInfo.openid = openid;
	  	let result = await userDao.addUserWithWxUserInfo(req.body.userInfo);
	  	res.jsonp({
		  status: 200,
		  message: "ok",
		  data: {
		   	message: "成功注册",
		  }
		});
	  }
	})
});
function authenticate(name, pass, fn) {
	if(!module.parent) console.log('authenticating %s:%s', name, pass);
	var user = users[name];
	if(!user) return fn(new Error('cannot find user'));
	hash({
		password: pass,
		salt: user.salt
	}, function(err, pass, salt, hash) {
		if(err) return fn(err);
		if(hash === user.hash) return fn(null, user)
		fn(new Error('invalid password'));
	});
}

module.exports = router;