var express = require('express');
var router = express.Router();
var path = require('path');
var hash = require('pbkdf2-password')();
var bodyParser = require('body-parser');
var request = require('request');

var essayDao = require('../dao/essayDao.js');
var userDao = require('../dao/userDao.js');

//发表文章
router.post('/add', async function(req, res, next) {
	console.log(req.body);
	let obj = req.body.obj;
	obj.userId = req.body.userId;
	let result = await essayDao.addEssay(obj);
	res.jsonp({
		  status: 200,
		  message: "ok",
		  data: {
		   	message: "发布成功",
		  }
	});
});

//获得帖子
router.get('/essays/get', async function(req, res, next) {
	console.log(req.query);
	let list = await essayDao.getEssays(req.query);
	if(list.length >= req.query.size){
		res.jsonp({
			status: 200,
			message: "ok",
			data: {
				list,
				hasMore: 1
			}
		});
	}else{
		res.jsonp({
			status: 200,
			message: "ok",
			data: {
				list,
				hasMore: 0
			}
		});
	}
	
});

//
router.get('/get', async function(req, res, next) {
	let id = req.query.id;
	let viewNum = (await essayDao.getViewNum(id))[0].view;
	essayDao.updateView(id, ++viewNum );
	let result = (await essayDao.getEssay(id))[0];
	let result2 = await essayDao.isZanExist(result.id, result.creater_id);
	if( result2.length > 0){
		result.is_zan = true;
	}else{
		result.is_zan = false;
	}
	res.jsonp({
		  status: 200,
		  message: "ok",
		  data: {
		   	result
		  }
	});
});
//点赞
router.post('/zan', async function(req, res, next) {
	//更新赞数量
	let zanNum = (await essayDao.getZanNum(req.body.essayId))[0].zan;
	await essayDao.updateZan(req.body.essayId, ++zanNum );
	//
	await essayDao.addZan(req.body);
	let result2 = await essayDao.isZanExist(req.body.essayId,req.body.userId);
	if( result2.length > 0){
		res.jsonp({
			status: 200,
			message: "已点过赞",
		});
	}else{
		res.jsonp({
			status: 200,
			message: "点赞成功",
		});
	}
	
});


//发表评论
router.post('/comment/add', async function(req, res, next) {
	await essayDao.addComment(req.body);
	let result = (await essayDao.getLatestComment(req.body.essayId))[0];
	console.log(result);
	res.jsonp({
		  status: 200,
		  message: "ok",
		  data: {
		   	result
		  }
	});
});
//获得评论
router.get('/comment/get', async function(req, res, next) {
	let list = await essayDao.getComments(req.query);
//	res.jsonp({
//		  status: 200,
//		  message: "ok",
//		  data: {
//		   	list
//		  }
//	});
	if(list.length >= req.query.size){
		res.jsonp({
			status: 200,
			message: "ok",
			data: {
				list,
				hasMore: 1
			}
		});
	}else{
		res.jsonp({
			status: 200,
			message: "ok",
			data: {
				list,
				hasMore: 0
			}
		});
	}
});




module.exports = router;