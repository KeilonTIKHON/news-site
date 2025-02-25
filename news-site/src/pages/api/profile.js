import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export default function handler(req, res) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Authorization required' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        res.status(200).json({ message: 'Authorized', user: decoded });
    } catch (error) {
        console.error('Authorization Error:', error.message);
        res.status(401).json({ message: 'Invalid token' });
    }
}