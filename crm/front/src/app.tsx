import { Route, Routes } from 'react-router';

import DashboardLayout from 'src/components/DashboardLayout.tsx';
import Home from 'src/pages/Home.tsx';
import Login from 'src/pages/Login.tsx';
import Register from 'src/pages/Register.tsx';
import ProtectedRoute from 'src/components/ProtectedRoute';
import AuthLayout from 'src/components/AuthLayout';
import ProjectPage from 'src/pages/ProjectPage';
import EditorPage from 'src/pages/EditorPage';
import EditorPreviewPage from 'src/pages/EditorPreviewPage';
import { useAppDispatch } from 'src/hooks';
import { useGetUserDetailsQuery } from 'src/services/auth/authService';
import { setUserDetails } from 'src/features/auth/authSlice';
import { useEffect } from 'react';
import EntryModal from './modals/EntryModal';

const App = () => {
    const dispatch = useAppDispatch();
    const { data: user, isLoading, error } = useGetUserDetailsQuery();

    useEffect(() => {
        if (user) {
            dispatch(setUserDetails(user));
        }
    }, [user, dispatch]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Routes>
                <Route element={<AuthLayout />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Route>

                <Route element={<ProtectedRoute />}>
                    <Route element={<DashboardLayout />}>
                        <Route path="/" element={<Home />} />

                        <Route path="project">
                            <Route path=":id" element={<ProjectPage />} />
                        </Route>
                    </Route>

                    <Route path="editor">
                        <Route path=":id" element={<EditorPage />} />
                        <Route
                            path=":id/preview"
                            element={<EditorPreviewPage />}
                        />
                    </Route>
                </Route>
            </Routes>
            <EntryModal />
            {/* <WebsiteSettingsModal /> */}
        </>
    );
};

export default App;
