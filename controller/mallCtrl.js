var express = require('express');
var router = express.Router();
var path = require('path');

/*文件上传*/
var multer  = require('multer')
//var upload = multer({ dest: 'uploads/' })
var storage = multer.diskStorage({
    //设置上传后文件路径，uploads文件夹会自动创建。
    destination: function (req, file, cb) {
        cb(null, './public/uploads')
    }, 
    //给上传文件重命名，获取添加后缀名
    filename: function (req, file, cb) {
        var fileFormat = (file.originalname).split(".");
        cb(null, file.fieldname + '_' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
 });  
//添加配置文件到muler对象。
var upload = multer({
    storage: storage
});

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
router.get('/goods_mgt/goods', async function(req, res, next) {
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
router.post('/upload/img', upload.single('img'), function(req, res, next) {
	//上传限制
	console.log("111--------------");
	console.log(req.file);
	console.log(req.body);
	console.log("222--------------");
	res.jsonp({
	  status: 200,
	  message: "图片",
	  data: {
	  	path: req.file.path
	  }
	});
});
module.exports = router;

