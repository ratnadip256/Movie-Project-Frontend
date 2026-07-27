import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { verifyOtpThunk, fetchProfile } from '../../Redux/Features/authSlice';
import toast from 'react-hot-toast';
import { KeyRound, Loader2, ArrowRight, Clock } from 'lucide-react';

const VerifyOtp = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const email = location.state?.email || '';
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const onSubmit = async (data) => {
    if (timeLeft === 0) {
      toast.error("OTP has expired. Please login again.");
      return;
    }

    try {
      setIsLoading(true);
      const payload = {
        email: email,
        username: email,
        otp: data.otp
      };
      
      const resultAction = await dispatch(verifyOtpThunk(payload));
      
      if (verifyOtpThunk.fulfilled.match(resultAction)) {
        toast.success(resultAction.payload.message || 'Email verified successfully!');
        // Fetch the user profile immediately after login
        await dispatch(fetchProfile());
        navigate('/');
      } else {
        toast.error(resultAction.payload || 'Verification failed');
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0d0d12] relative overflow-hidden text-white">
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-white/5 rounded-full blur-[120px]" />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 relative z-10"
      >
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-rose-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-rose-500/20">
              <KeyRound className="w-8 h-8 text-rose-400" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Verify Your Email</h1>
            <p className="text-gray-400 text-sm">
              We've sent a code to <span className="text-white font-semibold">{email}</span>
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Enter 6-digit OTP"
                maxLength={6}
                disabled={timeLeft === 0}
                {...register('otp', { 
                  required: 'OTP is required',
                  minLength: { value: 6, message: 'OTP must be 6 digits' },
                  maxLength: { value: 6, message: 'OTP must be 6 digits' }
                })}
                className="w-full text-center tracking-[0.5em] text-2xl placeholder:tracking-normal placeholder:text-base py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200 disabled:opacity-50"
              />
              {errors.otp && <p className="text-red-400 text-xs mt-2 text-center">{errors.otp.message}</p>}
            </div>

            <div className="flex flex-col items-center justify-center space-y-2">
              <div className={`flex items-center gap-2 text-sm font-medium ${timeLeft <= 10 ? 'text-rose-400' : 'text-gray-400'}`}>
                <Clock className="w-4 h-4" />
                {timeLeft > 0 ? (
                  <span>Expires in: {formatTime(timeLeft)}</span>
                ) : (
                  <span className="text-rose-500">OTP Expired</span>
                )}
              </div>
              
              {timeLeft === 0 && (
                <Link to="/login" className="text-sm text-gray-300 hover:text-white transition-colors mt-2">
                  Please login again to receive a new OTP
                </Link>
              )}
            </div>

            <motion.button
              whileHover={{ scale: timeLeft > 0 ? 1.02 : 1 }}
              whileTap={{ scale: timeLeft > 0 ? 0.98 : 1 }}
              disabled={isLoading || timeLeft === 0}
              type="submit"
              className="w-full py-3 bg-white text-black hover:bg-gray-200 rounded-xl font-medium flex items-center justify-center gap-2 shadow-lg shadow-white/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                <>Verify OTP <ArrowRight className="w-4 h-4" /></>
              )}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default VerifyOtp;
