config = require('./config/dev.js');
util = require('util');
var http = require('http');

var server = function(request, response) {
	var url = require('url');
	var urlData = url.parse(request.url);
	var params = urlData.pathname.split('/');
	params.shift();
	console.log(params[0]);
	var script = __dirname + '\\modules\\' + params[0] + '.js';
	request.params = params;
	try {
		require(script)(request, response);
		delete(require.cache[script]);
	} catch (error) {
		console.error(error.message);
		response.writeHead(404, {"Content-Type": "text/plain"});
		response.write('Page not found: ' + urlData.pathname);
		response.end();
	}
}

http.createServer(server).listen(config.port);
console.log("Server has started at port " + config.port);