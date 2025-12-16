import styles from "../style/MedicineCard.module.css";

function MedicineCard({ medicine, onClick }) {
  return (
    <div className={styles.card} onClick={onClick}>
      <h3>{medicine.name}</h3>
      <p>Type: {medicine.type}</p>
      <p>{medicine.symptomDescription}</p>
    </div>
  );
}

export default MedicineCard;    
