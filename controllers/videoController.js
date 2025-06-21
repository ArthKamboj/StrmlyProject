const Video = require('../models/Video')
exports.uploadVideo = async (req, res) => {
  try {
    const {title,description} = req.body
    const video = await Video.create({
      title,
      description,
      videoUrl: req.file.path,
      uploader: req.user.userId
    })
    res.status(201).json(video)
  } catch (e) {
    res.status(500).json({error: 'Failed to upload video'})
  }
}
exports.getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find().populate('uploader','name').sort({uploadDate: -1})
    res.json(videos)
  } catch (err) {
    res.status(500).json({error: 'Failed to fetch videos'})
  }
}