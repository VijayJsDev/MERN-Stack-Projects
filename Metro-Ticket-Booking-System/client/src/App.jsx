import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/Root";
import Home from "./pages/Home";
import Authentication, { action as authAction } from "./pages/Authentication";
import { checkAuthLoader, tokenLoader } from "./util/auth";
import ErrorPage from "./pages/ErrorPage";
import { action as logoutAction } from "./pages/Logout";
import BookTickets, {
  action as ticketBookingAction,
} from "./components/BookTickets";
import Payment, { action as paymentAction } from "./pages/Payment";
import ConfirmedTicket from "./pages/ConfirmedTicket";
import PurchaseHistory from "./pages/PurchaseHistory";

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
        {
          path: "book-tickets",
          element: <BookTickets />,
          loader: checkAuthLoader,
          action: ticketBookingAction,
        },
        { path: "logout", action: logoutAction },
        {
          path: "payment",
          element: <Payment />,
          loader: checkAuthLoader,
          action: paymentAction,
        },
        {
          path: "confirmed-ticket",
          element: <ConfirmedTicket />,
          action: checkAuthLoader,
        },
        {
          path: "purchase-history",
          element: <PurchaseHistory />,
          action: checkAuthLoader,
        },
      ],
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
