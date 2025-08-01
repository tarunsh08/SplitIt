import express from 'express'
import { createSpace, getSpaces, addMemberToSpace } from '../controllers/spaceController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router();

router.post('/create', protect, createSpace);
router.get('/my-spaces', protect, getSpaces);
router.post('/:spaceId/add-member', protect, addMemberToSpace);

export default router;
