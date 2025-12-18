import { useState, useContext } from "react";
import FetchData from "../utils/FetchData";
import { AuthContext } from "../auth/AuthContext";

function RegisterMedicineLog({ medicine }) {
  const { user } = useContext(AuthContext);

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

    const log = {
      dose: Number(formData.dose),
      takenAt: formData.takenAt,
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

      <button type="submit">Add Log</button>
    </form>
  );
}

export default RegisterMedicineLog;
