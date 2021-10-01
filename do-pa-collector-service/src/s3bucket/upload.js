const fs = require('fs');
const AWS = require('aws-sdk');
const uuid4 = require('uuid4');
const { ID, SECRET, BUCKET_NAME, REGION } = require('../reqParams/s3bucket-info');
const { AmplifyBackend } = require('aws-sdk');
const { HOME_PAGE_URL } = require('../reqParams/urls');

AWS.config.update({
    accessKeyId: ID,
    secretAccessKey: SECRET,
    region: REGION
})

const s3 = new AWS.S3();

const uuid = uuid4();
const date = new Date()
const date_dir = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}-${uuid}`;
const upload_pdf_path = `dev/al/do-${date_dir}/file/`;
const upload_json_path = `dev/al/do-${date_dir}/row/`;
const upload_await = [];

const uploadFile = async (path) => {
    let obj = [];
    fs.readdirSync(path).forEach( (file) => {
        console.log(file);
        const fileContent = fs.readFileSync(`${path}/${file}`);
        const params = {
            Bucket: BUCKET_NAME,
            Key: upload_pdf_path+file,
            Body: fileContent,
        };
    
        var upload = new AWS.S3.ManagedUpload({params});
        var promise = upload.promise();
        upload_await.push(promise);
        
    })
    obj = await Promise.all(upload_await).then(
        function(data){
            console.log(data);
            return data.map((elem, idx) => {
                return {"date":date_dir, "file":elem.key};
            })
        }, function(err){
            console.log("Error : ", err);
        }
    )
    console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
    return obj;
}

const upload_aws = async (path) => {

    const obj = await uploadFile(path);

    console.log("Uploading Json", obj);

    var buf = Buffer.from(JSON.stringify(obj));

    const params = {
        Bucket: BUCKET_NAME,
        Key: `${upload_json_path}/${uuid}.json`,
        Body: buf,
        ContentEncoding: 'base64',
        ContentType: 'application/json',
    };

    await s3.upload(params, function (err, data) {
        if (err) {
            throw err;
            console.log('Error uploading data: ', data);
        } else {
            console.log('succesfully uploaded!!!');
        }
    });
    return obj;
}

module.exports = upload_aws;