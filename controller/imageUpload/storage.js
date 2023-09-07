const { Storage } = require('@google-cloud/storage');

const storage = new Storage({
  keyFilename: `${__dirname}/ServiceAccount.json`,
});
console.log(__dirname);
const bucketName = process.env.GoogleBucketName;

async function uploadImageToStorage(imageBuffer, filename) {
  const bucket = storage.bucket(bucketName);
  const file = bucket.file(filename);

  try {
    await file.save(imageBuffer, {
      metadata: {
        contentType: 'image/jpeg',
      },
    });
    return `https://storage.googleapis.com/${bucketName}/${filename}`;
  } catch (error) {
    console.error('Error uploading image to storage:', error);
    throw error;
  }
}
module.exports = { uploadImageToStorage };
