import React from "react";
import AppRouter from "./routes/AppRouter"; // AppRouter'ı içe aktar
import { ToastContainer } from "react-toastify";  // ToastContainer'ı içe aktar
import "react-toastify/dist/ReactToastify.css"; // Toastify'nin CSS dosyasını içe aktar

function App() {
  return (
    <div>
      <AppRouter />
      <ToastContainer /> {/* ToastContainer'ı burada ekliyoruz */}
    </div>
  );
}

export default App;

