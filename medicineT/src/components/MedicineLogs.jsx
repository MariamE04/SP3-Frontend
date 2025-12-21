import { useEffect, useState } from "react";
import FetchData from "../utils/FetchData";
import styles from "../style/MedicineLogs.module.css";

function MedicineLogs({ medicine, onEditLog }) {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!medicine) return;

    FetchData("/medicineLog")
      .then(data => {
        const filteredLogs = (data || []).filter(
          log => log.medicineName === medicine.name
      );
        setLogs(filteredLogs);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [medicine]);

  if (loading) return <p>Loading logs...</p>;

  const handleDeleteLog = (logId) => {
    if (!window.confirm("Delete this log?")) return;

    FetchData(`/medicineLog/${logId}`, "DELETE")
      .then(() => {
        setLogs(prev => prev.filter(l => l.id !== logId));
      });
  };

  return (
    <div className={styles.logsBox}>
      <h2>Logs for {medicine.name}</h2>

      {logs.map(log => (
        <div  className={styles.actions} key={log.id}>
          <p>Taken at: {log.takenAt}</p>
          <p>Dose: {log.dose} mg</p>

          <button  className={styles.button} onClick={() => onEditLog(log)}>Edit log</button>
          <button  className={styles.button} onClick={() => handleDeleteLog(log.id)}>Delete log</button>
        </div>
      ))}
    </div>
  );
}

export default MedicineLogs;
