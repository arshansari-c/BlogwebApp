import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import BlogCommentMenu from './blogCommentMenu';
import BlogCommentLikeDislike from './BlogCommentLikeandDislike';
import CommentReply from './CommentReply';
import CommentReplyBox from './commentReplyBox';

const BlogComment = ({ blogId }) => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [replyCommentId, setReplyCommentId] = useState(null);

  const fetchBlogComments = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3333/blog/comment/fatchcommentblog/${blogId}`,
        { withCredentials: true }
      );
      if (response.status === 200) {
        setComments(response.data.comments);
      }
    } catch (error) {
      console.log('Fetch blog comments error', error);
    }
  };

  const submitHandle = async () => {
    if (!comment.trim()) return toast.error("Comment cannot be empty");
    try {
      setLoading(true);
      const response = await axios.post(
        `http://localhost:3333/blog/comment/uploadcomment/${blogId}`,
        { comment },
        { withCredentials: true }
      );
      if (response.status === 200) {
        toast.success('Comment uploaded successfully');
        setComment('');
        fetchBlogComments();
      } else {
        toast.error(response.data.message || 'Something went wrong');
      }
    } catch (error) {
      console.log('Comment submit error', error);
      toast.error('Failed to upload comment');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogComments();
  }, [blogId]);

  return (
    <div className="w-[70%] mx-auto mt-10">
      {/* Comment Input */}
      <div className="bg-gray-700 text-white p-4 rounded-xl shadow mb-6 flex items-center gap-4">
        <input
          type="text"
          placeholder="Write your comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={submitHandle}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-white text-center">No comments yet. Be the first to comment!</p>
        ) : (
          comments.map((item, index) => (
            <div
              key={index}
              className="bg-gray-700 p-4 rounded-lg shadow flex gap-4"
            >
              <img
                src={item.commentUserId?.userImage?.url}
                alt="User"
                className="w-12 h-12 rounded-full border border-gray-300"
              />
              <div className="flex justify-between w-full">
                <div>
                  <p className="text-shadow-white font-semibold">{item.commentUserId?.username}</p>
                  <p className="text-white">{item.userComment || item.commentText}</p>
                  <p className="text-sm text-shadow-white mt-1">{new Date(item.createdAt).toLocaleString()}</p>
                  <BlogCommentLikeDislike blogId={blogId} commentId={item._id} />
                  <button
                    onClick={() => setReplyCommentId(item._id)}
                    className="text-blue-400 hover:underline mt-1"
                  >
                    Reply
                  </button>
                  <CommentReply commentId={item._id} blogId={blogId} />
                </div>
                <BlogCommentMenu commentId={item._id} blogId={blogId} refetch={fetchBlogComments} />
              </div>
            </div>
          ))
        )}
      </div>

      {/* Reply Modal */}
      {replyCommentId && (
        <CommentReplyBox
          blogId={blogId}
          commentId={replyCommentId}
          refetch={fetchBlogComments}
          onClose={() => setReplyCommentId(null)}
        />
      )}
    </div>
  );
};

export default BlogComment;
