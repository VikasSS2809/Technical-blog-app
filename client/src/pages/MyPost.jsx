import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const MyPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const fetchMyPosts = async () => {
    if (!token) {
      navigate('/login');
      return;
    }
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/posts/my-posts', {
        headers: { 'x-auth-token': token },
      });
      setPosts(res.data);
    } catch (err) {
      console.error('Failed to fetch your posts:', err);
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyPosts();
  }, [navigate, token]);

  const handleDelete = async (postId) => {
    try {
      if (window.confirm('Are you sure you want to delete this post?')) {
        await axios.delete(`http://localhost:5000/api/posts/${postId}`, {
          headers: { 'x-auth-token': token },
        });
        setPosts(posts.filter(post => post._id !== postId));
      }
    } catch (err) {
      console.error('Failed to delete post:', err);
      alert('Failed to delete post.');
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500 mt-8">Loading your posts...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center my-8">My Posts</h1>
      {posts.length === 0 ? (
        <p className="text-center text-gray-500">You haven't created any posts yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map(post => (
            <div key={post._id} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
              <p className="text-sm text-gray-500 mb-4">By {post.author}</p>
              <p className="text-gray-700 mb-4 line-clamp-3">{post.content}</p>
              <div className="flex space-x-2">
                <Link
                  to={`/posts/edit/${post._id}`}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(post._id)}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                >
                  Delete
                </button>
                <Link
                  to={`/posts/${post._id}`}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPosts;