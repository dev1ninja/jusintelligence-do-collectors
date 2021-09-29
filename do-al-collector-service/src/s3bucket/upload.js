const fs = require('fs');
const AWS = require('aws-sdk');
const uuid4 = require('uuid4');
const { ID, SECRET, BUCKET_NAME, REGION } = require('../reqParams/s3bucket-info');

const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET
});

const uuid = uuid4();
const date = new Date();
const date_dir = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}-${uuid}`;
const upload_pdf_path = `dev/ma/do-${date_dir}/file`;
const upload_json_path = `dev/ma/do-${date_dir}/row`;
let obj = []

async const uploadFile = (path) => {
    fs.readdirSync(path).forEach(file => {
        console.log(file);
        const fileContent = fs.readFileSync(`${path}/${file}`);
        const params = {
            Bucket: BUCKET_NAME,
            Key: `${upload_pdf_path}/${file}`,
            Body: fileContent,
        };
    
        await s3.upload(params, function (err, data) {
            if( err ) {
                throw err;
            }
            obj.push({"date":date_dir, "file":upload_pdf_path})
            console.log("OBject", {"date":date_dir, "file":upload_pdf_path});
            console.log(`File uploaded successfully. ${data.Location}`);
        })
    });
    console.log("OBject", obj)
}

async const upload_json = () => {
                               
    var buf = Buffer.from(JSON.stringify(obj));

    var data = {
        Bucket: BUCKET_NAME,
        Key: `${upload_json_path}/${uuid}.json`,
        Body: buf,
        ContentEncoding: 'base64',
        ContentType: 'application/json',
    };

    await s3.upload(data, function (err, data) {
        if (err) {
            console.log(err);
            console.log('Error uploading data: ', data);
        } else {
            console.log('succesfully uploaded!!!');
        }
    });
}

module.exports = uploadFile;