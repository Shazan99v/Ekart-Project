import multer from "multer";
import path from "path";
import fs from "fs";

// ✅ Ensure uploads folder exists
const uploadDir = "uploads";

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({

  destination(req, file, cb) {
    cb(null, uploadDir);
  },

  filename(req, file, cb) {
    cb(
      null,
      `${Date.now()}-${file.originalname}`
    );
  }

});


function checkFileType(file, cb) {

  const types = /jpg|jpeg|png|png|webp/;

  const ext = types.test(
    path.extname(file.originalname).toLowerCase()
  );

  const mime = types.test(file.mimetype);

  if (ext && mime) {
    cb(null, true);
  } else {
    cb("Images only!");
  }
}


const upload = multer({

  storage,

  fileFilter(req, file, cb) {
    checkFileType(file, cb);
  },

});

export default upload;
