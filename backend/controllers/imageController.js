const Image = require('../models/Image');
const path = require('path');
const fs = require('fs');

// @desc    Upload captured image
// @route   POST /api/images/upload
// @access  Private
exports.uploadImage = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'Please upload a file' });
        }

        const image = await Image.create({
            user: req.user.id,
            imageUrl: `/uploads/${req.file.filename}`,
            fileName: req.file.filename
        });

        res.status(201).json({
            success: true,
            data: image
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// @desc    Get user's images
// @route   GET /api/images
// @access  Private
exports.getImages = async (req, res, next) => {
    try {
        const images = await Image.find({ user: req.user.id }).sort('-createdAt');
        res.status(200).json({ success: true, count: images.length, data: images });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
