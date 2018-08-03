var express = require('express');
var router = express.Router();
var path = require('path');
var hash = require('pbkdf2-password')();
var bodyParser = require('body-parser');
var request = require('request');

var rentGoodDao = require('../dao/rentGoodDao.js');
var userDao = require('../dao/userDao.js');

/* 上传商品信息 */
router.post('/rentgood/add', async function(req, res, next) {
	console.log(req.body);
	let obj = req.body.obj;
	obj.userId = req.body.userId;
	let result = await rentGoodDao.addRentGood(obj);
	res.jsonp({
	  status: 200,
	  message: "ok",
	  data: {
	   	goods:result
//	   	message: "发布成功",
	  }
	});
});

/*商品列表*/
router.get('/rentgoods/get', async function(req, res, next) {
	let list = await rentGoodDao.getRentGoodsOrderByTime(req.query);
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

/*商品列表 按类别*/
router.get('/rentgoods/getByCategory', async function(req, res, next) {
	let list = await rentGoodDao.getRentGoodsByCategoryOrderByTime(req.query);

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

/*获得商品详情*/
router.get('/rentgood/get', async function(req, res, next) {
	let id = req.query.id;
	//更新阅览数
	let viewNum = (await rentGoodDao.getViewNum(id))[0].view;
	rentGoodDao.updateView(id, ++viewNum );
	//得到详情
	let result = (await rentGoodDao.getrentGood(id))[0];
	//是否点过赞
	let result2 = await rentGoodDao.isZanExist(result.id, result.user_id);
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
router.post('/rentgood/zan', async function(req, res, next) {
	//更新赞数量
	let zanNum = (await rentGoodDao.getZanNum(req.body.rentgoodId))[0].zan;
	await rentGoodDao.updateZan(req.body.rentgoodId, ++zanNum );
	//
	await rentGoodDao.addZan(req.body);
	let result2 = await rentGoodDao.isZanExist(req.body.rentgoodId,req.body.userId);
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
router.post('/rentgood/comment/add', async function(req, res, next) {
	await rentGoodDao.addComment(req.body);
	let result = (await rentGoodDao.getLatestComment(req.body.rentgoodId))[0];
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
router.get('/rentgood/comment/get', async function(req, res, next) {
	let list = await rentGoodDao.getComments(req.query);
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