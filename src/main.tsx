import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import Nav from "./components/layout/Nav.tsx";
import Footer from "./components/layout/Footer.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
     <Provider store={store}>
      <Nav />
        <App />
      <Footer />
      </Provider>
    

  </React.StrictMode>
);