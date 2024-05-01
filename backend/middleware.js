
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware to check authenticity
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!(authHeader || authHeader.startsWith('Bearer'))) {
        return res.status(403).json({
            message: "Something went Wrong!"
        });
    }

    const token = authHeader.split(' ')[1];
    // console.log(token)

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        // console.log(decoded)
        if (decoded.userId) {
            req.userId = decoded.userId;
            next();
        } else {
            return res.status(403).json({
                message: "Internal Error"
            })
        }

    } catch (error) {
        return res.status(403).json({
            message: "Internal Error from catch"
        })
    }
}

module.exports = {
    authMiddleware
}