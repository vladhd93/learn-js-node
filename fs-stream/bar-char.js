const fs = require('fs');

const fileStream = fs.createReadStream('./bad-char.txt',{
	highWaterMark:9,
});
//
//
// fileStream.setEncoding('utf-8');
//
// let content = '';
//
// fileStream.on('data', data =>{
// 	content += data;
// });
//
// fileStream.on('end' , ()=>{
// 	console.log(content);
// });


let dataPieces = [];

fileStream.on('data', buffer =>{
	console.log(buffer);
	dataPieces.push(buffer);
});

fileStream.on('end', ()=>{
	const buffer = Buffer.concat(dataPieces);
	console.log(buffer.toString('utf-8'));
});