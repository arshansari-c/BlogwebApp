
// BlogCommentLikeDislike.jsx
import React, { useEffect, useState } from 'react';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import axios from 'axios';

const BlogCommentLikeDislike = ({ commentId, blogId }) => {
  const [likedAndDisliked, setLikedAndDislike] = useState({ liked: false, disliked: false });

  useEffect(() => {
    const checkLikeAndDisliked = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3333/blog/comment/checkcommentlike/${blogId}/${commentId}`,
          { withCredentials: true }
        );
        if (response.status === 200) {
          setLikedAndDislike(response.data);
        }
      } catch (error) {
        console.error("checkLikeAndDislike error", error);
      }
    };

    checkLikeAndDisliked();
  }, [commentId, blogId]);

  const handleLike = async () => {
    if (likedAndDisliked.liked) {
      try {
        await axios.delete(
          `http://localhost:3333/blog/comment/deletecommentlike/${blogId}/${commentId}`,
          { withCredentials: true }
        );
        setLikedAndDislike({ ...likedAndDisliked, liked: false });
      } catch (error) {
        console.log("removeLike error", error);
      }
    } else {
      try {
        await axios.post(
          `http://localhost:3333/blog/comment/likedblogcomment/${blogId}/${commentId}`,
          {},
          { withCredentials: true }
        );
        setLikedAndDislike({ liked: true, disliked: false });
      } catch (error) {
        console.log("handleLike error", error);
      }
    }
  };

  const handleDislike = async () => {
    if (likedAndDisliked.disliked) {
      try {
        await axios.delete(
          `http://localhost:3333/blog/comment/deletecommentdislike/${blogId}/${commentId}`,
          { withCredentials: true }
        );
        setLikedAndDislike({ ...likedAndDisliked, disliked: false });
      } catch (error) {
        console.log("removeDislike error", error);
      }
    } else {
      try {
        await axios.post(
          `http://localhost:3333/blog/comment/dislikeblogcomment/${blogId}/${commentId}`,
          {},
          { withCredentials: true }
        );
        setLikedAndDislike({ liked: false, disliked: true });
      } catch (error) {
        console.log("handleDislike error", error);
      }
    }
  };

  return (
    <div className="flex items-center gap-4 mt-2 text-white">
      <button onClick={handleLike} className="hover:text-blue-400 flex items-center gap-1">
        <FaThumbsUp color={likedAndDisliked.liked ? "red" : "white"} />
      </button>
      <button onClick={handleDislike} className="hover:text-red-400 flex items-center gap-1">
        <FaThumbsDown color={likedAndDisliked.disliked ? "red" : "white"} />
      </button>
    </div>
  );
};

export default BlogCommentLikeDislike;
