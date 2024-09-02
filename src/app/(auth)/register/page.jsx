import { register } from "@/lib/action";
import styles from "./register.module.css";
import RegisterFrom from "@/components/registerForm/registerForm";
const RegisterPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <RegisterFrom />
      </div>
    </div>
  );
};

export default RegisterPage;
