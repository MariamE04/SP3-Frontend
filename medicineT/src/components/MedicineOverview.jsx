import MedicineCard from "./MedicineCard";

function MedicineOverview({ medicines, onSelect, onDelete, canDelete   }) {
  return (
    <>
      {medicines.map(medicine => (
        <MedicineCard
          key={medicine.id}
          medicine={medicine}
          onClick={() => onSelect(medicine)}
          onDelete={onDelete} 
          canDelete={canDelete}
        />
      ))}
    </>
  );
}

export default MedicineOverview;
