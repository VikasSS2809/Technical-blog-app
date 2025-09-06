import React from 'react';
import PostCard from './PostCard';

const PostList = ({ posts, title, loading }) => {
  if (loading) {
    return <p className="text-center text-gray-500 mt-8">Loading posts...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center my-8">{title}</h1>
      {posts.length === 0 ? (
        <p className="text-center text-gray-500">No posts to display.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map(post => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PostList;