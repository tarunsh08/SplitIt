import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import expenseRoutes from './routes/expenseRoutes.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api', expenseRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(() => {
console.log('MongoDB connected');
app.listen(5000, () => console.log('Server running on port 5000'));
})
.catch(err => console.error(err))