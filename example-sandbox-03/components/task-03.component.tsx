import React, { useState, useEffect, ChangeEvent } from "react";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const POSTS_PER_PAGE = 5;

export function PostFeed() {
  const [postsData, setPostsData] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    async function fetchPostsData() {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts",
        );

        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }

        const data: Post[] = await response.json();
        setPostsData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error loading posts");
        setPostsData([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPostsData();
  }, []);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const filteredPosts = postsData.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE) || 1;

  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = filteredPosts.slice(
    startIndex,
    startIndex + POSTS_PER_PAGE,
  );

  return (
    <div
      style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "600px" }}
    >
      <h2>Community Posts</h2>

      <input
        type="text"
        placeholder="Search posts by title..."
        value={searchQuery}
        onChange={handleSearchChange}
        style={{
          width: "100%",
          padding: "8px",
          marginBottom: "15px",
          boxSizing: "border-box",
        }}
      />

      {isLoading && <p>Loading posts...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!isLoading && !error && (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {paginatedPosts.length > 0 ? (
            paginatedPosts.map((post) => (
              <li
                key={post.id}
                style={{
                  borderBottom: "1px solid #ddd",
                  paddingBottom: "10px",
                  marginBottom: "10px",
                }}
              >
                <h4
                  style={{ margin: "0 0 5px 0", textTransform: "capitalize" }}
                >
                  {post.id}. {post.title}
                </h4>
                <p style={{ margin: 0, color: "#555" }}>{post.body}</p>
              </li>
            ))
          ) : (
            <p>No posts found matching "{searchQuery}"</p>
          )}
        </ul>
      )}

      {!isLoading && !error && filteredPosts.length > 0 && (
        <div
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            marginTop: "15px",
          }}
        >
          <button
            onClick={() => setCurrentPage((prev) => prev - 1)}
            disabled={currentPage <= 1}
          >
            Previous
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage >= totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
