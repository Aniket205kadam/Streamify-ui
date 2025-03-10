import React, { useEffect, useState } from "react";
import "./Posts.scss";
import PostPreview from "../post/PostPreview";
import Loading from "../icons/Loading";
import postService from "../../services/postService";
import useAuthToken from "../../hooks/useAuthToken";
import NotFoundTv from "../3D-componets/NotFoundTv"
import DogAnimation from "../3D-componets/dogAnimation";

function Posts() {
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [start, setStart] = useState(true);
  const [error, setError] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);
  const authToken = useAuthToken();
  const [noPost, setNoPost] = useState(false);

  const handleInfiniteScroll = async () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setLoading(true);
      await delay(2000);
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    if (isLastPage) return;
    const fetchPosts = async () => {
      setLoading(true);
      const size = 5;
      const response = await postService.getFollowingsPosts(
        page,
        size,
        authToken
      );
      if (!response.success) {
        setError(response.error);
        setLoading(false);
        return;
      }

      if (response.data.content.length === 0 && response.data.first) {
        setNoPost(true);
      }

      setPosts((prevPosts) => {
        const newPosts = response.data.content.filter(
          (newPost) => !prevPosts.some((prevPost) => prevPost.id === newPost.id)
        );

        return [...prevPosts, ...newPosts];
      });

      setIsLastPage(response.data.last);
      console.log("status: ", response.data.last)
      setLoading(false);
      setStart(false);
    };

    fetchPosts();
  }, [page, authToken, isLastPage]);

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => {
      window.removeEventListener("scroll", handleInfiniteScroll);
    };
  }, []);

  if (start) {
    return <h1>Loading...</h1>;
  }

  // if (!start && noPost) {
  //   return (
  //     <div className="no-post">
  //       <DogAnimation />
  //     </div>
  //   )
  // }

  return (
    <div className="posts">
      {posts.map((post) => (
          <PostPreview key={post.id} post={post} />
      ))}
      {!isLastPage && loading && <Loading top={80} />}
    </div>
  );
}

export default Posts;