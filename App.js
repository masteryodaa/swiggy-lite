import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";

import Navbar from "./src/components/Navbar";
import Body from "./src/components/Body";
import Footer from "./src/components/Footer";

import Error from "./src/components/Error";

import Cart from "./src/components/Cart";
// import About from "./src/components/About";

import RestaurantMenu from "./src/components/RestaurantMenu";

import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Shimmer from "./src/components/Shimmer";

import useIsOnline from "./src/utils/useIsOnline";
import OfflineMessage from "./src/components/OfflineMessage";

const About = lazy(() => import("./src/components/About"));

const App = () => {

  const online = useIsOnline();
  
  return (
    <>
      <Navbar />
      {navigator.geolocation ? <Outlet /> : <div>Please enable location services</div>}
      <Footer />
      <OfflineMessage online={online} />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/about",
        element: (
          <Suspense fallback={<Shimmer />}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "/restaurant/:id",
        element: <RestaurantMenu />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

// root.render(container);
root.render(<RouterProvider router={router} />);
