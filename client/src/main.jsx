import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import TrackerPage from './pages/Tracker.jsx';
import GoalsPage from './pages/Goals.jsx';
import ReportsPage from './pages/Reports.jsx';
import ErrorPage from './pages/Error.jsx';
import WelcomePage from './pages/Welcome.jsx';
import RootLayout from './layouts/root-layout.jsx';

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
    {
      path: "/",
      element: <WelcomePage />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/Tracker",
      element: <TrackerPage />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/Goals",
      element: <GoalsPage />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/Reports",
      element: <ReportsPage />,
      errorElement: <ErrorPage />,
    },
  ]}
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <App />
  </React.StrictMode>,
)
