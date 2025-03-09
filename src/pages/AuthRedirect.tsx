import { useAuth } from '@/contexts/auth.context';
import { cookies } from '@/utils/cookies';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthRedirect = () => {
  const navigate = useNavigate();
  const {dispatch} = useAuth(); 
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (token) {
      cookies.setToken(token);
      dispatch({type:'OAUTH_SUCCESS',payload:{isAuthenticated:true}})
      navigate('/');
    } else {
      navigate('/login');
    }
  }, [navigate,dispatch]);

  return <p>Redirecting...</p>;
};

export default AuthRedirect;
