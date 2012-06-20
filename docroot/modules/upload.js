module.exports = function(request, response) {
	var fs = require('fs');
	if (request.method.toLowerCase() == 'post') {
		var formidable = require('formidable');
		var form = new formidable.IncomingForm();
		form.parse(request, function(err, fields, files) {
			fs.readFile(files.file.path, 'utf8', function (error, file) {
				if (error) {
					response.writeHead(500, {"Content-Type": "text/plain"});
					console.log(error);
				} else if (!file) {
					response.writeHead(302, {'Location': '/upload'});
				} else {
					response.writeHead(200, {'Content-type': 'text/plain; charset=utf-8'});
					response.write(file);
				}
				response.end();
			});
		});
	} else {
		fs.readFile(__dirname + '/views/upload.html', 'utf8', function (error, html) {
			if (error) {
				response.writeHead(500, {"Content-Type": "text/plain"});
				console.log(error);
			} else {
				response.writeHead(200, {'Content-type': 'text/html; charset=utf-8'});
				response.write(html);
			}
			response.end();
		});
	}
}