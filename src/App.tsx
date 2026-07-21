import React from "react";
import { BrowserRouter } from "react-router-dom";
import { LazyMotion, domAnimation } from "framer-motion";
import { Toaster } from "sonner";
import { AppRoutes } from "./routes/AppRoutes";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <LazyMotion features={domAnimation} strict>
        <AppRoutes />
        <Toaster position="top-right" richColors closeButton expand={false} />
      </LazyMotion>
    </BrowserRouter>
  );
};

export default App;
