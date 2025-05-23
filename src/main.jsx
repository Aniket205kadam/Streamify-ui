import { StrictMode, useEffect } from "react";
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
import { Provider, useSelector } from "react-redux";
import Reels from "./components/reels/Reels.jsx";
import Explore from "./pages/explore/Explore.jsx";
import Search from "./pages/search/Search.jsx";
import BirthDate from "./pages/register/BirthDate.jsx";
import VerificationPage from "./pages/register/VerificationPage.jsx";
import OwnStories from "./components/stories/OwnStories.jsx";
import PostDetails from "./components/post/PostDetails.jsx";
import { Bounce, ToastContainer } from "react-toastify";
import StoriesPage from "./components/stories/StoriesPage.jsx";
import DogAnimation from "./components/3D-componets/dogAnimation.jsx";
import ChatWindow from "./components/chat/ChatWindow.jsx";
import PreviousChat from "./components/chat/PreviousChat.jsx";
import ChatPage from "./pages/chat/ChatPage.jsx";
import EditPage from "./pages/edit/EditPage.jsx";
import GIF from "./components/chat/GIF.jsx";
import Notifications from "./components/notification/Notifications.jsx";
import AIStudio from "./components/ai-studio/AIStudio.jsx";
import Demo from "./components/leftBar/Demo.jsx";

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
      {
        path: "/post/:postId",
        element: <PostDetails />
      },
      {
        path: "/stories/:username",
        element: <StoriesPage />
      },
      {
        path: "/direct/inbox",
        element: <ChatPage />
      },
      {
        path: "/accounts/edit",
        element: <EditPage />
      },
      {
        path: "/test",
        element: <Demo />
      }
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
    ),
  },
  {
    path: "/account/verify-otp",
    element: (
      <ProtectedRoute authentication={false}>
        <VerificationPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/my-stories",
    element: (
      <ProtectedRoute authentication={true}>
        <OwnStories />
      </ProtectedRoute>
    ),
  },
  {
    path: "/ai-studio",
    element: (
      <ProtectedRoute authentication={true}>
        <AIStudio />
      </ProtectedRoute>
    )
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      transition={Bounce}
    />
  </StrictMode>
);
