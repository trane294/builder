import 'src/index.scss';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from 'src/store';
import {
    Route,
    BrowserRouter,
    Routes
} from 'react-router';

import DashboardLayout from 'src/components/DashboardLayout.tsx';
import Home from 'src/pages/Home.tsx';
import Login from 'src/pages/Login.tsx';
import Register from 'src/pages/Register.tsx';
import ProtectedRoute from 'src/components/ProtectedRoute';
import AuthLayout from 'src/components/AuthLayout';
import ProjectPage from 'src/pages/ProjectPage';
import EditorPage from 'src/pages/EditorPage';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <BrowserRouter>
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
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </Provider>
    </StrictMode>,
)
