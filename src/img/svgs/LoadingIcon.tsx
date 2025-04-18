import styles from "./loadingIcon.module.css";
export default function LoadingIcon() {
  return (
    <div className={styles.spinner}>
      <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 62.08 71.68">
        <polygon className="a" points="30.04 59.7 10.87 48.64 1 54.34 30.04 71.1 30.04 59.7" />
        <polygon className="b" points="61.08 54.34 51.2 48.64 32.04 59.7 32.04 71.1 61.08 54.34" />
        <polygon className="c" points="52.2 24.77 52.2 46.91 62.08 52.6 62.08 19.07 52.2 24.77" />
        <polygon className="d" points="32.04 0.58 32.04 11.97 51.2 23.04 61.08 17.34 32.04 0.58" />
        <polygon className="e" points="1 17.34 10.87 23.04 30.04 11.97 30.04 0.58 1 17.34" />
        <polygon className="f" points="9.87 46.91 9.87 24.77 0 19.07 0 52.6 9.87 46.91" />
      </svg>
    </div>
  );
}
