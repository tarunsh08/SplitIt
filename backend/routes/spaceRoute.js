import express from 'express'
import { createSpace, getSpaces, addMemberToSpace, getSpaceById, addExpense } from '../controllers/spaceController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router();

router.post('/create', protect, createSpace);
router.get('/my-spaces', protect, getSpaces);
router.get('/:id', protect, getSpaceById);
router.post('/:spaceId/add-member', protect, addMemberToSpace);
router.post('/:id/expense', protect, addExpense);

export default router;
