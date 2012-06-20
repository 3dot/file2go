module.exports = function(request, response) {
	var file = {
		id : request.params[1]
	};
	response.writeHead(200, {'Content-type': 'text/plain'});
	response.write(JSON.stringify(file));
	response.end();
}