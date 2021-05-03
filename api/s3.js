require('dotenv').config();
const S3 = require('aws-sdk/clients/s3');
const do_wb = require('../src/util');

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const secretAccessKey = process.env.AWS_SECRET_KEY
const accessKeyId = process.env.AWS_ACCESS_KEY

const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey
})

function uploadFile(filename, file){
    filename = filename.split("/");
    filename = filename[filename.length - 1]
    const uploadParams = {
        Bucket: bucketName,
        Key: filename,
        Body: file
    };
    return s3.upload(uploadParams).promise()
}
exports.uploadFile = uploadFile;

function getFile(req, res, url, filename){
    const params = {
        Key: filename,
        Bucket: bucketName,
    }
    s3.getObject(params, function (err, data) {
        if (err) return res.status(500).send(err.message || err);
        do_wb(req, data.Body, url, res);
    });
}
exports.getFile = getFile;