import "./assets/css/layout.css";
import logo from "./assets/images/Ten-truong-do-1000x159.png";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Layout = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

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
      {/* --- Header --- */}
      <header className="header">
        <div className="top-bar">
          <div className="right-menu">
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
        </div>

        {/* --- Logo + Tìm kiếm --- */}
        <div className="logo-bar">
          <a href="/">
            <img src={logo} alt="Logo" className="main-logo" />
          </a>

          <div className="search-box">
            <input type="text" placeholder="🔍 Tìm kiếm sản phẩm..." />
            <button>Tìm</button>
          </div>
        </div>

        {/* --- Menu chính --- */}
        <nav className="main-menu">
          <a href="/">Trang chủ</a>
          <a href="/trang1">Sản phẩm</a>
          <a href="/trang2">Sinh viên</a>
          {user && user.username === "admin" ? (
            <a href="/admin/products">Quản trị</a>
          ) : (
            <span className="disabled-link">Quản trị</span>
          )}
        </nav>
      </header>

      {/* --- Nội dung chính --- */}
      <main className="main-content">
        <Outlet />
      </main>

      {/* --- Footer --- */}
      <footer className="footer">
        <p>© 2025 HCE - Website bán hàng demo. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
