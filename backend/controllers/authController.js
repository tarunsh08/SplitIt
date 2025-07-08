import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import Expense from '../models/expense.model.js';
import Split from '../models/split.model.js';
import Household from '../models/household.model.js';

// const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

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
            { userId: user._id },
            process.env.JWT_SECRET || 'dev_secret',
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
        }

        // Verify password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Create JWT token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET || 'dev_secret',
            { expiresIn: '24h' }
        );

        res.status(200).json({
            message: 'Login successful',
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            },
            token
        });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ message: 'Login failed', error: err.message });
    }
};

// Expense controller functions
export const createExpense = async (req, res) => {
    try {
        const { amount, description, householdId } = req.body;
        const expense = new Expense({
            amount,
            description,
            householdId,
            createdBy: req.user._id
        });
        await expense.save();
        res.status(201).json(expense);
    } catch (err) {
        res.status(500).json({ message: 'Failed to create expense', error: err.message });
    }
};

export const getHouseholdExpenses = async (req, res) => {
    try {
        const { id } = req.params;
        const expenses = await Expense.find({ householdId: id })
            .populate('createdBy', 'name')
            .sort({ createdAt: -1 });
        res.json(expenses);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch expenses', error: err.message });
    }
};

export const markSplitPaid = async (req, res) => {
    try {
        const { id } = req.params;
        const split = await Split.findById(id);
        if (!split) {
            return res.status(404).json({ message: 'Split not found' });
        }
        split.isPaid = true;
        await split.save();
        res.json(split);
    } catch (err) {
        res.status(500).json({ message: 'Failed to mark split as paid', error: err.message });
    }
};