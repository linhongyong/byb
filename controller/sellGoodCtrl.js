var express = require('express');
var router = express.Router();
var path = require('path');
var hash = require('pbkdf2-password')();
var bodyParser = require('body-parser');
var request = require('request');

var sellGoodDao = require('../dao/sellGoodDao.js');
var userDao = require('../dao/userDao.js');

/* 上传商品信息 */
router.post('/sellgood/add', async function(req, res, next) {
	console.log(req.body);
	let obj = req.body.obj;
	obj.userId = req.body.userId;
	let result = await sellGoodDao.addSellGood(obj);
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
router.get('/sellgoods/get', async function(req, res, next) {
	let list = await sellGoodDao.getSellGoodsOrderByTime(req.query);
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
/*获得发布的所有商品*/
//router.get('/sellgoods/get/userid', async function(req, res, next) {
//	let list = await sellGoodDao.getSellGoodsOrderByTime(req.query);
//	if(list.length >= req.query.size){
//		res.jsonp({
//			status: 200,
//			message: "ok",
//			data: {
//				list,
//				hasMore: 1
//			}
//		});
//	}else{
//		res.jsonp({
//			status: 200,
//			message: "ok",
//			data: {
//				list,
//				hasMore: 0
//			}
//		});
//	}
//});

/*商品列表 按类别*/
router.get('/sellgoods/getByCategory', async function(req, res, next) {
	let list = await sellGoodDao.getSellGoodsByCategoryOrderByTime(req.query);

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
router.get('/sellgood/get', async function(req, res, next) {
	let id = req.query.id;
	//更新阅览数
	let viewNum = (await sellGoodDao.getViewNum(id))[0].view;
	sellGoodDao.updateView(id, ++viewNum );
	//得到详情
	let result = (await sellGoodDao.getsellGood(id))[0];
	//是否点过赞
	let result2 = await sellGoodDao.isZanExist(result.id, result.user_id);
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
router.post('/sellgood/zan', async function(req, res, next) {
	//更新赞数量
	let zanNum = (await sellGoodDao.getZanNum(req.body.sellgoodId))[0].zan;
	await sellGoodDao.updateZan(req.body.sellgoodId, ++zanNum );
	//
	await sellGoodDao.addZan(req.body);
	let result2 = await sellGoodDao.isZanExist(req.body.sellgoodId,req.body.userId);
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
router.post('/sellgood/comment/add', async function(req, res, next) {
	await sellGoodDao.addComment(req.body);
	let result = (await sellGoodDao.getLatestComment(req.body.sellgoodId))[0];
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
router.get('/sellgood/comment/get', async function(req, res, next) {
	let list = await sellGoodDao.getComments(req.query);
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