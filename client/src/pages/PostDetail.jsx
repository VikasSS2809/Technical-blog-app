import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const PostDetail = () => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { id } = useParams();
  const token = localStorage.getItem('token');

  const fetchPostAndComments = async () => {
    try {
      const postRes = await axios.get(`http://localhost:5000/api/posts/${id}`);
      setPost(postRes.data);
      const commentsRes = await axios.get(`http://localhost:5000/api/posts/${id}/comments`);
      setComments(commentsRes.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load post or comments.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPostAndComments();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!token || !newComment.trim()) {
      return;
    }
    try {
      const res = await axios.post(
        `http://localhost:5000/api/posts/${id}/comments`,
        { content: newComment },
        { headers: { 'x-auth-token': token } }
      );
      setComments([...comments, res.data]);
      setNewComment('');
    } catch (err) {
      console.error('Failed to add comment:', err);
      setError('Failed to add comment.');
    }
  };

  if (loading) return <p className="text-center text-gray-500 mt-8">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-8">{error}</p>;
  if (!post) return <p className="text-center text-gray-500 mt-8">Post not found.</p>;

  return (
    <div className="container mx-auto mt-10 p-8 bg-white rounded-lg shadow-lg max-w-4xl">
      <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-6">By {post.author} on {new Date(post.createdAt).toLocaleDateString()}</p>
      <div className="text-gray-800 leading-relaxed whitespace-pre-wrap">{post.content}</div>
      <hr className="my-8" />
      <h2 className="text-2xl font-bold mb-4">Comments ({comments.length})</h2>
      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-gray-500">No comments yet. Be the first!</p>
        ) : (
          comments.map(comment => (
            <div key={comment._id} className="bg-gray-100 p-4 rounded-lg">
              <p className="font-semibold">{comment.author}</p>
              <p className="text-sm text-gray-500">{new Date(comment.createdAt).toLocaleDateString()}</p>
              <p className="mt-2 text-gray-800">{comment.content}</p>
            </div>
          ))
        )}
      </div>
      {token && (
        <form onSubmit={handleCommentSubmit} className="mt-6">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="w-full h-24 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
          <button type="submit" className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
            Add Comment
          </button>
        </form>
      )}
      <div className="mt-8">
        <Link to="/" className="text-blue-600 hover:underline">← Back to all posts</Link>
      </div>
    </div>
  );
};

export default PostDetail;