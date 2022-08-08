import styles from "./Footer.module.css";

function Footer() {
  return ( 
    <footer className={styles.footer}>
      <p className={styles.para}> Copyright 2022 </p>
      <p className={styles.para}> Privacy Policy | Terms &amp; Conditions | Accessibility </p>
      <div className={styles.container}>
        <a href="https://github.com/HungBp" target="_blank" rel="noreferrer">
          <img className={styles.icon} src="/assets/github.png" alt="GitHub" />
        </a>
        <a href="https://www.linkedin.com/in/hungbui95/" target="_blank" rel="noreferrer">
          <img className={styles.icon} src="/assets/linkedin.png" alt="LinkedIn" />
        </a>
      </div>
    </footer>
   );
}

export default Footer;