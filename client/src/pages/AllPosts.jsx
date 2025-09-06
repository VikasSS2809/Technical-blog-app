import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostList from '../components/PostList';

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const url = searchQuery ? `http://localhost:5000/api/posts?search=${encodeURIComponent(searchQuery)}` : 'http://localhost:5000/api/posts';
        const res = await axios.get(url);
        setPosts(res.data);
      } catch (err) {
        console.error('Failed to fetch posts:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [searchQuery]);

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold text-center my-8">All Blog Posts</h1>
        <input
          type="text"
          placeholder="Search for posts by title, content, or author..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-2xl px-4 py-2 mb-8 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>
      <PostList posts={posts} loading={loading} />
    </div>
  );
};

export default AllPosts;