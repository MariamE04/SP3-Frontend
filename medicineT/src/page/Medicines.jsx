import { useState, useEffect } from "react";
import FetchData from "../utils/FetchData";
import MedicineOverview from "../components/MedicineOverview";
import MedicineLogs from "../components/MedicineLogs";
import styles from "../style/Medicines.module.css";

function Medicines() {
  const [medicines, setMedicines] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState(null);

  useEffect(() => {
    FetchData("/medicines")
      .then(data => setMedicines(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <h1>My Medicines</h1>
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
