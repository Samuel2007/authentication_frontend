import styles from "./page.module.css";
import LoginForm from "./components/LoginForm";

export default function Home() {
  return (
    <div className={styles.page}>
      <div style={{ marginTop: 24 }}>
        <LoginForm />
      </div>
    </div>
  );
}
