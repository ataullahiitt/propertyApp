
const jwt = require('jsonwebtoken');

const authorize = (req, res, next) => {

    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')
        || !req.headers.authorization.split(' ')[1]
    ) {
        return res.status(422).json({ status: false, message: "Access Denied!, no token entered" });
    }

    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedUser = jwt.verify(token, process.env.JWT_SECRET);
        // console.log('decodedUser--->>>', decodedUser);
        if (decodedUser) {
            req.user = decodedUser;
            next();
        }
        else {
            res.status(401).json({ message: 'Unauthorized' });
        }
    } catch (e) {
        console.log(e);
        res.status(400).send({ message: "Unauthorized" });
    }
}

module.exports = authorize;

