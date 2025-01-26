
import FeedForm from '../components/FeedForm';
import FeedList from '../components/FeedList';

export default function FeedPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Team Feed</h2>
      <FeedForm />
      <div className='border-t-1 border-black'/>
      <FeedList/>
    </div>
  );
}