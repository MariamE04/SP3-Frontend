import { useEffect, useState } from "react";
import FetchData from "../utils/FetchData";

function EditMedicineForm({ medicine, onUpdated }) {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    symptomDescription: ""
  });

  useEffect(() => {
    if (medicine) {
      setFormData({
        name: medicine.name,
        type: medicine.type,
        symptomDescription: medicine.symptomDescription
      });
    }
  }, [medicine]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    FetchData(`/medicines/${medicine.id}`, "PUT", {
      ...formData,
      id: medicine.id
    })
      .then(updated => {
        onUpdated(updated);
      })
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h3>Edit Medicine</h3>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          name="type"
          value={formData.type}
          onChange={handleChange}
        />
        <input
          name="symptomDescription"
          value={formData.symptomDescription}
          onChange={handleChange}
        />
        <button type="submit">Save changes</button>
      </form>
    </div>
  );
}

export default EditMedicineForm;
