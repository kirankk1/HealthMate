import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyMedicines = () => {
  const [myMedicines, setMyMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMyMedicines = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:3000/api/my_medicines');
        setMyMedicines(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMyMedicines();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">My Medicines</h1>
      {myMedicines.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {myMedicines.map(({ medicineId, timeInterval }) => (
            <div key={medicineId._id} className="border rounded-lg p-4 bg-white shadow-md flex flex-col items-center">
              <img src={medicineId.ImageUrl} alt={medicineId.MedicineName} className="mb-3 w-32 h-32 object-cover" />
              <h2 className="text-xl font-semibold text-center mb-2">{medicineId.MedicineName}</h2>
              <p className="text-lg font-bold mb-1">Price: ${medicineId.Price}</p>
              <p className="text-sm">Notification Interval: Every {timeInterval} hours</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">No medicines added yet.</p>
      )}
    </div>
  );
};

export default MyMedicines;
