const fs = require('fs');
const AWS = require('aws-sdk');
const uuid4 = require('uuid4');
const { BUCKET_NAME, REGION } = require('../reqParams/s3bucket-info');
const springCloudConfigClient = require('cloud-config-client');

const microserviceName = "aws-access-info";
let aws_access_key;
let aws_secret_key;

async function cloudLoad(){
    await springCloudConfigClient.load({
        endpoint: 'https://scc-dev.dataseed.de:443',
        name: microserviceName,
        auth: { user: "root", pass: "s3cr3t"} 
    }).then(load => {
        aws_access_key = load.get("aws_access_key");
        aws_secret_key = load.get("aws_secret_key");
        console.log("Spring Cloud Called.....");
        AWS.config.update({
            accessKeyId: aws_access_key,
            secretAccessKey: aws_secret_key,
            region: REGION
        })
    }).catch(console.error);
}

const uuid = uuid4();
const date = new Date()
const date_dir = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}-${uuid}`;
const upload_pdf_path = `dev/trf3/do-${date_dir}/file/`;
const upload_json_path = `dev/trf3/do-${date_dir}/row/`;
const upload_await = [];

const uploadFile = async (path) => { // Upload PDF files to S3 bucket
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
                return {"date":date_dir, "file":elem.Key};
            })
        }, function(err){
            console.log("Error : ", err);
        }
    )
    return obj;
}

const upload2aws = async (path) => {
    await cloudLoad();
    const s3 = new AWS.S3();

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

    await s3.upload(params, function (err, data) { // Upload JSON file
        if (err) {
            throw err;
            console.log('Error uploading data: ', data);
        } else {
            console.log('succesfully uploaded!!!');
        }
    });
    return obj;
}

module.exports = upload2aws;
