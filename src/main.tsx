import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import Nav from "./components/layout/Nav.tsx";
import Footer from "./components/layout/Footer.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { Toaster } from "sonner"

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
     <Provider store={store}>
      <Toaster position="top-center" richColors/>
      <Nav />
        <App />
      <Footer />
      </Provider>
    </BrowserRouter>
    

  </React.StrictMode>
);