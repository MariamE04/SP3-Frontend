import MedicineCard from "./MedicineCard";

function MedicineOverview({ medicines, onSelect, onDelete, onAddLog, canDelete }) {
  return (
    <>
      {medicines.map(medicine => (
        <MedicineCard
          key={medicine.id}
          medicine={medicine}
          onClick={() => onSelect(medicine)}
          onDelete={onDelete}
          onAddLog={onAddLog}
          canDelete={canDelete}
        />
      ))}
    </>
  );
}

export default MedicineOverview;
