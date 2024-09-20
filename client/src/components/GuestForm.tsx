import Button from './Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const GuestLogin = () => {
  const navigate = useNavigate();

  const handleGuestLogin = async () => {
    try {
      const credentials = {
        email:'guest@email.com',
        password:'guest@123',
      };

      const response = await axios.post('http://localhost:8080/api/v1/auth/signin', credentials);

      localStorage.setItem('token', response.data.token);

      navigate('/dashboard');
    } catch (error: any) {
      console.error('Guest login failed', error);
    }
  };

  return (
    <Button onClick={handleGuestLogin} label="Login with Guest Account" fullWidth />
  );
};

export default GuestLogin;
