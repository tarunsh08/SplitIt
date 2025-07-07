import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectToDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Failed to connect to MongoDB:', err);
        process.exit(1); // Exit process with error code
    }
};

export default connectToDb;