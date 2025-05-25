import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BlogCommentMenu from '../components/blogCommentMenu';  // Assuming BlogCommentMenu is another component you're using.

const CommentReply = ({ commentId, blogId }) => {
  const [showReply, setShowReply] = useState(false);
  const [replies, setReplies] = useState([]);  // Initial state for replies

  // Function to fetch replies from the backend
  useEffect(() => {
    const fetchCommentReply = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3333/blog/comment/fatchblogcommentreply/${blogId}/${commentId}`,
          { withCredentials: true }
        );
        if (response.status === 200) {
          setReplies(response.data.reply);  // Update state with fetched replies
          console.log(response.data.reply);  // Optional: Log the replies
        }
      } catch (error) {
        console.log('fetchCommentReply error', error);
      }
    };
    fetchCommentReply();
  }, [commentId, blogId]);  // Re-fetch when commentId or blogId changes

  return (
    <div>
      {/* Toggle reply visibility */}
      <button onClick={() => setShowReply(!showReply)}>
        {showReply ? 'Hide Replies' : 'Show Replies'}
      </button>

      {/* Render replies if available and showReply is true */}
      {showReply && replies.length > 0 && (
        <div className="space-y-4 mt-2 w-[30vw] ">
          {replies.map((item, index) => (
            <div key={index} className="bg-gray-700 p-4 rounded-lg shadow flex gap-4">
              <img
                src={item.replyUserId?.userImage?.url}  // Ensure this path is correct for user image
                alt="User"
                className="w-12 h-12 rounded-full border border-gray-300"
              />
              <div className="flex space-x-4">
                <div>
                  <p className="text-shadow-white font-semibold">
                    {item.replyUserId?.username}
                  </p>
                  {/* Check field name for comment text (userComment or commentText) */}
                  <p className="text-white">{item.replyComment}</p>
                  <p className="text-sm text-shadow-white mt-1">
                    {new Date(item.createdAt).toLocaleString()}
                  </p>
                </div>
                <div>
                  {/* Ensure BlogCommentMenu component accepts the required props */}
                  <BlogCommentMenu commentId={item._id} blogId={blogId} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentReply;
