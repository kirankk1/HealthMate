// medicineController.js
import Medicine from '../models/medicine.js';

export const getAllMedicines = async (req, res, next) => {
    try {
        const { search } = req.query; 
        console.log("Received search query:", search);  // Log the received search query

        let medicines;
        if (search) {
            medicines = await Medicine.find({
                $or: [
                    { Symptoms: { $regex: search, $options: "i" } },  
                    { MedicineName: { $regex: search, $options: "i" } }
                ]
            });
        } else {
            medicines = await Medicine.find();  // Fetch all medicines if no search query
        }

        res.json(medicines);
    } catch (error) {
        console.error("Error fetching medicines: ", error.message);
        next(error);
    }
};


export const getMedicineById = async (req, res, next) => {
    try {
        const medicine = await Medicine.findById(req.params.id);
        if (!medicine) {
            return res.status(404).json({ message: 'Medicine not found' });
        }
        res.json(medicine);
        console.log("Medicine ID requested:", req.params.id);

    } catch (error) {
        console.error("Error fetching medicine: ", error.message);
        next(error);
    }
};

