import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setImage, setCaption, addFeedItem } from '../store/slices/feedSlice';
import { Send } from 'lucide-react';
import { uploadImageToCloudinary, createFeed } from '../api'; // Import centralized API functions

export default function Feed() {
  const dispatch = useDispatch();
  const { image, caption } = useSelector((state: RootState) => state.feed);
  const [loading, setLoading] = useState(false); // Track loading state


  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      dispatch(setImage(e.target.files[0]));
    }
  };

  const handleCaptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setCaption(e.target.value));
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (!image) {
      // Handle the case where no image is selected
      return;
    }

    setLoading(true); // Set loading to true when starting the post process

    try {
      const imageUrl = await uploadImageToCloudinary(image); // Upload image to Cloudinary
      const pay = {
        url: imageUrl,
        description: caption,
        user: localStorage.getItem("email") || '',
        createdAt: new Date(),
      };
      await createFeed(pay); // Create feed item
      dispatch(addFeedItem(pay));
      dispatch(setImage(null));
      dispatch(setCaption(''));
    } catch (error) {
      console.error('Error creating feed:', error);
    } finally {
      setLoading(false); // Set loading to false after the process is complete
    }
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
              Image
            </label>
            <input
              type="file"
              id="image"
              onChange={handleImageChange}
              className="mt-1 block w-full"
            />
            {image && (
              <div className="mt-2">
                <img
                  src={URL.createObjectURL(image)}
                  alt="Selected"
                  className="w-full h-fit object-cover"
                />
              </div>
            )}
          </div>
          <div>
            <label htmlFor="caption" className="block text-sm font-medium text-gray-700">
              Caption
            </label>
            <textarea
              id="caption"
              value={caption}
              onChange={handleCaptionChange}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={loading} // Disable the button while loading
          >
            {loading ? (
              <div className="w-5 h-5 border-4 border-t-4 border-white rounded-full animate-spin"></div>
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" />
                Post
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
