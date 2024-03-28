const multer = require("multer");
const path = require("path");

// Multer configuration for handling file uploads
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, "../Public/banner"));
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
});

const bannerUpload = multer({ storage: storage });
const bannerMulter = bannerUpload.single("image");

// -----------------FOR PORTFOLIO----------------

const storage2 = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, "../Public/profile"));
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
});

const profileUpload = multer({ storage: storage2 });
const portfolioMulter = profileUpload.single("image");

module.exports = {bannerMulter,portfolioMulter}