import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
    } catch (err) {
        res.status(500).json({ message: 'Signup error', err });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });
    } catch (err) {
        res.status(500).json({ message: 'Login error', err });
    }
};