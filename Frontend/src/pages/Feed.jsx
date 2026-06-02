import { useEffect, useState } from "react";
import axios from "axios";

const Feed = () => {
  const [posts, setPost] = useState([]);
  //Remove button par click  work
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/posts"); // backend se posts ko fetch krna
        setPost(res.data.posts); // posts ko state me set krna
      } catch (error) {
        console.log(error);
      }
    };

    fetchPosts(); // component ke mount hote hi posts ko fetch krna
  }, []);



  //Remove button par click  work
  const handleDeletePost = async (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      setDeletingId(postId);
      try {
        await axios.delete(`http://localhost:5000/posts/${postId}`);
        setPost(posts.filter((post) => post._id !== postId));
      } catch (error) {
        console.log(error);
        alert("Error deleting post");
      } finally {
        setDeletingId(null);
      }
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-8">
          Feed Page
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {posts.map((post) => {
            return (
              <article
                key={post._id}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="overflow-hidden bg-gray-200 aspect-square">
                  <img
                    src={post.image}
                    alt="post"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 sm:p-5">
                  <p className="text-gray-800 text-sm sm:text-base line-clamp-3">
                    {post.caption}
                  </p>
                  {/* Remove button par click work */}
                  <button
                    onClick={() => handleDeletePost(post._id)}
                    disabled={deletingId === post._id}
                    className="mt-4 w-full px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 font-medium rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base flex items-center justify-center gap-2"
                  >
                    {deletingId === post._id ? (
                      <>
                        <svg
                          className="animate-spin h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Removing...
                      </>
                    ) : (
                      <>
                        <svg
                          className="h-4 w-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Remove
                      </>
                    )}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Feed;
