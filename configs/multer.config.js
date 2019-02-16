const multer = require('multer');
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
  });

const storage = cloudinaryStorage({
  cloudinary,
  folder: 'event-pics',
  allowedFormats: ['jpg', 'png', 'jpeg'],
  filename: (req, file, next) => {
    next(undefined, file.originalname);
  }
})

const upload = multer({
  storage: storage,
  fileFilter: (req, file, next) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/)) {
      next(null, false, new Error('Only image files are allowed!'));
    } else {
      next(null, true);
    }
  }
});

module.exports = upload;