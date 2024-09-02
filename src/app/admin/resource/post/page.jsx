import styles from "./post.module.css";
import AdminPosts from "@/components/adminPosts/adminPosts";
import AdminPostForm from "@/components/adminPostForm/adminPostForm";
import { Suspense } from "react";
import { auth } from "@/lib/auth";

const Post = async () => {
  const session = await auth();

  return (
    <div className={styles.row}>
      <div className={styles.col}>
        <Suspense fallback={<div>Loading...</div>}>
          <AdminPosts />
        </Suspense>
      </div>
      <div className={styles.col}>
        <AdminPostForm userId={session?.user?.id} />
      </div>
    </div>
  );
};

export default Post;
