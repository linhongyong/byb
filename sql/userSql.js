var sql={
	//增
	insertWithNamAndPwd:'INSERT INTO `tt_user` (`id`,`name`,`password`) VALUES(null,?,?)',
	insertWithWxUserInfo:'INSERT INTO `tt_user` (`id`,`nickName`,`gender`,`language`,`city`,`province`,`country`,`avatarUrl`) VALUES(null,?,?,?,?,?,?,?)',
	//删
	delete: 'delete from `tt_user` where id=?',
	//改
	update:'UPDATE `tt_user` SET `name`=?,`name`=?,`tel`=?,`password`=? WHERE `id`=?',
	
    //查
    getAll: 'select * from tt_user',
    
    getUserById: 'select * from tt_user where id=?',
    
    getUserByUserName: 'select * from `tt_user` where `name`=?'
}

module.exports=sql;