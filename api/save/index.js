const URL = require('url'), fs = require('fs');
const do_wb = require('../../src/util');
const formidable = require('formidable-serverless');
const tmp = require('tmp');
const AWS = require('aws-sdk');

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
    
    // const writeFile = (filename, file) => {    
    //     fs.writeFile(filename, file, (err) => {
    //         if (err) return res.status(500).send(err.message || err);
    //         res.status(201).send(filename);
    //     });
    // }
    
    //upload file to s3 bucket
    const uploadFile = (filename, file) =>   {
        filename = filename.split("/");
        filename = filename[filename.length-1]
        const params = {
            Bucket: "sheetaki-test",
            Key: filename,
            Body: file
        };
        s3.putObject(params, function (err, data) {
            if (err) return res.status(500).send(err.message || err);
            res.status(201).send(filename);
        });
    };
    //
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
       
        fs.readFile(file.path, (err, body) => {
            if (err) return res.status(500).send(err.message || err);
            const tmpFile = newFile();
            uploadFile(tmpFile, body);
            //writeFile(tmpFile, body);
        });
    });
};