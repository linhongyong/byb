
var query=require('./util/query.js');
var insert=require('./util/insert.js');

module.exports = {
	////增
	addEssay: async function (obj) {
		return await insert("tt_essay", obj);
	},
	addZan: async function (obj) {
		return await insert("tt_essay_zan", obj);
	},
	
	////改
//	
	updateZan: async function (id, zan) {
		let sqlStr ="update tt_essay set zan = ? where id = ?;";
		return await query(sqlStr, [zan, id]);
	},
//	updateCai: async function (id, cai) {
//		let sqlStr ="update tt_funny_joke set cai = ? where id = ?;";
//		return await query(sqlStr, [cai, id]);
//	},
//	updateView: async function (id, view) {
//		let sqlStr ="update tt_funny_joke set view = ? where id = ?;";
//		return await query(sqlStr, [view, id]);
//	},
	updateView: async function (id, view) {
		let sqlStr ="update tt_essay set view = ? where id = ?;";
		return await query(sqlStr, [view, id]);
	},
	////查
	//是否有点赞记录
	isZanExist: async function (essayId, userId) {
		let sqlStr ="select * from tt_essay_zan where essay_id = ? and user_id = ?";
		return await query(sqlStr, [essayId, userId]);
	},
	
	/**
	 * 获得点赞数量
	 */
	getZanNum: async function (id) {
		let sqlStr ="select zan from tt_essay where id = ?";
		return await query(sqlStr, id);
	},
	/**
	 * 获得所有文章列表 发布时间倒序
	 */
	getEssays: async function (obj) {
		let page = (obj.page - 0) || 1;
		let size = (obj.size - 0) || 10;
		let sqlStr ="select * from tt_essay order by create_time desc limit ?, ?;";
		return await query(sqlStr, [(page-1)*size, size]);
	},
	getEssaysByType: async function (obj) {
		let type = obj.type;
		let page = (obj.page - 0) || 1;
		let size = (obj.size - 0) || 10;
		let sqlStr ="select * from tt_essay where type = ? order by create_time desc limit ?, ?;";
		return await query(sqlStr, [type, (page-1)*size, size]);
	},
	getEssaysByUserId: async function (obj) {
		let userId = obj.userId - 0;
		let page = (obj.page - 0) || 1;
		let size = (obj.size - 0) || 10;
		let sqlStr ="select * from tt_essay where user_id = ? order by create_time desc limit ?, ?;";
		return await query(sqlStr, [userId, (page-1)*size, size]);
	},
	/**
	 * 获得文章详情
	 */
	getEssay: async function (id) {
		let sqlStr ="select *, e.id 'id' from tt_essay e, tt_user u where e.id = ? and  e.user_id = u.id;";
		return await query(sqlStr, [id]);
	},
	
	getViewNum: async function (id) {
		let sqlStr ="select view from tt_essay where id = ?";
		return await query(sqlStr, id);
	},
	
	
	
	//********************评论
	addComment: async function (obj) {
		return await insert("tt_essay_comment", obj);
	},
	
	
	getComments: async function (obj) {
//		let essayId = obj.essayId;
		let page = (obj.page - 0) || 1;
		let size = (obj.size - 0) || 10;
		let sqlStr ="select *, c.id 'id' from tt_essay_comment c, tt_user u where essay_id = ? and  c.user_id = u.id order by create_time desc  limit ?, ?;";
		return await query(sqlStr, [obj.id, (page-1)*size, size]);
	},
	getLayer2Comments: async function(id){
		let sqlStr ="select * from tt_essay_comment_layer2 where comment_id = ?;";
		return await query(sqlStr, [id]);
	},
	getLatestComment: async function (id) {
		let sqlStr ="select *, c.id 'id' from tt_essay_comment c, tt_user u where essay_id = ? and  c.user_id = u.id order by create_time desc  limit 0, 1;";
		return await query(sqlStr, [id]);
	},
//	getCaiNum: async function (id) {
//		let sqlStr ="select cai from tt_funny_joke where id = ?";
//		return await query(sqlStr, id);
//	},
//	getViewNum: async function (id) {
//		let sqlStr ="select view from tt_funny_joke where id = ?";
//		return await query(sqlStr, id);
//	},
};