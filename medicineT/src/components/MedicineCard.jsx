import styles from "../style/MedicineCard.module.css";

function MedicineCard({ medicine, onClick, onDelete, onAddLog, canDelete }) {
  return (
    <div className={styles.card} onClick={onClick}>
      <h3>{medicine.name}</h3>
      <p>Type: {medicine.type}</p>
      <p>{medicine.symptomDescription}</p>

      <div className={styles.actions}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddLog(medicine);
          }}
        >
          Add Log
        </button>

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
    </div>
  );
}

export default MedicineCard;
