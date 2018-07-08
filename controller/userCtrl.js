var express = require('express');
var router = express.Router();
var path = require('path');
var hash = require('pbkdf2-password')();
var bodyParser = require('body-parser');

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
	let result = await userDao.addUserWithWxUserInfo(req.body.userInfo);
	res.jsonp({
	  status: 200,
	  message: "ok",
	  data: {
	   	message: "成功登录",
	  }
	});
//	let username = req.body.username;
//	let pwd = req.body.password;
//	let user = (await userDao.getUserByUserName(username))[0];
//	//let pass = user[0].password;
//	console.log(user);
//	console.log('user.password  ' + user.password);
//	await new Promise((resolve, reject) => {
//		hash({
//			password: user.password
//		}, function(err, pwd, salt, hash1) {
//			console.log(err, pwd, salt, hash1);
//			if(err) {
//				throw err
//			};
//			user.salt = salt;
//			user.hash = hash1;
//			resolve();
//		});
//	})
//	hash({
//		password: pwd,
//		salt: user.salt
//	}, function(err, pwd, salt, hash) {
//		console.log('2222');
//		console.log(err, pwd, salt, hash);
//		if(err) console.log('err'); //return fn(err);
//		if(hash === user.hash) {
//			console.log('ok'); //return fn(null, user)
//			res.redirect('/index.html');
//		} else {
//			console.log('invalid password'); //fn(new Error('invalid password'));
//		}
//	});
//	if(!user) {
//		console.log('账号无效');
//	}
//	console.log('----------');

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