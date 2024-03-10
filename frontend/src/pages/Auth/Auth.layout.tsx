import { Outlet } from "react-router-dom";
import styles from "./Auth.module.css";

export function AuthLayout() {
  return (
    <div className={styles["layout"]}>
      <div className={styles["content"]}>
        <Outlet />
      </div>
    </div>
  );
}
