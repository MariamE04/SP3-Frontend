import truck from "../assets/truck.png.avif";
import styles from "../styles/Home.module.css";

function Home() {
  return (
    <div className={styles.container}>
      <h1>Trucking Company</h1>

      <div className={styles.imageWrapper}>
        <img src={truck} alt="truck" />
      </div>

      <p className={styles.text}>
          testtt
      </p>

      <p className={styles.text}>
       test
     </p>

    </div>
  );
}

export default Home;
