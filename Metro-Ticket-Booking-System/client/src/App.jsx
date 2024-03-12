import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/Root";
import Home from "./pages/Home";
import MmrlHome from "./pages/MmrlHome";
import Authentication, { action as authAction } from "./pages/Authentication";
import { checkAuthLoader, tokenLoader } from "./util/auth";
import ErrorPage from "./pages/ErrorPage";
import { action as logoutAction } from "./pages/Logout";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      id: "root",
      loader: tokenLoader,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <Home /> },
        { path: "auth", element: <Authentication />, action: authAction },
        { path: "mmrl-home", element: <MmrlHome />, loader: checkAuthLoader },
        { path: "logout", action: logoutAction },
      ],
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
