const fs = require('fs');

const stream = fs.createReadStream(__filename, {
	highWaterMark: 40,
	encoding: 'utf-8',
});


process.nextTick(()=>{},);

// readable, writable, duplex, transform(similar to duplex)

// режимы стримов  paused | flowing

// stream.pipe(StreamOut);

// ---

//stream.on('readable',()=>{});


let i = 0;

stream.on('data', chunk => {
	i++;
	i++;
	if (i > 3) {
		stream.removeAllListeners('data');
	}
	console.log(chunk);
});

stream.on('end', () => {
	console.log(i);
	console.log('end');
});

stream.on('close',()=>{
	console.log('close');
});


//stream.resume() | stream.pause()


stream.on('readable', ()=>{

});