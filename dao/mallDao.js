var $sql=require('../sql/mallSql.js');

var query=require('./util/query.js');

module.exports = {
	
	getMallIndexBanners: async function (type) {
		let result = await query($sql.selectMallIndexBanners, [type]);
		return result;
	},
	getMallCategorysByLevel: async function (level) {
		let result = await query($sql.selectCategorysByLevel, [level]);
		return result;
	},
	getMallAllGoods: async function () {
		let result = await query($sql.selectAllGoods);
		return result;
	},
};