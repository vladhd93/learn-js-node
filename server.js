const http = require('http');
const {handleRequest} = require('./handler');
const server = new http.Server();

server.on('request',handleRequest);

const emit = server.emit;
server.emit = (...args) => {
	console.log([args[0]]);
	return emit.apply(server,args);
};

server.listen(8000);