"use client";
import "./style.css";
import { useState, useEffect } from "react"; // useEffect import edilmesi gerekiyor
import { useRouter } from "next/navigation";
import Image from "next/image";

const Login = ({ onLoginSuccess }) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isClient, setIsClient] = useState(false); // İstemci tarafı kontrolü için state

  // useEffect ile istemci tarafında olduğumuzu kontrol ediyoruz
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      // Giriş başarılıysa admin sayfasına yönlendir ve onLoginSuccess çağır
      if (isClient) { // Yalnızca istemci tarafında yönlendirme yapıyoruz
        router.push("");
      }
      onLoginSuccess(); // Home bileşenine aktarılmış olan fonksiyon çağrılır
    } else {
      setError("Hatalı e-posta veya şifre!");
    }
  };

  return (
    <div className="container">
      <Image
        src="/tourİnfo.png"
        width={180}
        height={180}
        alt="Logo"
        className="logo"
      />
      <form className="form" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Giriş Yap</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Login;
