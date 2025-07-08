import Expense from '../models/expense.model.js';
import Split from '../models/split.model.js';
import Household from '../models/household.model.js';
import User from '../models/user.model.js';

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

// Helper function to calculate total amount for splits
const calculateSplitAmounts = (totalAmount, splits) => {
    const totalShares = splits.reduce((sum, split) => sum + split.share, 0);
    return splits.map(split => ({
        ...split,
        amount: (totalAmount * split.share) / totalShares
    }));
};

// Create a new expense
export const createExpense = async (req, res) => {
    try {
        const { description, amount, paidBy, householdId, splits } = req.body;
        
        // Validate input
        if (!description || !amount || !paidBy || !householdId || !splits) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Calculate split amounts
        const calculatedSplits = calculateSplitAmounts(amount, splits);

        // Create expense
        const expense = new Expense({
            description,
            amount,
            paidBy,
            householdId,
            splits: calculatedSplits
        });

        // Save expense
        const savedExpense = await expense.save();

        // Create split records
        const splitRecords = calculatedSplits.map(split => ({
            expenseId: savedExpense._id,
            userId: split.userId,
            amount: split.amount,
            paid: false
        }));

        // Save split records
        await Split.insertMany(splitRecords);

        res.status(201).json({
            message: 'Expense created successfully',
            expense: savedExpense
        });
    } catch (err) {
        console.error('Create expense error:', err);
        res.status(500).json({ message: 'Failed to create expense', error: err.message });
    }
};

// Get all expenses for a household
export const getHouseholdExpenses = async (req, res) => {
    try {
        const { id: householdId } = req.params;
        
        // Get all expenses for the household
        const expenses = await Expense.find({ householdId })
            .populate('paidBy', 'name')
            .populate('splits.userId', 'name')
            .sort({ createdAt: -1 });

        res.json({
            message: 'Expenses fetched successfully',
            expenses
        });
    } catch (err) {
        console.error('Get expenses error:', err);
        res.status(500).json({ message: 'Failed to fetch expenses', error: err.message });
    }
};

// Mark a split as paid
export const markSplitPaid = async (req, res) => {
    try {
        const { id: splitId } = req.params;
        const { userId } = req.user; // Get userId from authenticated user

        // Find and update the split
        const split = await Split.findByIdAndUpdate(
            splitId,
            { paid: true, paidBy: userId },
            { new: true }
        );

        if (!split) {
            return res.status(404).json({ message: 'Split not found' });
        }

        res.json({
            message: 'Split marked as paid',
            split
        });
    } catch (err) {
        console.error('Mark split paid error:', err);
        res.status(500).json({ message: 'Failed to mark split as paid', error: err.message });
    }
};