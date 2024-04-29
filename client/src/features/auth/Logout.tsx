import useSignOut from 'react-auth-kit/hooks/useSignOut';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Logout = () => {
    const navigate = useNavigate();
    const signOut = useSignOut();

    useEffect(() => {
        signOut();
        navigate('/login');
    }, []);

    return null;
};

export default Logout;
