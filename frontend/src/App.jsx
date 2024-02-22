import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'; 

function App() {
  return <>
    <div>
      <h1>MMRL</h1>{/* Navbar Here */}
      <Outlet />
    </div>
  </>;
}

export default App;
