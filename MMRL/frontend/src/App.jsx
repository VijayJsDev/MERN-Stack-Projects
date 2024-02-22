import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./components/HomePage";
import SignUp from "./components/SignUp";
import RootLayout from "./pages/Root";
import Login from "./components/Login";
import AuthHome from "./components/AuthHome";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "/signup", element: <SignUp /> },
        { path: "/login", element: <Login /> },
        { path: "/auth", element: <AuthHome />}
      ],
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
