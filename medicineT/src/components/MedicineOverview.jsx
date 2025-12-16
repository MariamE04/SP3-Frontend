import MedicineCard from "./MedicineCard";

function MedicineOverview({ medicines, onSelect }) {
  return (
    <>
      {medicines.map(medicine => (
        <MedicineCard
          key={medicine.id}
          medicine={medicine}
          onClick={() => onSelect(medicine)}
        />
      ))}
    </>
  );
}

export default MedicineOverview;
