import "./assets/css/layout.css";
import logo from "./assets/images/Ten-truong-do-1000x159.png";
import { Outlet, useNavigate, Link } from "react-router-dom"; // Thêm Link
import { useEffect, useState } from "react";
// Giả định: Bạn có một hook hoặc cách để lấy tổng số lượng sản phẩm trong giỏ hàng
// Ví dụ: import { useCart } from './contexts/CartContext';

const Layout = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  // Giả định: Lấy tổng số lượng từ một context hoặc state (tạm thời đặt là 0)
  // const { totalQuantity } = useCart();
  const totalQuantity = 2; // Ví dụ minh họa có 2 sản phẩm trong giỏ

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
      {/* --- HEADER CHÍNH (TỔNG HỢP 3 PHẦN TỐI ƯU) --- */}
      <header className="main-header">
        {/* 1. Thanh Top Bar (Đăng nhập/Đăng xuất) *
        </div>

        {/* 2. Thanh Logo và Tìm kiếm */}
        <div className="logo-search-bar">
          <Link to="/" className="logo-link">
            <img src={logo} alt="Logo trường HCE" className="main-logo" />
          </Link>

          {/* Hộp tìm kiếm và Giỏ hàng */}
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

        {/* 3. Thanh Menu Chính (Main Navigation) */}
        <nav className="main-nav-bar">
          <div className="nav-links">
            <Link to="/">Trang chủ</Link>
            <Link to="/trang1">Sản phẩm</Link>
            <Link to="/trang2">Sinh viên</Link>
            <Link to="/chat">Chat với AI</Link>
          </div>

          <div className="admin-link-container">
            {user ? (
              <>
                <span className="username">
                  👤 {user.username}{" "}
                  {user.username === "admin" && (
                    <span className="admin-badge">(Admin)</span>
                  )}
                </span>
                <button className="logout-btn" onClick={handleLogout}>
                  Đăng xuất
                </button>
              </>
            ) : (
              <a href="/login" className="login-btn">
                Đăng nhập
              </a>
            )}
          </div>
        </nav>
      </header>

      {/* --- Nội dung chính --- */}
      <main className="main-content">
        <div className="menu-trai-container">
          {/* Đây là nơi bạn đặt Menu Trái nếu có */}
        </div>
        <div className="outlet-content">
          <Outlet />
        </div>
      </main>

      {/* --- Footer --- */}
      <footer className="footer">
        <p>© 2025 HCE - Website bán hàng demo. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
