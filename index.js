var XLSX = require('xlsx');
var URL = require('url');
var request = require('request');
var micro = require('micro');

function do_url(req, url, res) {
	request(url.query.url, {encoding:null}, function(err, response, body) {
		if(err) return micro.send(res, 500, err);
		switch(response.statusCode) {
			case 200: break;
			case 404: return micro.send(res, 404, "Cannot find " + url.query.url);
			default:  return micro.send(res, 500, "Unrecognized status code " + response.statusCode);
		}
		var wb = XLSX.read(body, {type:'buffer'});
		var N = url.query.N ? parseInt(url.query.N,10) : 0;
		if(N < 0) return micro.send(res, 200, wb.SheetNames.join("\n"));
		if(N >= wb.SheetNames.length) return micro.send(res, 500, "Cannot find sheet " + N);
		XLSX.stream.to_csv(wb.Sheets[wb.SheetNames[N]]).pipe(res);
	});
}

var msg = [
	'request /data?url=<url>&N=<idx> to convert the data at [URL] to CSV',
	'',
	'parameters:',
	'- url=<url>      the url to request',
	'- N=<idx>        the sheet index to use (-1 for sheet list)',
	'',
	'examples: ',
	'- /data/?url=https://obamawhitehouse.archives.gov/sites/default/files/omb/budget/fy2014/assets/receipts.xls',
].join("\n");
module.exports = function(req, res) {
	var url = URL.parse(req.url, true);
	if(url.pathname == "/") return msg;
	var mode = -1;
	if(url.query.url) mode = 0;
	if(mode == -1) return micro.send(res, 500, "Must issue command");
	switch(mode) {
		case 0: return do_url(req, url, res);
	}
};
