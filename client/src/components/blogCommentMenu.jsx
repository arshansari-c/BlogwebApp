import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import toast from 'react-hot-toast';

const BlogCommentMenu = ({ commentId, blogId, onDelete ,refetch}) => {
  const [comment, setComment] = useState('');
  const [updateComment, setUpdateComment] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const menuRef = useRef();

  const deleteBlogComment = async()=>{
    try {
        const response = await axios.delete(`http://localhost:3333/blog/comment/deletecomment/${blogId}/${commentId}`,{withCredentials:true})
        if(response.status===200){
          toast.success("delete succesfully")
          if(refetch) refetch()
        }else{
            toast.error(response.data.message||"Somethin wrong")
        }
    } catch (error) {
        console.log("deleteBlogComment error",error)
    }
  }
  const updateBlog = async () => {
    if (!comment.trim()) return toast.error("Comment cannot be empty");
    setLoading(true);
    try {
      const response = await axios.put(
        `http://localhost:3333/blog/comment/updatecomment/${blogId}/${commentId}`,
        { comment },
        { withCredentials: true }
      );
      if (response.status === 200) {
        toast.success("Comment updated successfully");
        setUpdateComment(false);
        setComment('');
        if(refetch) refetch()
      } else {
        toast.error(response.data.message || "Something went wrong");
      }
    } catch (error) {
      console.log("Update blog error", error);
      toast.error("Failed to update comment");
    } finally {
      setLoading(false);
    }
  };

  // Close menu when clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="text-white hover:text-gray-300"
        title="Options"
      >
        &#8942;
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-32 bg-gray-800 border border-gray-600 rounded-lg shadow-lg z-50">
          <button
            onClick={() => {
              setUpdateComment(true);
              setOpen(false);
            }}
            className="block w-full text-left px-4 py-2 text-white hover:bg-gray-700"
          >
            Update
          </button>
          <button
            onClick={() => {
              deleteBlogComment()
              setOpen(false);
            }}
            className="block w-full text-left px-4 py-2 text-red-400 hover:bg-red-600 hover:text-white"
          >
            Delete
          </button>
        </div>
      )}

      {/* Modal for updating comment */}
      {updateComment && (
        <div className="fixed inset-0  flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md mx-4">
            <h2 className="text-white text-lg mb-4">Update Comment</h2>
            <input
              type="text"
              required
              onChange={(e) => setComment(e.target.value)}
              value={comment}
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Edit your comment..."
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setUpdateComment(false)}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
              >
                Cancel
              </button>
              <button
                onClick={updateBlog}
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

export default BlogCommentMenu;
