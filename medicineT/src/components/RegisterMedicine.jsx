import { useState } from "react";
import FetchData from "../utils/FetchData";

function RegisterMedicine() {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    symptomDescription: ""
  });

  // Opdaterer formData ved input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault(); // 🔹 vigtigt: undgå reload

    const newMedicine = {
      name: formData.name,
      type: formData.type,
      symptomDescription: formData.symptomDescription
    };

    //POST-kaldet
    FetchData("/medicines", "POST", newMedicine)
      .then(() => {
        alert("Medicine registered successfully!");
        setFormData({
          name: "",
          type: "",
          symptomDescription: ""
        });
      })
      .catch(err => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        placeholder="Medicine Name"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        name="type"
        placeholder="Type"
        value={formData.type}
        onChange={handleChange}
      />
      <input
        name="symptomDescription"
        placeholder="Symptom Description"
        value={formData.symptomDescription}
        onChange={handleChange}
      />
      <button type="submit">Add Medicine</button>
    </form>
  );
}

export default RegisterMedicine;
