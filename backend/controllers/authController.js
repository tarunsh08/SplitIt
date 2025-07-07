import Expense from '../models/expense.model.js';
import Split from '../models/split.model.js';
import Household from '../models/household.model.js';

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