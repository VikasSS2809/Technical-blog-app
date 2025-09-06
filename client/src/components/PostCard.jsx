import React from 'react';
import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
  const formattedDate = new Date(post.createdAt).toLocaleDateString();

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">{post.title}</h2>
      <p className="text-sm text-gray-500 mb-4">By {post.author} on {formattedDate}</p>
      <p className="text-gray-700 mb-4 line-clamp-3">{post.content}</p>
      <Link to={`/posts/${post._id}`} className="text-blue-600 hover:underline">Read More</Link>
    </div>
  );
};

export default PostCard;