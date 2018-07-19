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
	//添加商品
	addAGood: async function (obj) {
		let valueArray = [];
		let keyArray = [];
		let placeHolderArray = [];
		for(let p in obj){
			valueArray.push(obj[p]);
			keyArray.push("`"+p+"`");
			placeHolderArray.push('?');
		}
//		valueArray.unshift(null);
		console.log('INSERT INTO `tt_mall_good` (`id`,'+keyArray.join(",")+') VALUES(null,'+placeHolderArray.join(",")+')');
		console.log(valueArray);
		let result = await query('INSERT INTO `tt_mall_good` (`id`,'+keyArray.join(",")+') VALUES(null,'+placeHolderArray.join(",")+')', valueArray);
		return result;
	},
};