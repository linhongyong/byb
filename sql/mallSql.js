var sql={
	//查询轮播图
	selectMallIndexBanners:'select * from `tt_mall_banner` where type=?',
	//分类
	selectCategorysByLevel:'select * from `tt_mall_category` where level=?',
	//所有商品
	selectAllGoods:'select * from `tt_mall_good`',
}

module.exports=sql;