var express = require('express');
var router = express.Router();
var path = require('path');

/*文件上传*/
var multer  = require('multer')



var mallDao = require('../dao/mallDao.js');

/*首页轮播*/
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

/*首页分类*/
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


/**
 * 图片上传到服务器
 */
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
router.post('/upload/img', upload.single('img'), async function(req, res, next) {
	//上传限制
	console.log(req.file);
	console.log(req.body);
	let temp = req.file.path.split("/");
	temp.splice(0,1);
	let path = temp.join("/");
	res.jsonp({
	  status: 200,
	  message: "图片",
	  data: {
	  	path: "http://120.78.179.176:3001/" + path
	  }
	});
	
});
module.exports = router;

