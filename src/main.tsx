import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import Nav from "./components/layout/Nav.tsx";
import Footer from "./components/layout/Footer.tsx";
import StoreProvider from "./providers/StoreProvider.tsx";
import { Toaster } from "sonner"

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
     <StoreProvider>
      <Toaster position="top-center"/>
      <Nav />
        <App />
      <Footer />
      </StoreProvider>
    </BrowserRouter>
    

  </React.StrictMode>
);