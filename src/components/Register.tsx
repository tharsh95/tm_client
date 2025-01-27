// import React from 'react';
// import { useNavigate, Link, useLocation } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '../store';
// import { setName, setEmail, setPassword } from '../store/slices/registerSlice';
// import { useAuthApi } from '../hooks/useAuth';
// import { LogIn } from 'lucide-react';

// export default function Register() {
//   const navigate = useNavigate();
//   const location=useLocation()
//   const message = location.state?.message
//   const dispatch = useDispatch();
//   const { isLoading, error, register } = useAuthApi();

//   const { name, email, password } = useSelector((state: RootState) => state.register);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const response = await register(name, email, password);

//     if (response.success) {
//       console.log(response.message);
//       navigate('/login');
//     } else {
//       console.error(response.message);
//     }
//   };
//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//       <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
//         <div className="flex justify-center mb-8">
//           <LogIn className="h-12 w-12 text-indigo-600" />
//         </div>
//         <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-8">
//           Register your account
//         </h2>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label htmlFor="name" className="block text-sm font-medium text-gray-700">
//               Name
//             </label>
//             <input
//               id="name"
//               type="text"
//               autoFocus
//               required
//               value={name}
//               onChange={(e) => dispatch(setName(e.target.value))}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//             />
//           </div>
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//               Email address
//             </label>
//             <input
//               id="email"
//               type="email"
//               required
//               value={email}
//               onChange={(e) => dispatch(setEmail(e.target.value))}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//             />
//           </div>
//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//               Password
//             </label>
//             <input
//               id="password"
//               type="password"
//               required
//               value={password}
//               onChange={(e) => dispatch(setPassword(e.target.value))}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//             />
//           </div>
//           <button
//             type="submit"
//             disabled={isLoading}
//             className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//           >
//             {isLoading ? 'Registering...' : 'Register'}
//           </button>
//         </form>
//         <p className="mt-4 text-center text-sm text-gray-600">
//           Already have an account?{' '}
//           <Link to="/" className="text-indigo-600 hover:text-indigo-500 font-medium">
//             Login
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setName, setEmail, setPassword } from '../store/slices/registerSlice';
import { useAuthApi } from '../hooks/useAuth';
import { LogIn } from 'lucide-react';

export default function Register() {
  const navigate = useNavigate();
  // const location = useLocation();
  const dispatch = useDispatch();
  const { isLoading, error, register } = useAuthApi();

  const { name, email, password } = useSelector((state: RootState) => state.register);

  // const [message, setMessage] = React.useState(location.state?.message || null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await register(name, email, password);

    if (response.success) {
      console.log(response.message);
      navigate('/login');
    } else {
      console.error(response.message);
    }
  };

  // useEffect(() => {
  //   if (message) {
  //     const timer = setTimeout(() => {
  //       // setMessage(null); // Clear the message after 2 seconds
  //       navigate(location.pathname, { replace: true, state: {} }); // Clear state from location
  //     }, 2000);

  //     return () => clearTimeout(timer); // Cleanup timeout
  //   }
  // }, [message, navigate, location.pathname]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="flex justify-center mb-8">
          <LogIn className="h-12 w-12 text-indigo-600" />
        </div>
        <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-8">
          Register your account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              id="name"
              type="text"
              autoFocus
              required
              value={name}
              onChange={(e) => dispatch(setName(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => dispatch(setEmail(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => dispatch(setPassword(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          {/* {message && <p className="text-red-500 text-sm">{message}</p>} */}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/" className="text-indigo-600 hover:text-indigo-500 font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

