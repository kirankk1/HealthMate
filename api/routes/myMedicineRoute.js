import express from 'express';
import MyMedicine from '../models/MyMedicine.js'; // Adjust the path as needed
import { authenticateUser } from '../middleware/auth.js'; // Middleware to authenticate users

const router = express.Router();

// Route to add a medicine
router.post('/', authenticateUser, async (req, res) => {
    const { medicineId, fromDate, toDate, phoneNumber, timesPerDay, timeInputs } = req.body;
    const userId = req.user._id; // Assuming user ID is available after authentication
  
    try {
        // Create new MyMedicine instance with updated fields
        const newMyMedicine = new MyMedicine({
            userId,
            medicineId,
            fromDate,
            toDate,
            phoneNumber,
            timesPerDay,
            timeInputs
        });
        
        // Save the new medicine entry
        await newMyMedicine.save();
        res.status(201).json(newMyMedicine);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to fetch user's medicines
router.get('/', authenticateUser, async (req, res) => {
    try {
        const myMedicines = await MyMedicine.find({ userId: req.user._id }).populate('medicineId');
        res.json(myMedicines);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;