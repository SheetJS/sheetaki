const XLSX = require('xlsx');
const URL = require('url');
const request = require('request');

const do_url = (req, url, res) => {
	request(url.query.url, {encoding:null}, function(err, response, body) {
		if(err) return res.status(500).send(err.toString());
		switch(response.statusCode) {
			case 200: break;
			case 404: return res.status(404).send(`Cannot find ${url.query.url}`);
			default:  return res.status(500).send(`Unrecognized status code ${response.statusCode}`);
		}
		const wb = XLSX.read(body, {type:'buffer'});
		const N = url.query.N ? parseInt(url.query.N,10) : 0;
		if(N < 0) {
			switch(url.query.t || "csv") {
				case "json": return res.status(200).send(JSON.stringify(wb.SheetNames.join("\n")));
				default: return res.status(200).send(wb.SheetNames.join("\n"));
			}
		}
		if(N >= wb.SheetNames.length) return res.status(500).send(`Cannot find sheet ${N}`);
		var ws = wb.Sheets[wb.SheetNames[N]];
		switch(url.query.t) {
			case "json": return res.status(200).json(XLSX.utils.sheet_to_json(ws, {header:1, raw:true}));
			case "html": return XLSX.stream.to_html(ws).pipe(res);
			default: XLSX.stream.to_csv(ws).pipe(res);
		}
	});
};

module.exports = function(req, res) {
	var url = URL.parse(req.url, true);
	res.setHeader('Access-Control-Allow-Origin', '*');
	if(!url.query.url) return res.status(500).send("Must issue command");
	do_url(req, url, res);
};
