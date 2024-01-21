import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Welcome from "./components/Welcome";
import TaskManagement from "./components/TaskManager";
import ErrorComponent from "./components/Error";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Welcome /> , errorElement:<ErrorComponent />},
    { path: "/signup", element: <SignupForm /> ,errorElement:<ErrorComponent />},
    { path: "/login", element: <LoginForm /> ,errorElement:<ErrorComponent />},
    { path: "/tasks", element: <TaskManagement /> ,errorElement:<ErrorComponent />},
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
