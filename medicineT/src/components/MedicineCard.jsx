import styles from "../style/MedicineCard.module.css";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";


function MedicineCard({ medicine, onClick, onDelete, onAddLog, onEdit, canDelete, canEdit, canAddLog }) {
  const { roles } = useContext(AuthContext);
  const isAdmin = roles?.toLowerCase().includes("admin");

  return (
    <div className={styles.card} onClick={onClick}>

      {isAdmin && medicine.user && (
        <p><strong>User:</strong> {medicine.user.username}</p>
      )}

      <h3>{medicine.name}</h3>
      <p>Type: {medicine.type}</p>
      <p>{medicine.symptomDescription}</p>

     <div className={styles.actions}>
        {canAddLog && (
          <button className={styles.button}
            onClick={(e) => {
              e.stopPropagation();
              onAddLog(medicine);
            }}
          >
            Add Log
          </button>
        )}

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

        {canEdit && (
          <button
            className={styles.button}
            onClick={(e) => {
              e.stopPropagation();
              onEdit(medicine);
            }}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
}

export default MedicineCard;
