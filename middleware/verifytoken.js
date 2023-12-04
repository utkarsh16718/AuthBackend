const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {

    const head = req.headers.cookie;
    const headers = head.split('=')[1]

    if (!headers) {
        return res.status(403).json({ message: "No Token Found" })
    }

    jwt.verify(headers, process.env.JWT_SECRET, (error, user) => {

        if (error) {
            return res.status(404).json(error)
        }
        req.id = user.id
    })
    next();

}

module.exports = { verifyToken }
