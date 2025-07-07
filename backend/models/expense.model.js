import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  paidBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  household: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Household',
    required: true,
  },
  splits: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Split'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Expense', expenseSchema);
