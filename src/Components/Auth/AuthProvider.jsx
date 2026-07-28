import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile, setAuthStatus } from '../../Redux/Features/authSlice';
import { Loader2 } from 'lucide-react';

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { isInitialized } = useSelector((state) => state.auth);

  useEffect(() => {
    // Attempt to fetch profile using the httpOnly cookie automatically attached by the browser
    dispatch(fetchProfile());
  }, [dispatch]);

  if (!isInitialized) {
    return (
      <div className="min-h-screen w-full bg-[#1c1c23] flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-white animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthProvider;