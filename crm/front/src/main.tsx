import 'antd/dist/reset.css';
import 'src/index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from 'src/store';
import {
    createMemoryRouter,
    createRoutesFromElements,
    RouterProvider,
    Route,
    BrowserRouter,
    Routes
} from 'react-router';
import { protectedLoader } from 'src/loaders/protectedLoader';

import DashboardLayout from 'src/components/DashboardLayout.tsx';
import Home from 'src/pages/Home.tsx';
import Login from 'src/pages/Login.tsx';
import Register from 'src/pages/Register.tsx';
import ProtectedRoute from 'src/components/ProtectedRoute';
import AuthLayout from 'src/components/AuthLayout';

// const routes = createRoutesFromElements(
//     <>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />

//         {/* <Route element={<DashboardLayout />}> */}
//             {/* <Route path="/" element={<Home />} loader={protectedLoader} /> */}
//             {/* <Route path="/" element={<Home />} /> */}
//         {/* </Route> */}
//     </>
// );

/*
  createMemoryRouter => in-memory navigation (no real browser URL changes)
  If you want a "hash-based" approach, do createHashRouter instead:
    import { createHashRouter } from 'react-router';
    const router = createHashRouter(routes);
*/
// const router = createMemoryRouter(routes);

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
                            {/* <Route path="/" element={<Home />} loader={protectedLoader} /> */}
                            <Route path="/" element={<Home />} />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </Provider>
        {/* <Provider store={store}>
            <RouterProvider router={router} />
        </Provider> */}
        {/* <BrowserRouter>
            <Routes>
                <Route element={<AuthLayout />}>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                </Route>

                <Route element={<DashboardLayout />}>
                    <Route index element={<Home />} />
                </Route>
            </Routes>
        </BrowserRouter> */}
    </StrictMode>,
)
