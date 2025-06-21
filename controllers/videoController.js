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
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const skip = (page-1)*limit
    const videos = await Video.find()
      .populate('uploader','name')
      .sort({createdAt:-1})
      .skip(skip)
      .limit(limit)
      const total = Video.countDocuments()
      res.json({
        total, page, totalPages: Math.ceil(total/limit), videos
      })
  } catch (e) {
    res.status(500).json({error: 'Failed to fetch videos'})
  }
}