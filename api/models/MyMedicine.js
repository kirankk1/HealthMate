import mongoose from 'mongoose';

const myMedicineSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  medicineId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Medicine', 
    required: true 
  },
  fromDate: { 
    type: Date, 
    required: true 
  },
  toDate: { 
    type: Date, 
    required: true 
  },
  phoneNumber: { 
    type: String, 
    required: true 
  },
  timesPerDay: { 
    type: Number, 
    required: true 
  },
  timeInputs: [{ 
    type: String, 
    required: true 
  }]
});

const MyMedicine = mongoose.model('MyMedicine', myMedicineSchema);
export default MyMedicine;
