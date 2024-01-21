import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Welcome from "./components/Welcome";
import TaskManagement from "./components/TaskManager";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Welcome /> },
    { path: "/signup", element: <SignupForm /> },
    { path: "/login", element: <LoginForm /> },
    { path: "/tasks", element: <TaskManagement /> },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
