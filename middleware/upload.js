const multer = require('multer')
const {CloudinaryStorage} = require('multer-storage-cloudinary')
const cloudinary = require('../utils/cloudinary')

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'strmly_videos',
    resource_type: 'video',
    format: async () => 'mp4',
    public_id: (req, file) => Date.now() + '-' + file.originalname
    }
})

const upload = multer({storage})
module.exports = upload