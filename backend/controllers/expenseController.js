import Expense from '../models/expense.model.js';
import Split from '../models/split.model.js';
import Household from '../models/household.model.js';

// const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

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

// Expense controller functions
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