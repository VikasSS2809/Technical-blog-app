import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ImageGallery from '../components/ImageGallery';

const Dashboard = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [images, setImages] = useState([]);
  const [galleryLoading, setGalleryLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchImages = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    setGalleryLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/images', {
        headers: { 'x-auth-token': token },
      });
      setImages(res.data);
    } catch (err) {
      console.error('Failed to fetch images:', err);
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      }
      setError('Failed to load gallery.');
    } finally {
      setGalleryLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleGenerateImage = async (e) => {
    e.preventDefault();
    setIsGenerating(true);
    setError('');
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const res = await axios.post(
        'http://localhost:5000/api/images/generate',
        { prompt },
        {
          headers: { 'x-auth-token': token },
        }
      );
      // Add the new image to the top of the gallery
      setImages([res.data.image, ...images]);
      setPrompt('');
    } catch (err) {
      console.error('Image generation failed:', err.response?.data?.message || err.message);
      setError(err.response?.data?.message || 'Image generation failed. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Generate an Image</h2>
        <form onSubmit={handleGenerateImage} className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="prompt">
              Enter a prompt for the AI:
            </label>
            <input
              type="text"
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="e.g., A futuristic city in the style of Van Gogh"
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
              isGenerating ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
            disabled={isGenerating}
          >
            {isGenerating ? 'Generating...' : 'Generate Image'}
          </button>
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </form>
      </div>

      <ImageGallery images={images} loading={galleryLoading} />
    </div>
  );
};

export default Dashboard;