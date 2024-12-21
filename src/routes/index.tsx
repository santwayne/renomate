import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const Home = lazy(() => import('../pages/XRHome'));
const Product = lazy(() => import('../pages/XRProduct'));

const AppRoutes = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/xr/:id" element={<Product />} />
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;
