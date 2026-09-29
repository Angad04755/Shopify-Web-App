import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "sonner";
import { RouterProvider } from "react-router-dom";
import { Suspense } from "react";
function App() {
  return (
    <>
    <Suspense>
    <RouterProvider router={AppRoutes}/>
    </Suspense>
    <Toaster position="top-center" richColors/>
    </>
  )
}
export default App;