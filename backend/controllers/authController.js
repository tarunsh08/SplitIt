import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const createExpense = async (req, res) => {
try {
const { description, amount, paidBy, householdId, splits } = req.body;
} catch (err) {
res.status(500).json({ message: 'Expense creation failed', err });
}
};

export const getHouseholdExpenses = async (req, res) => {
try {
const { id } = req.params;
} catch (err) {
res.status(500).json({ message: 'Could not fetch expenses', err });
}
};

export const markSplitPaid = async (req, res) => {
try {
const { id } = req.params;
} catch (err) {
res.status(500).json({ message: 'Update failed', err });
}
};

export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        // Validate input
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        await user.save();

        // Create JWT token
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(201).json({
            message: 'User created successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            },
            token
        });
    } catch (err) {
        console.error('Signup error:', err);
        res.status(500).json({ message: 'Signup failed', error: err.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }else{
            const token = user.generateAuthToken()
            res.status(200).json({
                message: 'Login successful',
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email
                },
                token
            });
        }

       
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ message: 'Login failed', error: err.message });
    }
};
