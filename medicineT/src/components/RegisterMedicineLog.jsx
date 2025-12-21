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

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null); // ryd tidligere fejl

    if (!username) {
      setError("User not logged in");
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
      .catch(err => {
        if (err.message.includes("unique result")) {
          setError(
            "Denne medicin findes flere gange i systemet. tilføje et symbol- ved medicine navnet"
          );
        } else {
          setError("Noget gik galt. Prøv igen.");
        }
        console.error(err);
      });
  };

  return (
    <div className={styles.registerForm}>
      <form onSubmit={handleSubmit}>
        <h4>Add log for {medicine.name}</h4>

        <p style={{ fontSize: "0.9rem", color: "#555", marginBottom: "1rem" }}>
          ⚠️ Hvis du opretter en medicin med et navn, der allerede findes i systemet,
          kan logs ikke tilføjes korrekt.
          <br />
          Giv derfor medicinen et unikt navn – fx med et symbol eller noget personligt
          (<em>Panodil ⭐</em>, <em>Panodil – morgen</em>).
        </p>


        {error && <p className={styles.error}>{error}</p>}

        <input
          name="dose"
          type="number"
          value={formData.dose}
          onChange={handleChange}
          placeholder="Dose"
          required
        />

        <input
          name="takenAt"
          type="datetime-local"
          value={formData.takenAt}
          onChange={handleChange}
          required
        />

        <button className={styles.primaryBtn} type="submit">
          Add Log
        </button>
      </form>
    </div>
  );
}

export default RegisterMedicineLog;
