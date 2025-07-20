import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ROUTES from "./route/route";
import { SnackbarProvider } from "notistack";
import { SocketProvider } from "./context/SocketProvider";

const router = createBrowserRouter(ROUTES);

function App() {
  return (
    <>
      <SnackbarProvider />
      <SocketProvider>
        <RouterProvider router={router} />
      </SocketProvider>
    </>
  );
}

export default App;
