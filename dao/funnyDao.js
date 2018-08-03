
var query=require('./util/query.js');
var insert=require('./util/insert.js');
//var select=require('./util/select.js');

module.exports = {
	////增
	
	addAJoke: async function (obj) {
		return await insert("tt_funny_joke", obj);
	},
	
	////改
	
	updateZan: async function (id, zan) {
		let sqlStr ="update tt_funny_joke set zan = ? where id = ?;";
		return await query(sqlStr, [zan, id]);
	},
	updateCai: async function (id, cai) {
		let sqlStr ="update tt_funny_joke set cai = ? where id = ?;";
		return await query(sqlStr, [cai, id]);
	},
	updateView: async function (id, view) {
		let sqlStr ="update tt_funny_joke set view = ? where id = ?;";
		return await query(sqlStr, [view, id]);
	},
	
	////查
	
	getJokes: async function (obj) {
		let page = obj.page || 1;
		let size = obj.size || 10;
		let sqlStr ="select j.*, u.nick_name, u.avatar_url from tt_funny_joke j left outer join tt_user u on j.user_id = u.id limit ?, ?;";
		return await query(sqlStr, [(page-1)*size, size]);
	},
	getZanNum: async function (id) {
		let sqlStr ="select zan from tt_funny_joke where id = ?";
		return await query(sqlStr, id);
	},
	getCaiNum: async function (id) {
		let sqlStr ="select cai from tt_funny_joke where id = ?";
		return await query(sqlStr, id);
	},
	getViewNum: async function (id) {
		let sqlStr ="select view from tt_funny_joke where id = ?";
		return await query(sqlStr, id);
	},
};