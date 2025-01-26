import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { setOtp, resetOtp } from '../store/slices/otpSlice';
import { verifyOtp } from '../api';  // Importing centralized API function
import { RootState } from '../store';

export default function OtpVerification() {
  const location = useLocation();
  const { email } = location.state;
  const otp = useSelector((state:RootState) => state.otp.otp);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (value:string, index:number) => {
    dispatch(resetOtp());
    const updatedOtp = [...otp];
    updatedOtp[index] = value.slice(-1); // Ensure only one digit is entered
    dispatch(setOtp(updatedOtp));

    // Automatically focus on the next input if a value is entered
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };


  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus(); // Focus previous input
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const enteredOtp = otp.join('');
    try {
      const response = await verifyOtp(email, enteredOtp);  // Using centralized API
      if (response.status === 200) {
        dispatch(resetOtp());
        navigate('/change-password', { state: { email } });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-8">
          Verify Your OTP
        </h2>
        <p className="text-sm text-gray-600 mb-6 text-center">
          We’ve sent a 4-digit OTP to your email. Please enter it below to
          proceed.
        </p>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex justify-center space-x-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="number"
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                maxLength={1}
                className="appearance-none w-12 h-12 text-center text-lg font-semibold rounded-md border border-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            ))}
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Verify OTP
          </button>
        </form>
        <p className="text-sm text-gray-600 mt-4 text-center">
          Didn’t receive the OTP?{' '}
          <button
            className="text-indigo-600 hover:underline"
            onClick={() => alert('Resend OTP clicked!')}
          >
            Resend OTP
          </button>
        </p>
      </div>
    </div>
  );
}
