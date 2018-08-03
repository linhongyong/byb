var query=require('./query.js');

let insert = async function( tablName, obj ) {
  	let valueArray = [];
	let keyArray = [];
	let placeHolderArray = [];
	for(let p in obj){
		valueArray.push(obj[p]);
		let tempP = p.replace(/([A-Z])/g,"_$1").toLowerCase();
		keyArray.push("`"+tempP+"`");
		placeHolderArray.push('?');
	}
	console.log('INSERT INTO '+tablName+' (`id`,'+keyArray.join(",")+') VALUES(null,'+placeHolderArray.join(",")+')');
	let result = await query('INSERT INTO '+tablName+' (`id`,'+keyArray.join(",")+') VALUES(null,'+placeHolderArray.join(",")+')', valueArray);
	return result; 
}

module.exports =  insert