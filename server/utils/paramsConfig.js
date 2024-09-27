const { v4: uuidv4 } = require('uuid');


const params = (fileName) => {
    const myFile = fileName.originalname.split('.');
    const fileType = myFile[myFile.length - 1];

    const imageParams = {
        Bucket: 'user-imagesaeb02535-1266-4df5-8e4f-6ab8bda47cc0',
        Key: `${uuidv4()}.${fileType}`,
        Body: fileName.buffer,
    };

    return imageParams;
};

module.exports = params;