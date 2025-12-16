import { useEffect, useState } from "react";
import FetchData from "../utils/FetchData";
import styles from "../style/MedicineLogs.module.css";

function MedicineLogs({ medicineId }) {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!medicineId) return;

    setLoading(true);

    FetchData(`/logs?medicineId=${medicineId}`)
      .then(data => {
        setLogs(data || []); // tom array hvis ingen logs
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLogs([]); // fallback
        setLoading(false);
      });
  }, [medicineId]);

  if (loading) return <p>Loading logs...</p>;

  return (
    <div className={styles.logsBox}>
      <h2>Logs for Medicine #{medicineId}</h2>

      {logs.length === 0 && <p>No logs available</p>}

      {logs.map((log, index) => (
        <div key={index} className={styles.logEntry}>
          <p>Taken at: {log.takenAt}</p>
          <p>Dose: {log.dose} mg</p>
        </div>
      ))}
    </div>
  );
}

export default MedicineLogs;
