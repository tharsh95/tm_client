import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setEmail, setPassword } from "../store/slices/loginSlice";
import { useAuthApi } from "../hooks/useAuth";
import { RootState } from "../store";
import { LogIn } from "lucide-react";
import { setAuth } from "../store/slices/authSlice";

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, error, login } = useAuthApi();

  const { email, password } = useSelector((state: RootState) => state.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      if (response.success === true) {
        const { token, email: nemail, name } = response.data as {
          token: string;
          email: string;
          name: string;
        };

        // Store in localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("email", nemail);
        localStorage.setItem("name", name);

        // Update Redux state
        dispatch(setAuth({ token, email: nemail, name }));

        // Navigate to the home page
        navigate("/");
      }
    } catch (e) {
      console.error(e, "error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="flex justify-center mb-8">
          <LogIn className="h-12 w-12 text-indigo-600" />
        </div>
        <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-8">
          Sign in to your account
        </h2>
        {/* Note about backend server */}
        <p className="text-sm text-yellow-600 bg-yellow-100 p-3 rounded-md mb-4">
          Note: The backend server may spin down during inactivity. If this is
          the first request in a while, the login may take up to 50 seconds.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              required
              autoFocus
              value={email}
              onChange={(e) => dispatch(setEmail(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
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
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </form>
        <div className="flex justify-between mt-4 text-sm text-gray-600">
          <Link to="/forgot-password" className="hover:text-indigo-500">
            Forgot Password?
          </Link>
          <p>
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-indigo-600 hover:text-indigo-500 font-medium"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
