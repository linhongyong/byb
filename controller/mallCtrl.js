var express = require('express');
var router = express.Router();
var path = require('path');

var mallDao = require('../dao/mallDao.js');

/* GET home page. */

router.get('/index/banners', async function(req, res, next) {
	let result = await mallDao.getMallIndexBanners(1);
	res.jsonp({
	  status: 200,
	  message: "ok",
	  data: {
	   	banners:result	
	  }
	});
});


router.get('/index/categorys', async function(req, res, next) {
	let result = await mallDao.getMallCategorysByLevel(1);
	res.jsonp({
	  status: 200,
	  message: "ok",
	  data: {
	   	categorys:result
	  }
	});
});

router.get('/index/goods', async function(req, res, next) {
	let result = await mallDao.getMallAllGoods();
	res.jsonp({
	  status: 200,
	  message: "ok",
	  data: {
	   	goods:result
	  }
	});
});

/* 上传商品信息 */
router.post('/upload/good', async function(req, res, next) {
	let result = await mallDao.getMallAllGoods();
	res.jsonp({
	  status: 200,
	  message: "ok",
	  data: {
	   	goods:result
	  }
	});
});
router.post('/upload/img', async function(req, res, next) {
	console.log("111--------------");
	console.log(req.files);
	console.log(req.body);
	console.log("222--------------");
	res.jsonp({
	  status: 200,
	  message: "图片",
	  data: {
	   
	  }
	});
});
module.exports = router;

