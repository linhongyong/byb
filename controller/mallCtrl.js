var express = require('express');
var router = express.Router();
var path = require('path');

var userDao = require('../dao/userDao.js');

/* GET home page. */

router.get('/index/banners', function(req, res, next) {
	res.jsonp({ banners: 'bannersbannersbanners' });
});


router.get('/index/categorys', function(req, res, next) {
	res.jsonp({ user: 'tobi' });
});

router.get('/index/goods', function(req, res, next) {
	res.jsonp({ user: 'tobi' });
});
module.exports = router;

