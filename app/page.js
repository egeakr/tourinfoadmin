"use client";
import { useState } from "react";
import Login from "@/component/Login";
import Admin from "./test/adminp";
import DataCorrectionPage from "./test/data/page";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState("admin"); // Yeni state

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <div>
      {!isLoggedIn ? (
        <Login onLoginSuccess={handleLoginSuccess} />
      ) : (
        <div>
          {currentPage === "admin" && (
            <Admin onNavigate={() => setCurrentPage("data")} />
          )}
          {currentPage === "data" && <DataCorrectionPage />}
        </div>
      )}
    </div>
  );
}