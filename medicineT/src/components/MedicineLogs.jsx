import { useEffect, useState } from "react";
import FetchData from "../utils/FetchData";
import styles from "../style/MedicineLogs.module.css";

function MedicineLogs({ medicine }) {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!medicine) return;

    FetchData(`/medicineLog`)  // hent alle logs
      .then(data => {
        // filtrer logs for kun denne medicine
        const filteredLogs = (data || []).filter(
          log => log.medicineName === medicine.name
        );
        setLogs(filteredLogs);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLogs([]);
        setLoading(false);
      });
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

      {logs.length === 0 && <p>No logs available</p>}

      {logs.map((log, index) => (
        <div key={index} className={styles.logEntry}>
          <p>Taken at: {log.takenAt}</p>
          <p>Dose: {log.dose} mg</p>
          <button onClick={() => handleDeleteLog(log.id)}>Delete log</button>
        </div>
      ))}
    </div>
  );
}

export default MedicineLogs;
