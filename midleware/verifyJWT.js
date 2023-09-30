const jwt = require('jsonwebtoken');

const verifyJWT = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        console.log(authHeader)
        const token = authHeader && authHeader.split(' ')[1];
        console.log(token)
        if (token == null) {
            return res.status(401).json({ message: 'Unauthorized access' });
        }

        jwt.verify(token, process.env.JWT_TOKEN, (err, user) => {
            console.log(err)
            if (err) {
                return res.status(403).json({ message: 'Unauthorized access' });
            }
            next();
        });
    } catch (error) {
        return res.status(500).json({ message: 'Unknown error', error: error });
    }

};

module.exports = verifyJWT;
