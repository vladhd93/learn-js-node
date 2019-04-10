const stream = require('stream');
const fs = require('fs');
const os = require('os');


class LinesSplitStream extends stream.Transform {
	_transform(){}
}

class LineNumberStream extends stream.Transform {
	
	constructor(options){
		super(options);
		this.isFileBegins = true;
		this.line = 1;
		this.eolRegex = new RegExp(os.EOL,'g');
	}
	
	_transform(chunk, encoding, callback){
		let str = chunk.toString('utf-8');
		
		if(this.isFileBegins) {
			str = `${this.line++}. ${str}`;
			this.isFileBegins = false;
		}
		
		let pieces = str.split(os.EOL);
		
		if(pieces.length === 0){
			return callback(null,Buffer.from(str));
		}
		
		let newStr = pieces.reduce((_newStr,piece,i)=>{
			if(i === 0){
				_newStr = piece;
			} else {
				_newStr = `${_newStr}${os.EOL}${this.line++}. ${piece}`;
			}
			
			return _newStr;
			
		},'');
		
		callback(null,Buffer.from(newStr));
	}
}

const s = fs.createReadStream(__filename,{
	encoding: 'utf-8',
	highWaterMark: 10,
});

const o = fs.createWriteStream(`${__filename}.out`);
s
	.pipe(new LineNumberStream())
	.pipe(o)
	.on('end', ()=>{
		console.log('end');
	})
;
	