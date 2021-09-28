const fs = require('fs');
const AWS = require('aws-sdk');

// Enter copied or downloaded access ID and secret key here
const ID = 'AKIA5V6A6VX5ZKDPQB53';
const SECRET = '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';

// The name of the bucket that you have created
const BUCKET_NAME = 'test-bucket';

const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET
});

const uploadFile = (fileName) => {
    const fileContent = fs.readFileSync(fileName);

    const params = {
        Bucket: '',
        Key: fileName,
        Body: fileContent
    };

    s3.upload(params, function (err, data) {
        if( err ) {
            throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
    })
}

module.exports = uploadFile;