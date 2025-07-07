import express from 'express';
import Expense from './models/expense.model.js';
import Split from './models/split.model.js';
import Household from './models/household.model.js';

const router = express.Router();

router.post('/expenses', async (req, res) => {
  try {
    const { description, amount, paidBy, householdId, splits } = req.body;

    // Create the expense
    const expense = new Expense({
      description,
      amount,
      paidBy,
      household: householdId
    });

    await expense.save();

    // Create splits
    for (const s of splits) {
      const split = new Split({
        expense: expense._id,
        user: s.userId,
        amount: s.amount
      });
      await split.save();
      expense.splits.push(split._id);
    }

    await expense.save();

    // Add expense to household
    const household = await Household.findById(householdId);
    household.expenses.push(expense._id);
    await household.save();

    res.status(201).json(expense);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
