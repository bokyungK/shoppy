import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './pages/Home';
import Error from './pages/Error';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Admin from './pages/Admin';
import Details from './pages/Details';
import ProtectedRoute from './components/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: "/",
        element: <Home />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/products/:productId",
        element: <Details />,
      },
      {
        path: "/cart",
        element: <ProtectedRoute>
          <Cart />
        </ProtectedRoute>
      },
      {
        path: "/admin",
        element: <ProtectedRoute isRequireAdmin>
            <Admin />
        </ProtectedRoute>,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <RouterProvider router={router} />
  // </React.StrictMode>
);

reportWebVitals();
