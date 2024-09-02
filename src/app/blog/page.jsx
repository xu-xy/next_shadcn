import PostCard from "@/components/postCard/PostCard";
import styles from "./blog.module.css";
import { getPosts } from "@/lib/data";

const getData = async () => {
  const res = await fetch("http://localhost:3000/api/blog", {
    next: { revalidate: 3600 },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch posts!");
  }
  return res.json();
};

const BlogPage = async () => {
  //FETCH DATA WITH AN API
  const posts = await getData();
  //console.log("posts====", posts);

  //FETCH DATA WITHOUT AN API
  //const posts = await getPosts();

  return (
    <div className={styles.container}>
      {posts?.map((post) => (
        <div className={styles.post} key={post.id}>
          <PostCard post={post} />
        </div>
      ))}
    </div>
  );
};

export default BlogPage;
