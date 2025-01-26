
import { useDispatch } from 'react-redux';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import { logout } from '../store/slices/loginSlice';
import { CheckSquare, Image as ImageIcon, LogOut } from 'lucide-react';

export default function Layout() {
//   const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <img
                className="h-8 w-8 rounded-full"
                // src={user?.avatar}
                // alt={user?.name}
              />
              <span className="ml-3 font-medium text-gray-900">{}</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/tasks"
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:text-indigo-600"
              >
                <CheckSquare className="w-5 h-5 mr-1" />
                Tasks
              </Link>
              <Link
                to="/feed"
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:text-indigo-600"
              >
                <ImageIcon className="w-5 h-5 mr-1" />
                Feed
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:text-red-600"
              >
                <LogOut className="w-5 h-5 mr-1" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}