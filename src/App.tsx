import React from "react";
import { BrowserRouter } from "react-router-dom";
import { LazyMotion, domAnimation } from "framer-motion";
import { Toaster } from "sonner";
import { AppRoutes } from "./routes/AppRoutes";
import { QueryProvider } from "./context/QueryProvider";
import { AuthProvider } from "./context/AuthContext";
import { GlobalErrorBoundary } from "./components/common/GlobalErrorBoundary";

const App: React.FC = () => {
  return (
    <GlobalErrorBoundary>
      <QueryProvider>
        <AuthProvider>
          <BrowserRouter>
            <LazyMotion features={domAnimation} strict>
              <AppRoutes />
              <Toaster position="top-right" richColors closeButton expand={false} />
            </LazyMotion>
          </BrowserRouter>
        </AuthProvider>
      </QueryProvider>
    </GlobalErrorBoundary>
  );
};

export default App;
