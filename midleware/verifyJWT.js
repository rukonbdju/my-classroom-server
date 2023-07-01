const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token)
    if (token == null) {
        return res.status(401).json({ message: 'Unauthorized access' });
    }

    jwt.verify(token, process.env.JWT_TOKEN, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Unauthorized access' });
        }
        next();
    });
};

module.exports = verifyJWT;
