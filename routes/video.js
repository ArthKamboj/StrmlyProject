const express = require('express')
const router = express.Router()
const upload = require('../middleware/upload')
const {uploadVideo, getAllVideos} = require('../controllers/videoController')
const verifyToken = require('../middleware/authMiddleware')

router.post('/upload', verifyToken, upload.single('video'), uploadVideo)
router.get('/videos', getAllVideos)

module.exports = router