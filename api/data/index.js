const URL = require('url');
const do_wb = require('../../src/util');
const request = require('request');

module.exports = function(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	const url = URL.parse(req.url, true);

	/* request url and process */
	if(!url.query.url) return res.status(400).send("Must specify url");
	request(url.query.url, {encoding:null}, function(err, response, body) {
		if(err) return res.status(502).send(err.toString());

		/* response.statusCode is expected to be 200 */
		switch(response.statusCode) {
			case 200: break;
			case 404: return res.status(404).send(`Cannot find ${url.query.url}`);
			default:  return res.status(500).send(`Unrecognized status code ${response.statusCode}`);
		}

		do_wb(req, body, url, res);
	});
};
