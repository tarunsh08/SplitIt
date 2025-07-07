import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectToDb from './db/db.js';
import expenseRoutes from './routes/expenseRoutes.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectToDb();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', expenseRoutes);

// Root test route
app.get('/', (req, res) => {
res.send('Split Paying App API is running');
});

// Start server
app.listen(PORT, () => {
console.log(`Server is running on http://localhost:${PORT}`);
});