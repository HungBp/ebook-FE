import { useContext, useRef, useState } from "react";
import { LoginContext } from "../../../contextProvider/LoginContextProvider";
import styles from "./Login.module.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const {setIsLogin} = useContext(LoginContext);
  const passwordRef = useRef(false);

  function handleSubmit(event) {
    event.preventDefault();
    
    const data = {username, password};
    const reqOption = {
      method: "POST",
      header: {"Content-Type": "application/json"},
      body: JSON.stringify(data)
    };

    setError("");
    fetch("/admin/login", reqOption)
      .then(res => res.json().then(data => {
        if (!res.ok) {
          throw data.error;
        } else {
          setError("");
          setIsLogin(true);
          sessionStorage.setItem("token", data.token);
        }
      }))
      .catch(err => setError(err));
  }

  function handleShowClick(event) {
    passwordRef.current.type = (passwordRef.current.type === "text") ? "password" : "text";
    event.target.src = event.target.src.includes("/assets/visible.png") ? "/assets/invisible.png" : "/assets/visible.png";
  }

  return (
    <div className={styles.login}>
      <div className={styles.frame}>
        <form onSubmit={handleSubmit}>
          <div className={styles.section}>
            <label className={styles.label} htmlFor="username"><h2 className={styles.heading}> Username </h2></label>
            <input type="text" name="username" id="username" value={username} autoComplete="off" required className={styles.input} onChange={(event) => setUsername(event.target.value)} />
          </div>

          <div className={styles.section}>
            <label className={styles.label} htmlFor="password"><h2 className={styles.heading}> Password </h2></label>
            <input type="password" name="password" id="password" value={password} ref={passwordRef} autoComplete="off" required className={styles.input} onChange={(event) => setPassword(event.target.value)} />
            <div onClick={handleShowClick}><img className={styles.icon}  src="/assets/visible.png" alt="" /></div>
          </div>

          <button className={styles.loginBtn} type="submit"> Login </button>
        </form>

        {error && <p className={styles.passwordMatch}>{error}</p> }
      </div>
    </div>
  );
}

export default Login;