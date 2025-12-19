import styles from "../style/MedicineCard.module.css";

function MedicineCard({ medicine, onClick, onDelete, onAddLog, onEdit, canDelete }) {
  return (
    <div className={styles.card} onClick={onClick}>
      <h3>{medicine.name}</h3>
      <p>Type: {medicine.type}</p>
      <p>{medicine.symptomDescription}</p>

      <div className={styles.actions}>
        <button className={styles.button}
          onClick={(e) => {
            e.stopPropagation();
            onAddLog(medicine);
          }}
        >
          Add Log
        </button>

        {canDelete && (
          <button className={styles.button}
            onClick={(e) => {
              e.stopPropagation();
              onDelete(medicine.id);
            }}
          >
            Delete
          </button>
        )}

        <button
          className={styles.button}
          onClick={(e) => {
            e.stopPropagation();
            onEdit(medicine);
          }}
        >
          Edit
        </button>

      </div>
    </div>
  );
}

export default MedicineCard;
