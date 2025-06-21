const jwt = require('jsonwebtoken')
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        return res.status(401).json({ error: 'Access denied' })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.user = decoded
        next()
    }
    catch (e) {
        res.status(403).json({error: 'Invalid token'})
    }
}

module.exports= verifyToken