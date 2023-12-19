const multer = require("multer");
const path = require("path");

const tempDir = path.resolve("tmp");

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    const { originalname } = file;
    const userId = req.user._id;
    const filename = `${userId}_${originalname}`;
    cb(null, filename);
  },
});

const upload = multer({
  storage: multerConfig,
});

module.exports = upload;
