import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Label, Modal, Spinner, TextInput } from "flowbite-react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

const Medicine = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedMedicineId, setSelectedMedicineId] = useState(null);
  const [timesPerDay, setTimesPerDay] = useState(1);
  const [timeInputs, setTimeInputs] = useState([""]);
  const [value, setValue] = useState();
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  
  const location = useLocation();
  const navigate = useNavigate();

  const {currentUser} = useSelector((state) => state.user)


  useEffect(() => {
    const fetchMedicines = async () => {
      setLoading(true);
      const queryParams = new URLSearchParams(location.search);
      const search = queryParams.get("search");

      try {
        const response = await axios.get(
          `http://localhost:3000/api/medicines${
            search ? `?search=${search}` : ""
          }`
        );
        setMedicines(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMedicines();
  }, [location.search]);

  const handleAddMedicine = (medicineId) => {
    try {
      if(currentUser){
        setSelectedMedicineId(medicineId);
        setShowModal(true);
      }
    } catch (error) {
      setError(error.message);
    }

    
  };

  const handleViewDetails = (medicineId) => {
    navigate(`/medicines/${medicineId}`);
  };

  const handleTimesPerDayChange = (e) => {
    const numTimes = parseInt(e.target.value, 10);
    setTimesPerDay(numTimes);
    setTimeInputs(new Array(numTimes).fill(""));
  };

  const handleTimeChange = (index, e) => {
    const newTimeInputs = [...timeInputs];
    newTimeInputs[index] = e.target.value;
    setTimeInputs(newTimeInputs);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await axios.post(
        "http://localhost:3000/api/myMedicines",
        {
          medicineId: selectedMedicineId,
          fromDate,
          toDate,
          phoneNumber: value,
          timesPerDay,
          timeInputs
        },
        { withCredentials: true }
      );
      alert("Medicine added successfully!");
      setShowModal(false);
    } catch (error) {
      alert(`Error adding medicine: ${error.message}`);
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="container mx-auto p-6">
      {medicines.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {medicines.map((medicine) => (
            <div
              key={medicine._id}
              className="border rounded-lg p-4 bg-white shadow-lg flex flex-col items-center dark:text-gray-700"
            >
              <img
                src={medicine.ImageURL}
                alt={medicine.MedicineName}
                className="mb-3 w-32 h-32 object-cover"
              />
              <h2 className="text-xl font-semibold text-center mb-2">
                {medicine.MedicineName}
              </h2>
              <p className="text-lg font-bold mb-1">Price: ₹{medicine.Price}</p>
              <button
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                onClick={() => handleAddMedicine(medicine._id)}
              >
                Add
              </button>
              <button
                className="mt-2 text-sm text-blue-700 underline"
                onClick={() => handleViewDetails(medicine._id)}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">No medicines found.</p>
      )}
      
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header>Add Medicine Schedule</Modal.Header>
        <Modal.Body>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="From Date" />
              <TextInput
                type="date"
                name="fromDate"
                placeholder="Select start date"
                id="fromDate"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </div>
            <div>
              <Label value="To Date" />
              <TextInput
                type="date"
                name="toDate"
                placeholder="Select end date"
                id="toDate"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </div>
            <div>
              <PhoneInput 
                placeholder="Enter phone number"
                value={value}
                onChange={setValue}
              />
            </div>
            <div>
              <Label value="Number of Times per Day" />
              <TextInput
                type="number"
                min="1"
                name="timesPerDay"
                placeholder="Enter number of times"
                value={timesPerDay}
                onChange={handleTimesPerDayChange}
              />
            </div>
            {timeInputs.map((time, index) => (
              <div key={index}>
                <Label value={`Select Time ${index + 1}`} />
                <TextInput
                  type="time"
                  name={`time${index + 1}`}
                  value={time}
                  onChange={(e) => handleTimeChange(index, e)}
                />
              </div>
            ))}
            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Medicine;
