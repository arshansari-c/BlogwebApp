import React, { useEffect, useState } from 'react';
import { FaHeart, FaRegStar, FaShare } from 'react-icons/fa';
import { IoMdDownload, IoMdHeartDislike } from 'react-icons/io';
import axios from 'axios';

const SingleBlogIcons = ({ blogId }) => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3333/blog/checkbloglikeordislike/${blogId}`,
          { withCredentials: true }
        );
        setLiked(res.data.liked || false);
        setDisliked(res.data.disliked || false);
      } catch (err) {
        console.error('Error checking like/dislike status:', err);
      }
    };

    fetchStatus();
  }, [blogId]);

  const handleLike = async () => {
    try {
      await axios.post(
        `http://localhost:3333/blog/likeblog/${blogId}`,
        {},
        { withCredentials: true }
      );
      setLiked(true);
      setDisliked(false);
    } catch (err) {
      console.error('Error liking blog:', err);
    }
  };

  const handleRemoveLike = async () => {
    try {
      await axios.delete(
        `http://localhost:3333/blog/deletebloglike/${blogId}`,
        { withCredentials: true }
      );
      setLiked(false);
    } catch (err) {
      console.error('Error removing like:', err);
    }
  };

  const handleDislike = async () => {
    try {
      await axios.post(
        `http://localhost:3333/blog/dislikeblog/${blogId}`,
        {},
        { withCredentials: true }
      );
      setDisliked(true);
      setLiked(false);
    } catch (err) {
      console.error('Error disliking blog:', err);
    }
  };

  const handleRemoveDislike = async () => {
    try {
      await axios.delete(
        `http://localhost:3333/blog/deleteblogdislike/${blogId}`,
        { withCredentials: true }
      );
      setDisliked(false);
    } catch (err) {
      console.error('Error removing dislike:', err);
    }
  };

  return (
    <div className="flex m-4">
      <div className="m-3">
        {liked ? (
          <FaHeart size={34} color="blue" onClick={handleRemoveLike} />
        ) : (
          <FaHeart size={34} color="white" onClick={handleLike} />
        )}
      </div>
      <div className="m-3">
        {disliked ? (
          <IoMdHeartDislike size={34} color="blue" onClick={handleRemoveDislike} />
        ) : (
          <IoMdHeartDislike size={34} color="white" onClick={handleDislike} />
        )}
      </div>
      <div className="m-3">
        <FaRegStar size={34} color="white" />
      </div>
      <div className="m-3">
        <IoMdDownload size={34} color="white" />
      </div>
      <div className="m-3">
        <FaShare size={34} color="white" />
      </div>
    </div>
  );
};

export default SingleBlogIcons;
