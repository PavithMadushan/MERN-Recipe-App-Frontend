import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
//import Home from './pages/Home/Home.jsx'
import ErrorPage from './components/ErrorPage.jsx'
import MealDetails from './components/MealDetails.jsx'
import Favourite from './components/Favourite.jsx'
import Signup from './pages/Signup.jsx'
import Login from './pages/Login.jsx'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement:<ErrorPage/>,
    children:[
      
      {
        path: "meal/:id",
        element: <MealDetails />,
      },
      {
        path: "favorites",
        element: <Favourite />, // Add Favourite route
      },
      
    ]
  },
  {
    path: "signup",
    element: <Signup />, // Add Signup route
  },
  {
    path: "/login",
    element: <Login />, // Add Login route
  },
  
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
