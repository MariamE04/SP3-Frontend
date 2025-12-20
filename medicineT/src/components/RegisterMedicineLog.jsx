  import { useState, useContext } from "react";
  import FetchData from "../utils/FetchData";
  import { AuthContext } from "../auth/AuthContext";
  import styles from "../style/FormRegister.module.css";

  function RegisterMedicineLog({ medicine }) {
    const { username } = useContext(AuthContext);


    const [formData, setFormData] = useState({
      dose: "",
      takenAt: ""
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();

      if (!username) {
      alert("User not logged in");
      return;
      }

      const log = {
      dose: Number(formData.dose),
      takenAt: formData.takenAt,
      username: username,
      medicineName: medicine.name
      };


      FetchData("/medicineLog", "POST", log)
        .then(() => {
          alert("Log registered");
          setFormData({ dose: "", takenAt: "" });
        })
        .catch(console.error);
    };

    return (
      <div className={styles.registerForm}>
      <form onSubmit={handleSubmit}>
        <h4>Add log for {medicine.name}</h4>

        <input
          name="dose"
          type="number"
          value={formData.dose}
          onChange={handleChange}
          placeholder="Dose"
        />

        <input
          name="takenAt"
          type="datetime-local"
          value={formData.takenAt}
          onChange={handleChange}
        />

        <button className={styles.primaryBtn} type="submit">Add Log</button>
      </form>
      </div>
    );
  }

  export default RegisterMedicineLog;
