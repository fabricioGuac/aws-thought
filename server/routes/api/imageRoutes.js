require('dotenv').config();
const router = require('express').Router();
const multer = require('multer');
const paramsConfig =  require('../../utils/paramsConfig');
const {S3Client, PutObjectCommand} = require('@aws-sdk/client-s3');

// Creates an instance of the S3 client
const s3 = new S3Client({
    region: 'us-east-2',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

const storage = multer.memoryStorage({
    destination: function (req, file, callback) {
        callback(null, '');
    },
});

const upload = multer({ storage }).single('image');


router.post('/upload', upload, async (req, res) => {
    // Check if a file was uploaded
    if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
    }

    const params = paramsConfig(req.file);

    try {
        const data = await s3.send(new PutObjectCommand(params));
        console.log('Upload success:', data);
        res.status(200).json({fileUrl: `https://${params.Bucket}.s3.amazonaws.com/${params.Key}`});
    } catch (err) {
        console.log("An error occured uploading the image ",err);
        res.status(500).json({message: "Error uploading image to the s3 bucket"});
    }

})

module.exports = router;