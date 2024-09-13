import mongoose from "mongoose";

const myMedicineSchema = new mongoose.Schema({
  medicineId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Medicine',  // Reference to the Medicine model
    required: true,
  },
  timeIntervals: {
    type: [String],  // An array to store time intervals for notifications (e.g., "08:00", "20:00")
    required: true,
  },
  addedAt: {
    type: Date,
    default: Date.now,  // Tracks when the medicine was added to the user's list
  },
});

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },
    myMedicines: [myMedicineSchema],  // Array to store the medicines saved by the user
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
