import styles from "../page.module.css";

export const metadata = {
  title: "Now — Signed in",
};

export default function NowPage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Welcome — you are signed in</h1>
        <p className={styles.intro}>
          This is your <strong>Now</strong> page. Replace with app-specific
          content (dashboard, profile, or real-time activity).
        </p>
      </main>
    </div>
  );
}
