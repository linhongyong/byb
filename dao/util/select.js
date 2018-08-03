//var query=require('./query.js');
//
//let select = async function( tablName, obj ) {
//	let valueArray = [];
//	let keyArray = [];
//	let placeHolderArray = [];
//	for(let p in obj){
//		valueArray.push(obj[p]);
//		let tempP = p.replace(/([A-Z])/g,"_$1").toLowerCase();
//		keyArray.push("`"+tempP+"`");
//		placeHolderArray.push('?');
//	}
//	console.log();
//	//let result = await query('INSERT INTO '+tablName+' (`id`,'+keyArray.join(",")+') VALUES(null,'+placeHolderArray.join(",")+')', valueArray);
//	
//	let result = await query('select * from '+tablName+' where type=?', valueArray);
//	return result; 
//}
//
//module.exports =  select