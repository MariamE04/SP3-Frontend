import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import FetchData from "../utils/FetchData";
import MedicineOverview from "../components/MedicineOverview";
import MedicineLogs from "../components/MedicineLogs";
import RegisterMedicineLog from "../components/RegisterMedicineLog";
import styles from "../style/Medicines.module.css";
import { AuthContext } from "../auth/AuthContext";
import EditMedicineForm from "../components/EditMedicineForm ";


function Medicines() {
  const { loggedIn, user  } = useContext(AuthContext);
  const [medicines, setMedicines] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [showLogForm, setShowLogForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const navigate = useNavigate();

  // Hent alle medicine
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (!loggedIn || !token) return;

    FetchData("/medicines")
      .then(data => setMedicines(data))
      .catch(err => console.error(err));
  }, [loggedIn]);

  const canDelete = user?.roles !== "ADMIN";

  // Delete funktion
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this medicine?")) return;

    FetchData(`/medicines/${id}`, "DELETE")
      .then(() => {
        setMedicines(prev => prev.filter(med => med.id !== id));      // Opdater state efter delete
        if (selectedMedicine?.id === id) setSelectedMedicine(null);  // Hvis det var valgt, fjern fra selected
      })
      .catch(err => console.error(err));
  };


  // add logs
  const handleAddLog = (medicine) => {
  setSelectedMedicine(medicine);
  setShowLogForm(true);
};

  // edit medicine:
  const handleEditMedicine = (medicine) => {
    setSelectedMedicine(medicine);
    setShowEditForm(true);
    setShowLogForm(false);
  };


  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <button
          onClick={() => navigate("/medicines/new")}
          className={styles.addButton}
        >
          Add Medicine
        </button>

        <h2>My Medicines</h2>

       <MedicineOverview
        medicines={medicines}
        onSelect={(medicine) => {
          setSelectedMedicine(medicine);
          setShowLogForm(false);
        }}
        onDelete={handleDelete}
        onAddLog={handleAddLog}
        onEdit={handleEditMedicine}
        canDelete={canDelete}
      />


      </div>

      <div className={styles.right}>
        {selectedMedicine && (
          <>
            {showEditForm && (
              <EditMedicineForm
                medicine={selectedMedicine}
                onUpdated={(updatedMedicine) => {
                  setMedicines(prev =>
                    prev.map(m =>
                      m.id === updatedMedicine.id ? updatedMedicine : m
                    )
                  );
                  setSelectedMedicine(updatedMedicine);
                  setShowEditForm(false);
                }}
              />
            )}

            {!showEditForm && (
              <>
                <MedicineLogs medicine={selectedMedicine} />
                {showLogForm && (
                  <RegisterMedicineLog medicine={selectedMedicine} />
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Medicines;
