import { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import { NavBar } from "../components/Navbar/Navbar";
import { CreatePostForm } from "../features/post/CreatePost";
import { RequireAuth } from "../helpers/RequireAuth";
import { AuthLayout } from "../pages/Auth/Auth.layout";
import { Login } from "../pages/Auth/Login/Login";
import { Register } from "../pages/Auth/Register/Register";
import { PostPage } from "../pages/PostPage";
import { Posts } from "../pages/Posts";
import { Profile } from "../pages/Profile/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <NavBar />
      </>
    ),
    children: [
      {
        path: "/",
        element: (
          <RequireAuth>
            <NavBar />
            <Profile />
          </RequireAuth>
        ),
        children: [
          {
            path: "/post/create",
            element: <CreatePostForm />,
            errorElement: <>Ошибка</>,
          },
          {
            path: "/profile",
            element: <Profile />,
            errorElement: <>Ошибка</>,
          },
        ],
      },
      {
        path: "/posts",
        element: <Posts />,
        errorElement: <>Ошибка</>,
      },
      {
        path: "/post/:id",
        element: <PostPage />,
        errorElement: <>Ошибка</>,
      },
      {
        path: "/posts",
        element: (
          <Suspense fallback={<>Загрузка...</>}>
            <Posts />
          </Suspense>
        ),
      },
      {
        path: "/auth",
        element: <AuthLayout />,
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
    ],
  },
]);
export default router;
