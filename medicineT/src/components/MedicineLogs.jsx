import { useEffect, useState } from "react";
import FetchData from "../utils/FetchData";
import styles from "../style/MedicineLogs.module.css";

function MedicineLogs({medicineId}){
    const [logs, setLogs] = useState([]);


    useEffect(() => {
        FetchData(`/medicines/${medicineId}/logs`)
        .then(data => setLogs(data))
        .catch(err => console.error(err))
    }, [medicineId]);

    return(
        <div className={styles.logsBox}>
            <h2>Logs</h2>

            {logs.length === 0 && <p>No logs available</p>}

            {logs.map(log => (
                <div>
                    <p>{log.takenAt}</p>
                    <p>Dose: {log.dose} mg</p>
                </div>    
            ))}

        </div>
    );

}

export default MedicineLogs;