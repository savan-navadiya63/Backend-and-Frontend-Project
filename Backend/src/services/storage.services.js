const {ImageKit } = require('@imagekit/nodejs');

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});


async function uploadFile(buffer) {

  console.log(buffer); 

  const  result = await imagekit.files.upload({

    file: buffer.toString('base64'), // Buffer of the file to be uploaded
    fileName: 'image.jpg', // Name of the file to be uploaded
  
  });
  return result; // Return the URL of the uploaded file
}

module.exports = uploadFile;  