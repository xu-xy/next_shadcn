import styles from "./user.module.css";
import AdminUsers from "@/components/adminUsers/adminUsers";
import AdminUserForm from "@/components/adminUserForm/adminUserForm";
import { Suspense } from "react";
const User = async () => {
  return (
    <div className={styles.row}>
      <div className={styles.col}>
        <Suspense fallback={<div>Loading...</div>}>
          <AdminUsers />
        </Suspense>
      </div>
      <div className={styles.col}>
        <AdminUserForm />
      </div>
    </div>
  );
};

export default User;
