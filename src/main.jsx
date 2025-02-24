import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/login/Login.jsx";
import Register from "./pages/register/Register.jsx";
import Home from "./pages/home/Home.jsx";
import Profile from "./pages/profile/Profile.jsx";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";
import store from "./store/store.js";
import { Provider } from "react-redux";
import Reels from "./components/reels/Reels.jsx";
import Explore from "./pages/explore/Explore.jsx";
import Search from "./pages/search/Search.jsx";
import BirthDate from "./pages/register/BirthDate.jsx";
import VerificationPage from "./pages/register/VerificationPage.jsx";
import OwnStories from "./components/stories/OwnStories.jsx";
import PostDetails from "./components/post/PostDetails.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute authentication={true}>
        <App />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/profile/:username",
        element: <Profile />,
      },
      {
        path: "/reels",
        element: <Reels />,
      },
      {
        path: "/explore",
        element: <Explore />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      // {
      //   path: "/test",
      //   element: <OwnStories />,
      // },
    ],
  },
  {
    path: "/login",
    element: (
      <ProtectedRoute authentication={false}>
        <Login />
      </ProtectedRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <ProtectedRoute authentication={false}>
        <Register />
      </ProtectedRoute>
    ),
  },
  {
    path: "/account/verify-birthdate",
    element: (
      <ProtectedRoute authentication={false}>
        <BirthDate />
      </ProtectedRoute>
    )
  },
  {
    path: "/account/verify-otp",
    element: (
      <ProtectedRoute authentication={false}>
        <VerificationPage />
      </ProtectedRoute>
    )
  },
  {
    path: "/my-stories",
    element: (
      <ProtectedRoute authentication={true}>
        <OwnStories />
      </ProtectedRoute>
    )
  },
  {
    path: "/test",
    element: <PostDetails />
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
