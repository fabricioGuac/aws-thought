require("dotenv").config();
// Imports the S3Client and commands from the AWS SDK v3
const {S3Client, CreateBucketCommand} = require("@aws-sdk/client-s3");
const { v4: uuidv4 } = require('uuid');

// Creates an instance of the S3 client
const s3 = new S3Client({
    region: 'us-east-2',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});
console.log(process.env.AWS_ACCESS_KEY_ID);

// Creates parameters for creating the bucket
const bucketParams = {
    Bucket: `user-images${uuidv4()}`,
}

// Calls S3 to create the bucket
const run = async () => {
    try {
        const data = await s3.send(new CreateBucketCommand(bucketParams));
        console.log(`Bucket created successfully` + data); 
    } catch (e) {
        console.log(`Unexpected error ${e}`);
    }
}

run();