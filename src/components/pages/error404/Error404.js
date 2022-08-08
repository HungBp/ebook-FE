import styles from "./Error404.module.css";

function Error404() {
  return (
    <div className={styles.error}>
      <p className={styles.para} >404 Error!!!</p>
      <p className={styles.para} >Page not Found</p>
    </div>
  );
}

export default Error404;