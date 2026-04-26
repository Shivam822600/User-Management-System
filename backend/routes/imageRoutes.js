const express = require('express');
const multer = require('multer');
const path = require('path');
const { uploadImage, getImages } = require('../controllers/imageController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, `${req.user.id}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5000000 }, // 5MB limit
    fileFilter: function(req, file, cb) {
        const filetypes = /jpeg|jpg|png/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb('Error: Images Only!');
        }
    }
});

router.use(protect);

router.post('/upload', upload.single('image'), uploadImage);
router.get('/', getImages);

module.exports = router;
