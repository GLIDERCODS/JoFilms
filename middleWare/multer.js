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

// -----------------FOR EVENTS----------------

const storage3 = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, "../Public/event"));
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
});

const eventUpload = multer({ storage: storage3 });
const eventMulter = eventUpload.single("image");

// -----------------FOR GALLERY----------------

const storage4 = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, "../Public/gallery"));
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
});

const galleryUpload = multer({ storage: storage4 });
const galleryMulter = galleryUpload.single("image");

module.exports = {bannerMulter,eventMulter,portfolioMulter,galleryMulter}