const URL = require('url'), fs = require('fs');
const do_wb = require('../../src/util');
const formidable = require('formidable-serverless');
const tmp = require('tmp');
const AWS = require('aws-sdk');
const { uploadFile } = require('../s3');

module.exports = function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const url = URL.parse(req.url, true);
    // const s3 = new AWS.S3({ endpoint: 'http://localhost:4566', s3ForcePathStyle: true });
    const s3 = new AWS.S3();

    /* parse form data */
    const form = formidable({ multiples: true, maxFileSize: 2 * 1024 * 1024 });

    /*create temp file*/
    const newFile = () => {
        const tmpobj = tmp.fileSync({postfix: '.xlsx'});
        return tmpobj.name;
    }
    
    form.parse(req, (err, fields, files) => {
        if (err) return res.status(400).send(err.message || err);
        if (!url.query) url.query = fields;
        ["N", "t"].forEach(k => { if (!url.query[k] && fields[k] != null) url.query[k] = fields[k]; });
        
        /* look for first uploaded file entry */
        if (!files) return res.status(400).send("Missing file");
        const fentries = Object.entries(files);
        if (fentries.length == 0) return res.status(400).send("Missing file");

        /* read file */
        const file = fentries[0][1]; 
       
        fs.readFile(file.path, async (err, body) => {
            if (err) return res.status(500).send(err.message || err);
            const tmpFile = newFile();
            const result = await uploadFile(tmpFile, body);
            console.log(result);
            res.send(result.key);
        });
    });
};