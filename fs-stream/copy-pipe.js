const fs = require('fs');

const fileIn = fs.createReadStream(__filename,{highWaterMark:100});
const fileOut = fs.createWriteStream(__filename + ".out", {
	highWaterMark: 100,
});

fileIn.on('data',(data)=>{
	console.log(fileOut.write(data));
});

fileIn.on('end', ()=>{
	fileOut.end();
});

function handler(req,res) {
	const fileIn = fs.createReadStream(__filename,{highWaterMark:100});
	
	fileIn.pipe(res);
}
