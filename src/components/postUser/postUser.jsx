import { getUser } from "@/lib/data";
import styles from "./postUser.module.css";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// FETCH DATA WITH AN API
// const getData = async (userId) => {
//   const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}` ,{cache:"no-store"});

//   if (!res.ok) {
//     throw new Error("Something went wrong");
//   }

//   return res.json();
// };

const PostUser = async ({ userId }) => {
  // FETCH DATA WITH AN API
  // const user = await getData(userId);

  // FETCH DATA WITHOUT AN API
  const user = await getUser(userId);
  console.log("user====", user);

  return (
    <div className={styles.container}>
      <Avatar>
        <AvatarImage src={user.img || "/noAvatar.png"} alt="@shadcn" />
        <AvatarFallback>USER</AvatarFallback>
      </Avatar>
      <div className={styles.texts}>
        <span className={styles.title}>Author</span>
        <span className={styles.username}>{user?.username}</span>
      </div>
    </div>
  );
};

export default PostUser;
