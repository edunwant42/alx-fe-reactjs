import { useQuery } from "react-query";
import axios from "axios";

const fetchPosts = async () => {
  const { data } = await axios.get("https://jsonplaceholder.typicode.com/posts");
  return data;
};

export default function PostsComponent() {
  const {
    data: posts,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery("posts", fetchPosts);

  if (isLoading) return <p>Loading posts...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1 className="text-xl font-bold">Posts</h1>
      <button
        onClick={() => refetch()}
        className="px-3 py-1 bg-blue-500 text-white rounded mt-2"
      >
        Refetch Posts
      </button>
      <ul className="mt-4">
        {posts.slice(0, 10).map((post) => (
          <li key={post.id} className="border p-2 mb-2 rounded">
            <h2 className="font-semibold">{post.title}</h2>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
