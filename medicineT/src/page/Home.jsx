import styles from "../style/Home.module.css";
import medicine from "../assets/medicine.png";

function Home() {
  return (
    <div className={styles.container}>
      <h1>Medicine Tracking Application</h1>

       <div className={styles.imageWrapper}>
        <img src={medicine} alt="medicine" />
      </div>

      <p className={styles.text}>
        This application is designed to help users track their daily medicine intake.
        Users can register their own medicines and keep an overview of what they take,
        when they take it, and in what dosage.
      </p>

      <p className={styles.text}>
        The application also allows users to edit and delete their registered medicines.
        Doctors can be given access to the user’s medicine data, making it easier for them
        to monitor the user’s intake and get a clear overview of the current medication.
     </p>

    </div>
  );
}

export default Home;
