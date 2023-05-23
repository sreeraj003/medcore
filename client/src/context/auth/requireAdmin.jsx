import { useState, useEffect } from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Loader from '../../components/loader';

function RequireAdmin() {
  const { admin } = useAuth();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  if (isLoading) {
    return <Loader />;
  } else {
    return admin ? <Outlet /> : <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

}

export default RequireAdmin;

