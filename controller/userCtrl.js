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
/* GET home page. */
//进入主页面信息
router.get('/', function(req, res, next) {
	res.sendFile(path.join(__dirname, '../views/lgn_rgt.html'));
	//res.render('index', { title: '我是谁诶诶诶诶诶诶~'});
});

function outputObj(obj) {
	var description = "";
	for(var i in obj) {
		description += i + " = " + obj[i] + "\n";
	}
	console.log(description);
}

//登录
// Authenticate using our plain-object database of doom!


router.post('/login', async function(req, res, next) {
	console.log(req.body.userInfo);
	let appid = 'wx2a67e2e4bf531217';
	let secret = '64bfb35d7a86198875121a8bcae944a2';
	let code = req.body.userInfo.code;
	console.log("appid:"+appid,"secret:"+secret,"code:"+code);
	let url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${code}&grant_type=authorization_code`
    request(url, async function (error, response, body) {
    	let body2 = JSON.parse(body);
	 	let session_key = body2.session_key;
	  	let openid = body2.openid;
	  	console.log(session_key,openid);
	  	console.log('error:', error); // Print the error if one occurred
	  	console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
	  	console.log('body:', body); 
	  //
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
	// query the db for the given username
	if(!user) return fn(new Error('cannot find user'));
	// apply the same algorithm to the POSTed password, applying
	// the hash against the pass / salt, if there is a match we
	// found the user
	hash({
		password: pass,
		salt: user.salt
	}, function(err, pass, salt, hash) {
		if(err) return fn(err);
		if(hash === user.hash) return fn(null, user)
		fn(new Error('invalid password'));
	});
}
//注册
router.post('/register', function(req, res, next) {
	console.log(req.body);
	let name = req.body.username;
	let pwd = req.body.password;
	userDao.addAUserWithNamAndPwd(name, pwd).then(() => {
		res.redirect('back');
	});

});
//增
router.get('/addAUser', function(req, res, next) {
	userDao.addAUser(req, res, next);
});

//删
router.get('/goodDel', function(req, res, next) {
	userDao.gooddelete(req, res, next);
});
//改
router.get('/goodUpdate', function(req, res, next) {
	userDao.goodupdate(req, res, next);
});
//查
router.get('/goodAll', function(req, res, next) {
	userDao.goodAll(req, res, next);
});
router.get('/goodById', function(req, res, next) {
	userDao.goodById(req, res, next);
});

module.exports = router;