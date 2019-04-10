const fs = require('fs');
const zlib = require('zlib');
const stream = require('stream');

const fileIn = fs.createReadStream(__filename,{highWaterMark:100});
const gzip = zlib.createGzip();
const fileOut = fs.createWriteStream(__filename + '.gz');


// fileIn.pipe(fileOut);

// fileIn
// 	.on('error', cleanup)
// 	.pipe(gzip)
// 	.on('error',cleanup)
// 	.pipe(fileOut)
// 	.on('error', cleanup);

// fileIn
// 	.pipe(gzip)
// 	.pipe(fileOut);


stream.pipeline(
	fileIn,
	gzip,
	fileOut,
	err => {
		if(err){
			cleanup();
		} else {
			console.log(1);
		}
	}
);

