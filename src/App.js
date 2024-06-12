import React, { lazy, Suspense, useState } from "react";
import ReactDOM from "react-dom/client";
import Header, { Title } from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";
import { createBrowserRouter, RouterProvider, Outlet} from "react-router-dom";
import About from "./components/About";
import Error from './components/Error';
import Contact from './components/Contact';
import RestaurantMenu from "./components/RestaurantMenu";
import Login from './components/Login';
import Shimmer from "./components/Shimmer";
import Profile from "./Components/ProfileClass"
import { Provider } from 'react-redux';
import store from "./utils/store";
import Cart from "./components/Cart";

//dynamic import
//upon on demand load -> upon render -> suspend loading
const Instamart = lazy(()=> import('./components/Instamart'));

const AppLayout = () =>{
    return (
        <Provider store={store}>
          <Header/>
          <Outlet/>
          <Footer/>
        </Provider>
    )
}

const appRouter = createBrowserRouter ([
  {
    path: '/',
    element: <AppLayout/>,
    errorElement: <Error/>,
    children: [
      {
        path: '/',
        element: <Body/>
      },
      {
        path: '/about',
        element: <About/>,
        children: [ //nested routing
          {
          path:'profile',
          element: <Profile/>,
          }
        ],
      },
      {
        path: '/contact',
        element: <Contact/>
      },
      {
        path: '/restaurant/:resId',   
        element: <RestaurantMenu/>
      },
      {
        path: '/cart',   
        element: <Cart/>
      },
      {
        path: '/instamart',
        element:(
          <Suspense fallback = {<Shimmer/>}>
            <Instamart/>
          </Suspense>
        )
      }
    ]
  },
  {
    path: '/login',
    element: <Login/>
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={appRouter} />);