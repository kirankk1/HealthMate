import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal, Table } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const MyMedicine = () => {
  const [myMedicines, setMyMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedMedicineId, setSelectedMedicineId] = useState(null);

  useEffect(() => {
    const fetchMyMedicines = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:3000/api/myMedicines",
          { withCredentials: true }
        );
        setMyMedicines(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMyMedicines();
  }, []);

  const handleDeleteMedicine = async (medicineId) => {
    try {
      await axios.delete(`http://localhost:3000/api/myMedicines/${medicineId}`, {
        withCredentials: true,
      });
      setMyMedicines((prev) => prev.filter((med) => med._id !== medicineId));
      setShowModal(false);
    } catch (error) {
      console.error("Failed to delete medicine:", error);
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {myMedicines.length > 0 ? (
        <>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Medicine Name</Table.HeadCell>
              <Table.HeadCell>Medicine Image</Table.HeadCell>
              <Table.HeadCell>From Date</Table.HeadCell>
              <Table.HeadCell>To Date</Table.HeadCell>
              <Table.HeadCell>Phone Number</Table.HeadCell>
              <Table.HeadCell>Times Per Day</Table.HeadCell>
              <Table.HeadCell>Time Schedule</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            {myMedicines.map((myMed) => (
              <Table.Body className="divide-y" key={myMed._id}>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>{myMed.medicineId.MedicineName}</Table.Cell>
                  <Table.Cell>
                    <img
                      src={myMed.medicineId.ImageURL}
                      alt={myMed.medicineId.ImageURL}
                      className="w-20 h-10 object-cover bg-gray-500"
                    />
                  </Table.Cell>
                  <Table.Cell>{new Date(myMed.fromDate).toLocaleDateString()}</Table.Cell>
                  <Table.Cell>{new Date(myMed.toDate).toLocaleDateString()}</Table.Cell>
                  <Table.Cell>{myMed.phoneNumber}</Table.Cell>
                  <Table.Cell>{myMed.timesPerDay}</Table.Cell>
                  <Table.Cell>
                    {myMed.timeInputs.map((time, index) => (
                      <p key={index}>Time {index + 1}: {time}</p>
                    ))}
                  </Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setSelectedMedicineId(myMed._id);
                        setShowModal(true);
                      }}
                      className="font-medium text-red-500 hover:underline cursor-pointer"
                    >
                      Delete
                    </span>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
        </>
      ) : (
        <p className="text-center">No medicines added yet.</p>
      )}

      
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this medicine schedule?
            </h3>
            <div className="flex justify-center gap-4 ">
              <Button color="failure" onClick={() => handleDeleteMedicine(selectedMedicineId)}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default MyMedicine;
