const URL = require('url');
const do_wb = require('../../src/util');
fs = require('fs');

module.exports = function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const url = URL.parse(req.url, true);
    
    if (!url.query.filename) return res.status(400).send("Must specify filename");
    if (url.query.filename){
        fs.readFile(url.query.filename, (err, body) => {
            if (err) return res.status(500).send(err.message || err);
            do_wb(req, body, url, res);
        });
    }
};