import { useEffect, useState } from "react";
import FetchData from "../utils/FetchData";
import styles from "../style/FormRegister.module.css";

function EditLog({ log, onUpdated }) {
  const [formData, setFormData] = useState({
    dose: "",
    takenAt: ""
  });

  useEffect(() => {
    if (log) {
      setFormData({
        dose: log.dose,
        takenAt: log.takenAt
      });
    }
  }, [log]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    FetchData(`/medicineLog/${log.id}`, "PUT", {
      ...formData,
      id: log.id
    })
      .then(updated => onUpdated(updated))
      .catch(console.error);
  };

  return (
    <div className={styles.registerForm}>
    <form onSubmit={handleSubmit}>
      <input
        name="dose"
        value={formData.dose}
        onChange={handleChange}
      />
     <input
        type="datetime-local"
        name="takenAt"
        value={formData.takenAt?.slice(0, 16)}
        onChange={handleChange}
        />

      <button className={styles.primaryBtn} type="submit">Save log</button>
    </form>
    </div>
  );
}


export default EditLog;
