import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import FetchData from "../utils/FetchData";
import MedicineOverview from "../components/MedicineOverview";
import MedicineLogs from "../components/MedicineLogs";
import styles from "../style/Medicines.module.css";
import { AuthContext } from "../auth/AuthContext";

function Medicines() {
  const { loggedIn } = useContext(AuthContext);
  const [medicines, setMedicines] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (!loggedIn || !token) return;

    FetchData("/medicines")
      .then(data => setMedicines(data))
      .catch(err => console.error(err));
  }, [loggedIn]);

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <button
          onClick={() => navigate("/medicines/new")}
          className={styles.addButton} // evt. tilføj styling i CSS
        >
          Add Medicine
        </button>

        <h2>My Medicines</h2>

        <MedicineOverview
          medicines={medicines}
          onSelect={setSelectedMedicine}
        />
      </div>

      <div className={styles.right}>
        {selectedMedicine ? (
          <MedicineLogs medicineId={selectedMedicine.id} />
        ) : (
          <p className={styles.placeholder}>
            Select a medicine to see logs
          </p>
        )}
      </div>
    </div>
  );
}

export default Medicines;
