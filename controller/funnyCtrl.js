var express = require('express');
var router = express.Router();
var path = require('path');
var hash = require('pbkdf2-password')();
var bodyParser = require('body-parser');
var request = require('request');

var funnyDao = require('../dao/funnyDao.js');

Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, 
        "d+": this.getDate(), 
        "H+": this.getHours(),  
        "m+": this.getMinutes(),  
        "s+": this.getSeconds(), 
        "q+": Math.floor((this.getMonth() + 3) / 3), 
        "S": this.getMilliseconds()  
    };
    var year = this.getFullYear();
    var yearstr = year + '';
    yearstr = yearstr.length >= 4 ? yearstr : '0000'.substr(0, 4 - yearstr.length) + yearstr;
    
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (yearstr + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

router.post('/joke/add', async function(req, res, next) {
	let joke = req.body;
	joke.createTime = (new Date()).Format("yyyy-MM-dd HH:mm:ss");
	let result = await funnyDao.addAJoke(joke);
	console.log(result);
	res.jsonp({
		  status: 200,
		  message: "ok",
		  data: {
		   	message: "添加成功",
		  }
	});
});
router.get('/joke/jokes', async function(req, res, next) {
	let result = await funnyDao.getJokes({});
	if(result.length == (req.body.size || 10)){
		res.jsonp({
			status: 200,
			message: "ok",
			data: {
				list : result,
				hasMore : true
			}
		});
	}else{
		res.jsonp({
			status: 200,
			message: "ok",
			data: {
				list : result,
				hasMore : false
			}
		});
	}
});
router.post('/joke/zan', async function(req, res, next) {
	let zanNum = (await funnyDao.getZanNum(req.body.id))[0].zan;
	console.log("zanNum",zanNum);
	await funnyDao.updateZan(req.body.id, ++zanNum );
	res.jsonp({
		status: 200,
		message: "ok",
	});
});

router.post('/joke/cai', async function(req, res, next) {
	let caiNum = (await funnyDao.getCaiNum(req.body.id))[0].cai;
	await funnyDao.updateCai(req.body.id, ++caiNum );
	res.jsonp({
		status: 200,
		message: "ok",
	});
});
router.post('/joke/view', async function(req, res, next) {
	let viewNum = (await funnyDao.getViewNum(req.body.id))[0].view;
	await funnyDao.updateView(req.body.id, ++viewNum );
	res.jsonp({
		status: 200,
		message: "ok",
	});
});

module.exports = router;