import multer from 'multer';
// Define the storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define the destination directory where uploaded files will be stored
    cb(null, 'uploads'); // 'uploads' should be a directory in your project
  },
  filename: function (req, file, cb) {
    // Define how uploaded files should be named
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

export default upload