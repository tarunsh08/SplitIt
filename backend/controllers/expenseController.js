import Expense from '../models/expense.model.js';
import Split from '../models/split.model.js';
import Household from '../models/household.model.js';


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