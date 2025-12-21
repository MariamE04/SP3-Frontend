import MedicineCard from "./MedicineCard";

function MedicineOverview({ medicines, onSelect, onDelete, onAddLog, onEdit, canDelete, canEdit, canAddLog }) {
  return (
    <>
      {medicines.map(medicine => (
        <MedicineCard
          key={medicine.id}
          medicine={medicine}
          onClick={() => onSelect(medicine)}
          onDelete={onDelete}
          onAddLog={onAddLog}
          onEdit={onEdit}
          canDelete={canDelete}
          canEdit={canEdit}  
          canAddLog={canAddLog}
        />
      ))}
    </>
  );
}

export default MedicineOverview;
