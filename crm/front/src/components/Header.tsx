import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from 'src/features/auth/authSlice';
// import { NavLink } from 'react-router-dom';
import { useGetUserDetailsQuery } from 'src/services/auth/authService';
import { RootState } from 'src/store';
import { AppDispatch } from 'src/store';

const Header: React.FC = () => {
    const { userToken, userInfo } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch<AppDispatch>();

    const { data, isFetching } = useGetUserDetailsQuery();

    console.log(data); // user object

    return (
        <header>
            {/* Add your header markup here */}
            Header

            <div>
                {userToken ? (
                    <button onClick={() => dispatch(logout())}>
                        Logout
                    </button>
                ) : null}
            </div>
        </header>
    )
}

export default Header;