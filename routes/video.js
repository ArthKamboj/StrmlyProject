const express = require('express')
const router = express.Router()
const upload = require('../middleware/upload')
const {uploadVideo, getAllVideos, getRecommendedVideos} = require('../controllers/videoController')
const verifyToken = require('../middleware/authMiddleware')

router.post('/upload', verifyToken, upload.single('video'), uploadVideo)
router.get('/', getAllVideos)
router.get('/recommended', getRecommendedVideos)


module.exports = router