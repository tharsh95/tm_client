import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFeedItems } from '../store/slices/feedSlice';
import { RootState } from '../store';
import { fetchFeed } from '../api';  // Import the centralized API function


export default function FeedList() {
  const dispatch = useDispatch();
  const feedItems = useSelector((state: RootState) => state.feed.items);
    const { token } = useSelector((state: RootState) => state.auth);
  

  useEffect(() => {
    const getFeed = async () => {
      try {
        if (token) {
          const data = await fetchFeed(token);  // Use the centralized fetchFeed function
          dispatch(setFeedItems(data));    // Set the fetched feed items in Redux store
        } else {
          console.error('No token available');
        }
      } catch (error) {
        console.error('Error fetching feed:', error);
      }
    };
    getFeed();
  }, [dispatch]);

  return (
    <div className="space-y-6">
      {feedItems.map((feed) => (
        <div key={feed._id} className="bg-white rounded-lg shadow overflow-hidden">
          <img src={feed.url} alt="Post" className="w-full h-64 object-cover" />
          <div className="p-4">
            <p className="text-gray-800 mb-2">{feed.description}</p>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>{feed.user}</span>
              <span>{new Date(feed.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
