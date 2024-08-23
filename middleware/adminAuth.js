 
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const adminAuth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

        if (!user || user.role !== 'admin') {
            throw new Error('Not authorized as an admin');
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(403).json({ error: 'Access denied' });
    }
};

module.exports = adminAuth;
