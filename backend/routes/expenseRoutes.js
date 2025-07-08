import express from 'express';
import {
createExpense,
getHouseholdExpenses,
markSplitPaid
} from '../controllers/expenseController.js';

const router = express.Router();

router.post('/create', createExpense);
router.get('/:id', getHouseholdExpenses);
router.put('/split/:id/paid', markSplitPaid);

export default router;