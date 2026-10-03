import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import Nav from "./components/layout/Nav.tsx";
import Footer from "./components/layout/Footer.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
     <Provider store={store}>
      <QueryClientProvider client={queryClient}>
      <Nav />
        <App />
      <Footer />
      </QueryClientProvider>
      </Provider>
    

  </React.StrictMode>
);