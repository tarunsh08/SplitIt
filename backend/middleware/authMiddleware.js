import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

export const protect = (req, res, next) => {
const auth = req.headers.authorization;
if (!auth) return res.status(401).json({ message: 'No token' });

try {
const token = auth.split(' ')[1];
const decoded = jwt.verify(token, JWT_SECRET);
req.user = decoded.id;
next();
} catch (err) {
res.status(401).json({ message: 'Unauthorized' });
}
};