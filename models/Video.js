const mongoose = require('mongoose')
const videoSchema = new mongoose.Schema({
    title: String,
    description: String,
    videoUrl: String,
    uploader: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
}, {timestamps: true})
module.exports = mongoose.model('Video', videoSchema)