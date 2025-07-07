import express from 'express';
import {
createExpense,
getHouseholdExpenses,
markSplitPaid
} from '../controllers/expenseController.js';

const router = express.Router();

router.post('/expenses', createExpense);
router.get('/households/:id/expenses', getHouseholdExpenses);
router.post('/splits/:id/pay', markSplitPaid);

export default router;