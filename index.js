var XLSX = require('xlsx');
var URL = require('url');
var request = require('request');
var micro = require('micro');

var fs = require("fs");
var HTML = fs.readFileSync("index.html");

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
		if(N < 0) {
			switch(url.query.t || "csv") {
				case "json": return micro.send(res, 200, JSON.stringify(wb.SheetNames.join("\n")));
				default: return micro.send(res, 200, wb.SheetNames.join("\n"));
			}
		}
		if(N >= wb.SheetNames.length) return micro.send(res, 500, "Cannot find sheet " + N);
		var ws = wb.Sheets[wb.SheetNames[N]];
		switch(url.query.t) {
			case "json": return micro.send(res, 200, JSON.stringify(XLSX.utils.sheet_to_json(ws, {header:1, raw:true})));
			case "html": return XLSX.stream.to_html(ws).pipe(res);
			default: XLSX.stream.to_csv(ws).pipe(res);
		}
	});
}

module.exports = function(req, res) {
	var url = URL.parse(req.url, true);
	if(url.pathname == "/") {
		res.writeHead(200, {
			'Content-Type': 'text/html; charset=UTF-8'
		});
		res.end(HTML);
		return;
	}
	res.setHeader('Access-Control-Allow-Origin', '*');
	var mode = -1;
	if(url.query.url) mode = 0;
	if(mode == -1) { micro.send(res, 500, "Must issue command"); return; }
	switch(mode) {
		case 0: do_url(req, url, res); break;
	}
};
