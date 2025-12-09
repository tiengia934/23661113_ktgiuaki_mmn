// src/components/Layout.jsx (hoặc đường dẫn tương ứng)

import "./assets/css/layout.css";
import logo from "./assets/images/Ten-truong-do-1000x159.png";
import "./ProductDetails";
import { Outlet, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
// ✅ SỬA LỖI & KẾT NỐI: Import hook giỏ hàng
import { useCart } from "./CartContext"; // Đảm bảo đường dẫn này đúng

const Layout = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // ✅ THAY ĐỔI: Lấy totalQuantity TỪ HOOK useCart // Thay thế: const totalQuantity = 2;
  const { totalQuantity } = useCart();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="layout-container">
      {/* --- HEADER CHÍNH (TỔNG HỢP 3 PHẦN TỐI ƯU) --- */}{" "}
      <header className="main-header">
        {" "}
        {/* 1. Thanh Top Bar (Đăng nhập/Đăng xuất) *
    </div>

    {/* 2. Thanh Logo và Tìm kiếm */}{" "}
        <div className="logo-search-bar">
          {" "}
          <Link to="/" className="logo-link">
            {" "}
            <img src={logo} alt="Logo trường HCE" className="main-logo" />{" "}
          </Link>
          {/* Hộp tìm kiếm và Giỏ hàng */}{" "}
          <div className="search-cart-area">
            {" "}
            <div className="search-box">
              {" "}
              <input type="text" placeholder="🔍 Tìm kiếm sản phẩm..." />
              <button className="search-btn">Tìm</button>{" "}
            </div>{" "}
            <Link to="/cart" className="cart-link">
              🛒 Giỏ hàng
              {/* ✅ SỬ DỤNG totalQuantity THỰC TẾ TỪ CONTEXT */}{" "}
              {totalQuantity > 0 && (
                <span className="cart-badge">{totalQuantity}</span>
              )}{" "}
            </Link>{" "}
          </div>{" "}
        </div>
        {/* 3. Thanh Menu Chính (Main Navigation) */}{" "}
        <nav className="main-nav-bar">
          {" "}
          <div className="nav-links">
            <Link to="/">Trang chủ</Link> <Link to="/trang1">Sản phẩm</Link>{" "}
            <Link to="/trang2">Sinh viên</Link>{" "}
            <Link to="/chat">Chat với AI</Link>{" "}
            {user && user.username === "admin" ? (
              <a href="/admin/products">Quản trị</a>
            ) : (
              <span className="disabled-link">Quản trị</span>
            )}{" "}
          </div>{" "}
          <div className="admin-link-container">
            {" "}
            {user ? (
              <>
                {" "}
                <span className="username">
                  👤 {user.username}{" "}
                  {user.username === "admin" && (
                    <span className="admin-badge">(Admin)</span>
                  )}{" "}
                </span>{" "}
                <button className="logout-btn" onClick={handleLogout}>
                  Đăng xuất{" "}
                </button>{" "}
              </>
            ) : (
              <a href="/login" className="login-btn">
                Đăng nhập{" "}
              </a>
            )}{" "}
          </div>{" "}
        </nav>{" "}
      </header>
      {/* --- Nội dung chính --- */}{" "}
      <main className="main-content">
        {" "}
        <div className="menu-trai-container">
          {/* Đây là nơi bạn đặt Menu Trái nếu có */}{" "}
        </div>{" "}
        <div className="outlet-content">
          <Outlet />{" "}
        </div>{" "}
      </main>
      {/* --- Footer --- */}{" "}
      <footer className="footer">
        <p>© 2025 HCE - Website bán hàng demo. All rights reserved.</p>{" "}
      </footer>{" "}
    </div>
  );
};

export default Layout;
