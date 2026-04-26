const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    imageUrl: {
        type: String,
        required: [true, 'Please add an image URL or path']
    },
    fileName: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Image', imageSchema);
