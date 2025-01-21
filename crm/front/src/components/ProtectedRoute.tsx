import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router';
import { RootState } from 'src/store';

const ProtectedRoute: React.FC = () => {
    const { userToken } = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!userToken) {
            navigate('/login');
        }
    }, [location, userToken]);

    if (!userToken) {
        return <></>;
    }

    return <Outlet />;
}

export default ProtectedRoute;