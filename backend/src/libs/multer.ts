import multer from "multer";
import fs from "fs";

const storage = multer.diskStorage({
  destination: function (req: any, _file: any, cb: any) {
    if (!fs.existsSync("./uploads")) {
      fs.mkdirSync("./uploads");
    }
    if (!fs.existsSync("./uploads/tmp")) {
      fs.mkdirSync("./uploads/tmp");
    }
    cb(null, "./uploads/tmp");
  },
  filename: function (_req: any, file: any, cb: any) {
    console.log(file.originalname);
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
});

export default upload;
