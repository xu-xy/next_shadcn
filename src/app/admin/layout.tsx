import Link from "next/link";
import styles from "./admin.module.css";
import SlideMenubar from "@/components/slideMenubar/slideMenubar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className={styles.main}>
      <div className={styles.leftSubject}>
        {/* <h2> 资源菜单列表</h2>
        <Link href={"/admin/resource/user"}>用户列表</Link>
        <Link href={"/admin/resource/post"}>卡片列表</Link> */}
        <SlideMenubar />
      </div>
      <div className={styles.rightSubject}>{children}</div>
    </section>
  );
}
