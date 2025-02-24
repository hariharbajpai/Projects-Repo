import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, X, Camera, Trash2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

interface Photo {
  id: string;
  title: string;
  description: string;
  image_url: string;
  created_at: string;
}

const Gallery = () => {
  const { isAdmin, user } = useAuth();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [showAddPhoto, setShowAddPhoto] = useState(false);
  const [newPhoto, setNewPhoto] = useState({
    title: '',
    description: '',
    image_url: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    const { data, error } = await supabase
      .from('gallery_photos')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching photos:', error);
      return;
    }

    setPhotos(data || []);
  };

  const addPhoto = async () => {
    if (!newPhoto.title || !newPhoto.image_url) {
      setError('Title and Image URL are required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { error } = await supabase
        .from('gallery_photos')
        .insert([{
          ...newPhoto,
          created_by: user?.id
        }]);

      if (error) throw error;

      await fetchPhotos();
      setNewPhoto({ title: '', description: '', image_url: '' });
      setShowAddPhoto(false);
    } catch (error) {
      console.error('Error adding photo:', error);
      setError('Failed to add photo');
    } finally {
      setLoading(false);
    }
  };

  const deletePhoto = async (id: string) => {
    try {
      const { error } = await supabase
        .from('gallery_photos')
        .delete()
        .eq('id', id);

      if (error) throw error;

      await fetchPhotos();
    } catch (error) {
      console.error('Error deleting photo:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Gallery</h1>
          {isAdmin && (
            <button
              onClick={() => setShowAddPhoto(true)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-indigo-700 transition"
            >
              <Plus className="w-5 h-5" /> Add Photo
            </button>
          )}
        </div>

        {/* Add Photo Modal */}
        {showAddPhoto && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Add New Photo</h2>
                <button onClick={() => setShowAddPhoto(false)} className="text-gray-500 hover:text-gray-700">
                  <X className="w-6 h-6" />
                </button>
              </div>
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                  {error}
                </div>
              )}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={newPhoto.title}
                    onChange={(e) => setNewPhoto({ ...newPhoto, title: e.target.value })}
                    className="w-full border rounded-md px-3 py-2"
                    placeholder="Enter photo title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={newPhoto.description}
                    onChange={(e) => setNewPhoto({ ...newPhoto, description: e.target.value })}
                    className="w-full border rounded-md px-3 py-2"
                    placeholder="Enter photo description"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                  <input
                    type="text"
                    value={newPhoto.image_url}
                    onChange={(e) => setNewPhoto({ ...newPhoto, image_url: e.target.value })}
                    className="w-full border rounded-md px-3 py-2"
                    placeholder="Enter image URL"
                  />
                </div>
                <button
                  onClick={addPhoto}
                  disabled={loading}
                  className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition flex items-center justify-center gap-2"
                >
                  {loading ? (
                    'Adding...'
                  ) : (
                    <>
                      <Camera className="w-5 h-5" /> Add Photo
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Photos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="relative aspect-w-16 aspect-h-9">
                <img
                  src={photo.image_url}
                  alt={photo.title}
                  className="w-full h-64 object-cover"
                />
                {isAdmin && (
                  <button
                    onClick={() => deletePhoto(photo.id)}
                    className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{photo.title}</h3>
                {photo.description && (
                  <p className="text-gray-600">{photo.description}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {photos.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            No photos available
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;