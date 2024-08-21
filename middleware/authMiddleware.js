import jwt from 'jsonwebtoken';

export const protect = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.startsWith('Bearer ') ? req.headers.authorization.split(' ')[1] : null;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).json({ message: 'Not authorized' });
      } else {
        req.userId = decoded.userId;
        req.isAdmin = decoded.isAdmin;
        next();
      }
    });
  } else {
    res.status(401).json({ message: 'Not authorized' });
  }
};
