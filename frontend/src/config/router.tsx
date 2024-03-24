import { Suspense } from "react";
import { Outlet, createBrowserRouter } from "react-router-dom";
import { NavBar } from "../components/Navbar/Navbar";
import { CreatePostForm } from "../features/post/CreatePost";
import { RequireAuth } from "../helpers/RequireAuth";
import { Admin } from "../pages/Admin/Admin";
import { AuthLayout } from "../pages/Auth/Auth.layout";
import { Login } from "../pages/Auth/Login/Login";
import { Register } from "../pages/Auth/Register/Register";
import { Home } from "../pages/Home/Home";
import { PostPage } from "../pages/PostPage";
import { Posts } from "../pages/Posts";
import { Profile } from "../pages/Profile/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <NavBar />
        <Outlet />
      </>
    ),
    errorElement: <>Ошибка</>,
    children: [
      {
        path: "post/create",
        element: <CreatePostForm />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "admin",
        element: <Admin />,
      },
      {
        path: "profile",
        element: (
          <RequireAuth>
            <Profile />
          </RequireAuth>
        ), // Оборачивание Profile в RequireAuth
      },
      {
        path: "posts",
        element: <Posts />,
        errorElement: <>Ошибка</>,
      },
      {
        path: "post/:id",
        element: <PostPage />,
        errorElement: <>Ошибка</>,
      },
      {
        path: "posts",
        element: (
          <Suspense fallback={<>Загрузка...</>}>
            <Posts />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />, // Для AuthLayout необходим Outlet для рендеринга дочерних маршрутов
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);
export default router;
