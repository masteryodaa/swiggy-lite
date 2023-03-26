import React, { lazy, Suspense, useState } from "react";
import ReactDOM from "react-dom/client";
import Navbar from "./src/components/Navbar";
import Body from "./src/components/Body";
import Footer from "./src/components/Footer";
import Error from "./src/components/Error";
import RestaurantMenu from "./src/components/RestaurantMenu";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Shimmer from "./src/components/Shimmer";
import useIsOnline from "./src/utils/useIsOnline";
import OfflineMessage from "./src/components/OfflineMessage";
import UserContext from "./src/utils/UserContext";
const About = lazy(() => import("./src/components/About"));
const Profile = lazy(() => import("./src/components/Profile"));
const Cart = lazy(() => import("./src/components/Cart"));
import { Provider } from "react-redux";
import store from "./src/utils/store";

const App = () => {
  const online = useIsOnline();

  const [user, setUser] = useState({
      name: "yoda",
  });

  return (
    <Provider store={store}>
      <UserContext.Provider
        value={{
          user:user,
          setUser:setUser
        }}
      >
        <Navbar />
        {navigator.geolocation ? (
          <Outlet />
        ) : (
          <div>Please enable location services</div>
        )}
        <Footer />
        <OfflineMessage online={online} />
      </UserContext.Provider>
    </Provider>
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
        element: (
          <Suspense fallback={<Shimmer />}>
            <Cart />
          </Suspense>
        ),
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
        path: "/profile",
        element: (
          <Suspense fallback={<Shimmer />}>
            <Profile />
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
