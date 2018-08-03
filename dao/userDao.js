//实现与mysql交互
//var mysql=require('mysql');
//var $conf=require('../conf/db.js');
//var $util=require('../util/util.js');
var $sql=require('../sql/userSql.js');
var insert=require('./util/insert.js');
////使用连接池
//var pool  = mysql.createPool($util.extend({}, $conf.mysql));
//
//// 向前台返回JSON方法的简单封装
//var jsonWrite = function (res, ret) {
//	if(typeof ret === 'undefined') {
//		res.json({
//			code:'1',
//			msg: '操作失败'
//		});
//	} else {
//		res.json(ret);
//	}
//};

var query=require('./util/query.js');

module.exports = {
	//增加用户
	addAUserWithNamAndPwd: async function (name,pwd) {
		let result = await query($sql.insertWithNamAndPwd, [name, nickName]);
		return result;
	},
	
	addHitCardLog: async function (obj) {
		let result = await insert("tt_hitcard", obj);;
		return result;
	},
	getHitCardLog: async function () {
		let sqlStr = 'select * from tt_hitcard'
		let result = await query(sqlStr);
		return result;
	},
	//增加用户
	addAUserWithNamAndPwd: async function (name,pwd) {
		let result = await query($sql.insertWithNamAndPwd, [name, nickName]);
		return result;
	},
	
	addUserWithWxUserInfo: async function (wxUserInfo) {
		let result = await insert("tt_user", wxUserInfo);
		//let result = await query($sql.insertWithWxUserInfo, [wxUserInfo.nickName,wxUserInfo.gender,wxUserInfo.language,wxUserInfo.city,wxUserInfo.province,wxUserInfo.country,wxUserInfo.avatarUr,wxUserInfo.openid]);
		return result;
	},
	isOpdenidExist: async function (openid) {
		let result = await query($sql.getWithOpenid, [openid]);
		return result;
	},

    getUserByUserName: async function (un) {
    	let result = await query($sql.getUserByUserName, un);
    	return result;
    },
    
    getChiefInfo: async function (userId) {
    	let sqlStr = 'select nickname, avatar_url from tt_user where id=?'
		let result = await query($sql.getWithOpenid, [userId]);
		return result;
	},
};