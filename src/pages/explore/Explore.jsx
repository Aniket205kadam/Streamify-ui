import React, { useEffect, useState } from "react";
import PostCard from "../../components/post/PostCard";
import "./Explore.scss";
import Loading from "../../components/icons/Loading";
import postService from "../../services/postService";
import useAuthToken from "../../hooks/useAuthToken";
import { toast } from "react-toastify";

function Explore() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const [loading, setLoading] = useState(true);
  const authToken = useAuthToken();

  const handleInfiniteScroll = async () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      if (!isLastPage) {
        setLoading(true);
        setPage((prevPage) => prevPage + 1);
      }
    }
  };

  useEffect(() => {
    if (isLastPage) {
      setLoading(false);
      return;
    }

    (async () => {
      const postResponse = await postService.getExploreContent(
        page,
        10,
        authToken
      );
      if (!postResponse.success) {
        toast.error(postResponse.error);
        return;
      }
      setPosts((prevPost) => {
        const mergedPosts = [...prevPost, ...postResponse.data.content];
        return Array.from(
          new Map(mergedPosts.map((post) => [post.id, post])).values()
        );
      });
      setIsLastPage(postResponse.data.last);
      setLoading(false);
    })();
  }, [page]);

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => {
      window.removeEventListener("scroll", handleInfiniteScroll);
    };
  }, []);

  return (
    <div className="posts-container">
      {posts.map((post) => (
        <div key={post.id}>
          <PostCard post={post} key={post.id} />
        </div>
      ))}
      {loading && <Loading top={80} />}
    </div>
  );
}

export default Explore;
