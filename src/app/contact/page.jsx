import Image from "next/image";
import styles from "./contact.module.css";
import { addContant } from "@/lib/action";

export const metadata = {
  title: "Contact Page",
  description: "Contact description",
};
const ContactPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image src="/contact.png" alt="" fill />
      </div>
      <div className={styles.formContainer}>
        <form action={addContant} className={styles.form}>
          <input type="text" placeholder="Name and surname" name="name" />
          <input
            type="text"
            placeholder="Email Address (Optional)"
            name="email"
          />
          <input type="text" placeholder="Phone Number " name="phone" />
          <textarea
            name="content"
            id=""
            cols="30"
            rows="10"
            placeholder="Message"
          ></textarea>
          <button>Send</button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
