
var query=require('./util/query.js');
var insert=require('./util/insert.js');

module.exports = {

	addSellGood: async function (obj) {
		return await insert("tt_mall_sellgood", obj);
	},
	
	/*获得文章详情*/
	getsellGood: async function (id) {
		let sqlStr ="select *, tb1.id 'id',tb1.name 'name' from tt_mall_sellgood tb1, tt_user u where tb1.id = ? and  tb1.user_id = u.id;";
		return await query(sqlStr, [id]);
	},
	
	/*获得商品信息 时间倒序*/
	getSellGoodsOrderByTime: async function (obj) {
		let page = (obj.page - 0) || 1;
		let size = (obj.size - 0) || 10;
		let sqlStr ="select * from tt_mall_sellgood order by create_time desc limit ?, ?;";
		return await query(sqlStr, [(page-1)*size, size]);
		return result;
	},
	getSellGoodsByCategoryOrderByTime: async function (obj) {
		let page = (obj.page - 0) || 1;
		let size = (obj.size - 0) || 10;
		let sqlStr ="select * from tt_mall_sellgood where category_id = ? order by create_time desc limit ?, ?;";
		return await query(sqlStr, [obj.id, (page-1)*size, size]);
		return result;
	},
	
	
	
	
/*赞*/
	addZan: async function (obj) {
		return await insert("tt_mall_sellgood_zan", obj);
	},
	getZanNum: async function (id) {
		let sqlStr ="select zan from tt_mall_sellgood where id = ?";
		return await query(sqlStr, id);
	},	
	updateZan: async function (id, zan) {
		let sqlStr ="update tt_mall_sellgood set zan = ? where id = ?;";
		return await query(sqlStr, [zan, id]);
	},
	isZanExist: async function (id, userId) {
		let sqlStr ="select * from tt_mall_sellgood_zan where sellgood_id = ? and user_id = ?";
		return await query(sqlStr, [id, userId]);
	},
	
/*浏览数*/
	updateView: async function (id, view) {
		let sqlStr ="update tt_mall_sellgood set view = ? where id = ?;";
		return await query(sqlStr, [view, id]);
	},
	getViewNum: async function (id) {
		let sqlStr ="select view from tt_mall_sellgood where id = ?";
		return await query(sqlStr, id);
	},
	
//	updateCai: async function (id, cai) {
//		let sqlStr ="update tt_funny_joke set cai = ? where id = ?;";
//		return await query(sqlStr, [cai, id]);
//	},
//	updateView: async function (id, view) {
//		let sqlStr ="update tt_funny_joke set view = ? where id = ?;";
//		return await query(sqlStr, [view, id]);
//	},
		
/*评论*/
	addComment: async function (obj) {
		return await insert("tt_mall_sellgood_comment", obj);
	},
	
	
	getComments: async function (obj) {
		let page = (obj.page - 0) || 1;
		let size = (obj.size - 0) || 10;
		let sqlStr ="select *, c.id 'id' from tt_mall_sellgood_comment c, tt_user u where sellgood_id = ? and  c.user_id = u.id order by create_time desc  limit ?, ?;";
		return await query(sqlStr, [obj.id, (page-1)*size, size]);
	},
	getLatestComment: async function (id) {
		let sqlStr ="select *, c.id 'id' from tt_mall_sellgood_comment c, tt_user u where sellgood_id = ? and  c.user_id = u.id order by create_time desc  limit 0, 1;";
		return await query(sqlStr, [id]);
	},


};