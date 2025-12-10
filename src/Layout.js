// src/components/Layout.jsx

import "./assets/css/layout.css";
import logo from "./assets/images/logo.png";
import "./ProductDetails";
import { Outlet, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "./CartContext";

const Layout = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { totalQuantity } = useCart();

  // ✅ Cập nhật user ngay khi login/logout (không cần reload)
  useEffect(() => {
    const loadUser = () => {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    loadUser(); // chạy lần đầu

    // ✅ Lắng nghe thay đổi localStorage
    window.addEventListener("storage", loadUser);

    return () => {
      window.removeEventListener("storage", loadUser);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="layout-container">
      <header className="main-header">
        <div className="logo-search-bar">
          <Link to="/" className="logo-link">
            <img src={logo} alt="Logo trường HCE" className="main-logo" />
          </Link>

          <div className="search-cart-area">
            <div className="search-box">
              <input type="text" placeholder="🔍 Tìm kiếm sản phẩm..." />
              <button className="search-btn">Tìm</button>
            </div>

            <Link to="/cart" className="cart-link">
              🛒 Giỏ hàng
              {totalQuantity > 0 && (
                <span className="cart-badge">{totalQuantity}</span>
              )}
            </Link>
          </div>
        </div>

        <nav className="main-nav-bar">
          <div className="nav-links">
            <Link to="/trang1">Trang chủ</Link>
            <Link to="/">Sản phẩm</Link>
            <Link to="/chat">Chat với AI</Link>
            <Link to="/contact">Liên hệ</Link>

            {user && user.username === "admin" ? (
              <Link to="/admin/products">Quản trị</Link>
            ) : (
              <span className="disabled-link">Quản trị</span>
            )}
          </div>

          <div className="admin-link-container">
            {user ? (
              <>
                <span className="username">
                  👤 {user.username}
                  {user.username === "admin" && (
                    <span className="admin-badge">(Admin)</span>
                  )}
                </span>

                <button className="logout-btn" onClick={handleLogout}>
                  Đăng xuất
                </button>
              </>
            ) : (
              <Link to="/login" className="login-btn">
                Đăng nhập
              </Link>
            )}
          </div>
        </nav>
      </header>

      <main className="main-content">
        <div className="menu-trai-container"></div>
        <div className="outlet-content">
          <Outlet />
        </div>
      </main>

      <footer className="site-footer mt-5">
        <div className="container">
          <div className="row">
            <div className="col-md-3 mb-4">
              <h5 className="footer-title">HCE Store</h5>
              <p>
                Nền tảng mua sắm trực tuyến với hàng ngàn sản phẩm chất lượng,
                giá tốt, giao hàng nhanh chóng và hỗ trợ tận tâm.
              </p>

              <div className="social-icons mt-3">
                <i className="bi bi-facebook"></i>
                <i className="bi bi-instagram"></i>
                <i className="bi bi-youtube"></i>
              </div>
            </div>

            <div className="col-md-3 mb-4">
              <h5 className="footer-title">Danh mục</h5>
              <ul className="footer-list">
                <li>
                  <a href="#">Điện thoại</a>
                </li>
                <li>
                  <a href="#">Laptop</a>
                </li>
                <li>
                  <a href="#">Thời trang</a>
                </li>
                <li>
                  <a href="#">Đồng hồ</a>
                </li>
              </ul>
            </div>

            <div className="col-md-3 mb-4">
              <h5 className="footer-title">Liên kết nhanh</h5>
              <ul className="footer-list">
                <li>
                  <a href="#">Giỏ hàng</a>
                </li>
                <li>
                  <a href="#">Khuyến mãi</a>
                </li>
                <li>
                  <a href="#">Chính sách bảo hành</a>
                </li>
                <li>
                  <a href="#">Liên hệ</a>
                </li>
              </ul>
            </div>

            <div className="col-md-3 mb-4">
              <h5 className="footer-title">Hỗ trợ khách hàng</h5>
              <p>
                <i className="bi bi-geo-alt-fill"></i> 123 Nguyễn Trãi, TP Huế
              </p>
              <p>
                <i className="bi bi-telephone-fill"></i> 0123 456 789
              </p>
              <p>
                <i className="bi bi-envelope-fill"></i> support@hce.com
              </p>
            </div>
          </div>

          <hr />

          <div className="text-center footer-copy">
            © 2025 HCE Store All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
