const URL = require('url'), fs = require('fs');
const do_wb = require('../../src/util');
const formidable = require('formidable-serverless');

module.exports = function(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	const url = URL.parse(req.url, true);

	/* parse form data */
	const form = formidable({multiples: true, maxFileSize: 2*1024*1024});
	form.parse(req, (err, fields, files) => {
		if(err) return res.status(400).send(err.message || err);
		if(!url.query) url.query = fields;
		["N", "t"].forEach(k => { if(!url.query[k] && fields[k] != null) url.query[k] = fields[k]; });

		/* look for first uploaded file entry */
		if(!files) return res.status(400).send("Missing file");
		const fentries = Object.entries(files);
		if(fentries.length == 0) return res.status(400).send("Missing file");

		/* read file */
		const file = fentries[0][1];
		fs.readFile(file.path, (err, body) => {
			if(err) return res.status(500).send(err.message || err);
			do_wb(req, body, url, res);
		});
	});
};
