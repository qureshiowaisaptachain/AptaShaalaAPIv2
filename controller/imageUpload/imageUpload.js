const asyncHandler = require('../../middleware/asynHandler');
const {uploadImageToStorage}=require("./storage");

exports.uploadImage = asyncHandler(async (req, res, next) => {
  const uploadedFile = req.file;
  const imageBuffer = uploadedFile.buffer
  const filename = uploadedFile.originalname;

  const url = await uploadImageToStorage(imageBuffer, filename);

 
  res.json({ message: 'File uploaded successfully',url});

});
