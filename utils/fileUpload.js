const multer = require("multer");

var fileFilter = (req, file, cb) => {
  try {
    if (file.mimetype === "text/csv") {
      cb(null, true);
    } else {
      cb("upload only csv files", false);
    }
  } catch (err) {
    cb(new Error("I don't have a clue!"));
  }
};

let upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

module.exports = upload;
