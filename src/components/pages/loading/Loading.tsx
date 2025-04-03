import { useEffect } from "react";
import { useAppState } from "../../../contexts/AppState";
import styles from "./loading.module.css";

export default function Loading({ message }: { message?: string | undefined }) {
  const [_, setAppState] = useAppState();

  useEffect(() => {
    setAppState("header", false);
    return () => {
      setAppState("header", true);
    };
  }, []);

  return (
    <main className={styles.background}>
      <h3 className={styles.title}>Loading definitions...</h3>
      <p>{message}</p>
    </main>
  );
}
