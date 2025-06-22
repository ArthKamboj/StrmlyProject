const mongoose = require('mongoose')
const videoSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: String,
    videoUrl: {type: String, required: true},
    uploader: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', required: true
    },
}, {timestamps: true})
module.exports = mongoose.model('Video', videoSchema)