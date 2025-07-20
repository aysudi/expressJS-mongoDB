import type { RouteObject } from "react-router";

//client
import ClientLayout from "../layout/Client/ClientLayout";
import Home from "../pages/Client/Home";
import About from "../pages/Client/About";
import Contact from "../pages/Client/Contact";
import Basket from "../pages/Client/Basket";
import Profile from "../pages/Client/Profile";
import Wishlist from "../pages/Client/Wishlist";
import Books from "../pages/Client/Books";
import BookDetail from "../pages/Client/BookDetail";

//auth
import AuthLayout from "../layout/Auth/AuthLayout";
import Register from "../pages/Auth/Register";
import Login from "../pages/Auth/Login";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import ResetPassword from "../pages/Auth/ResetPassword";

//admin
import AdminLayout from "../layout/Admin/AdminLayout";
import Dashboard from "../pages/Admin/Dashboard";
import AdminProfile from "../pages/Admin/AdminProfile";
import UserManagement from "../pages/Admin/UserManagement";
import ReviewsManagement from "../pages/Admin/ReviewsManagement";
import OrderManagement from "../pages/Admin/OrderManagement";
import MessagesManagement from "../pages/Admin/MessagesManagement";
import AuthorManagement from "../pages/Admin/AuthorManagement";
import BookManagement from "../pages/Admin/BookManagement";
import EmailVerify from "../pages/Auth/EmailVerify";
import GoogleCallback from "../pages/Auth/AuthCallback";
import ChatPage from "../pages/Client/ChatPage";

const ROUTES: RouteObject[] = [
  //client
  {
    path: "/",
    element: <ClientLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "basket",
        element: <Basket />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "wishlist",
        element: <Wishlist />,
      },
      {
        path: "books",
        element: <Books />,
      },
      {
        path: "book-details/:id",
        element: <BookDetail />,
      },
      {
        path: "chat",
        element: <ChatPage />,
      },
    ],
  },
  //admin
  {
    path: "/admin/",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "profile",
        element: <AdminProfile />,
      },
      {
        path: "books",
        element: <BookManagement />,
      },
      {
        path: "author",
        element: <AuthorManagement />,
      },
      {
        path: "messages",
        element: <MessagesManagement />,
      },
      {
        path: "orders",
        element: <OrderManagement />,
      },
      {
        path: "reviews",
        element: <ReviewsManagement />,
      },
      {
        path: "users",
        element: <UserManagement />,
      },
    ],
  },
  //auth
  {
    path: "/auth/",
    element: <AuthLayout />,
    children: [
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
      {
        path: "email-verified",
        element: <EmailVerify />,
      },
      {
        path: "success/:token",
        element: <GoogleCallback />,
      },
    ],
  },
];

export default ROUTES;
