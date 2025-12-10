import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import { useNavigate } from "react-router-dom";

const Trang1 = () => {
  const [featured, setFeatured] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getFeatured = async () => {
      const { data } = await supabase
        .from("product1")
        .select("*")
        .gt("rating_rate", 4.3) // Sản phẩm nổi bật
        .limit(10);

      setFeatured(data);
    };
    getFeatured();
  }, []);

  return (
    <div className="container mt-4">

      {/* ====================== BANNER SLIDER ======================= */}
      <div id="mainBanner" className="carousel slide mb-5" data-bs-ride="carousel">
        <div className="carousel-inner rounded-4 shadow">
          <div className="carousel-item active">
            <img
              src="https://img.freepik.com/free-vector/flat-sale-banner_23-2148944277.jpg"
              className="d-block w-100"
              style={{ height: "350px", objectFit: "cover" }}
              alt="banner"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://img.freepik.com/free-psd/elegant-fashion-sale-banner-template_120329-1828.jpg"
              className="d-block w-100"
              style={{ height: "350px", objectFit: "cover" }}
              alt="banner"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://img.freepik.com/free-vector/super-sale-banner-template_23-2148897329.jpg"
              className="d-block w-100"
              style={{ height: "350px", objectFit: "cover" }}
              alt="banner"
            />
          </div>
        </div>
      </div>

      {/* ====================== SẢN PHẨM NỔI BẬT ======================= */}
      <h2 className="fw-bold mb-3 text-center">🔥 SẢN PHẨM NỔI BẬT</h2>

      <div id="featuredProducts" className="carousel slide" data-bs-interval="4000">
        <div className="carousel-inner">

          {/* Tự động chia sản phẩm thành các nhóm 4 sản phẩm/slide */}
          {Array.from({ length: Math.ceil(featured.length / 4) }).map((_, slideIndex) => (
            <div
              className={`carousel-item ${slideIndex === 0 ? "active" : ""}`}
              key={slideIndex}
            >
              <div className="row">
                {featured
                  .slice(slideIndex * 4, slideIndex * 4 + 4)
                  .map((p) => (
                    <div className="col-md-3 mb-4" key={p.id}>
                      <div
                        className="card h-100 shadow"
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate(`/detail/${p.id}`)}
                      >
                        <img
                          src={p.image}
                          className="card-img-top"
                          style={{ height: "200px", objectFit: "cover" }}
                        />
                        <div className="card-body text-center">
                          <h6 className="text-truncate">{p.title}</h6>
                          <p className="text-danger fw-bold">${p.price}</p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}

        </div>

        {/* Nút điều hướng */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#featuredProducts"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon"></span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#featuredProducts"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>

      {/* Nút xem tất cả */}
      <div className="text-center mt-4">
        <button
          className="btn btn-dark px-4 py-2"
          onClick={() => navigate("/products")}
        >
          Xem tất cả sản phẩm →
        </button>
      </div>

    </div>
  );
};

export default Trang1;
