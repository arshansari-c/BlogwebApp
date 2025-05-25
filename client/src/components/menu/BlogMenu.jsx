// components/BlogMenu.jsx
import React, { useState } from 'react';
import { FiMoreVertical } from 'react-icons/fi';

const BlogMenu = ({ onDelete, onUpdate, onAdd }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative text-white">
      <button onClick={() => setOpen(!open)}>
        <FiMoreVertical className="text-xl hover:text-purple-400" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-gray-800 rounded-xl shadow-lg z-50 p-2">
          <button
            onClick={() => { setOpen(false); onDelete(); }}
            className="block w-full text-left px-4 py-2 hover:bg-gray-700 rounded"
          >
            Delete
          </button>
          <button
            onClick={() => { setOpen(false); onUpdate(); }}
            className="block w-full text-left px-4 py-2 hover:bg-gray-700 rounded"
          >
            Update
          </button>
          <button
            onClick={() => { setOpen(false); onAdd(); }}
            className="block w-full text-left px-4 py-2 hover:bg-gray-700 rounded"
          >
            Add
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogMenu;
