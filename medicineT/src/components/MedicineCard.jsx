import styles from "../style/MedicineCard.module.css";

function MedicineCard({ medicine, onClick, onDelete, canDelete }) {
  return (
    <div className={styles.card} onClick={onClick}>
      <h3>{medicine.name}</h3>
      <p>Type: {medicine.type}</p>
      <p>{medicine.symptomDescription}</p>

      {canDelete && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(medicine.id);
          }}
        >
          Delete
        </button>
      )}
    </div>
  );
}


export default MedicineCard;    
