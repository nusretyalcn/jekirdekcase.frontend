import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import AuthService from "../services/AuthService";
import { Card } from "primereact/card";
import { ToastContainer, toast } from 'react-toastify';

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = () => {
    AuthService.login(credentials).then((response) => {
      localStorage.setItem("token", response.data.token);
      navigate("/customers");
      toast.success('Giriş başarılı!');
    }).catch(() => alert("Giriş başarısız!"));
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh", // Sayfanın tamamını kaplamasın, ama ortalasın
      backgroundColor: "#f4f4f4"
    }}>
      <Card title="Giriş Yap" style={{ width: "350px", padding: "20px", textAlign: "center", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
        <div style={{ marginBottom: "15px", textAlign: "left" }}>
          <label>Email</label>
          <InputText
            value={credentials.email}
            onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
            style={{ width: "100%", marginTop: "5px" }}
          />
        </div>
        <div style={{ marginBottom: "15px", textAlign: "left" }}>
          <label>Şifre</label>
          <InputText
            type="password"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            style={{ width: "100%", marginTop: "5px" }}
          />
        </div>
        <Button label="Giriş Yap" onClick={handleLogin} style={{ width: "100%" }} />
      </Card>
    </div>
  );
};

export default LoginPage;
