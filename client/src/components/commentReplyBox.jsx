import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const CommentReplyBox = ({ blogId, commentId, refetch }) => {
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [replyComment, setReplyComment] = useState(true); // Assuming you want to show modal by default

  const CommentReply = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:3333/blog/comment/commentrepley/${blogId}/${commentId}`,
        { reply },
        { withCredentials: true }
      );

      if (response.status === 200) {
        toast.success("Reply uploaded successfully");
        setReplyComment(false);
        setReply('');
        if (refetch) refetch();
      } else {
        toast.error(response.data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Comment reply error", error);
      toast.error("Failed to upload reply comment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {replyComment && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md mx-4">
            <h2 className="text-white text-lg mb-4">Reply Comment</h2>
            <input
              type="text"
              required
              onChange={(e) => setReply(e.target.value)}
              value={reply}
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Write your reply..."
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setReplyComment(false)}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
              >
                Cancel
              </button>
              <button
                onClick={CommentReply}
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentReplyBox;
