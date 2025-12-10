import React, { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import { useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";

const ListProducts_SP = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();
  const { addToCart } = useCart();

  // Lấy tất cả category
  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await supabase.from("product1").select("category");
      const unique = [...new Set(data.map((item) => item.category))];
      setCategories(unique);
    };
    fetchCategories();
  }, []);

  // Lấy danh sách sản phẩm
  useEffect(() => {
    const fetchProducts = async () => {
      let query = supabase.from("product1").select("*");

      if (category !== "all") {
        query = query.eq("category", category);
      }

      if (search.trim() !== "") {
        query = query.ilike("title", `%${search}%`);
      }

      const { data } = await query.order("id", { ascending: true });
      setProducts(data);
    };

    fetchProducts();
  }, [search, category]);

  const add = (e, p) => {
    e.stopPropagation();
    addToCart(p);
    alert(`Đã thêm ${p.title} vào giỏ hàng!`);
  };

  return (
    <div className="container mt-4">

      <h2 className="text-center mb-4 fw-bold">🛒 TẤT CẢ SẢN PHẨM</h2>

      {/* Bộ lọc */}
      <div className="row mb-4">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="🔍 Tìm sản phẩm..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="col-md-4">
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">Tất cả danh mục</option>
            {categories.map((c, i) => (
              <option key={i} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Danh sách sản phẩm */}
      <div className="row">
        {products.map((p) => (
          <div className="col-md-3 mb-4" key={p.id}>
            <div
              className="card shadow-sm h-100"
              onClick={() => navigate(`/detail/${p.id}`)}
              style={{ cursor: "pointer" }}
            >
              <img
                src={p.image}
                className="card-img-top"
                style={{ height: "200px", objectFit: "cover" }}
                alt={p.title}
              />
              <div className="card-body text-center">
                <h6 className="card-title">{p.title}</h6>
                <p className="text-danger fw-bold">${p.price}</p>
                <button
                  className="btn btn-primary w-100"
                  onClick={(e) => add(e, p)}
                >
                  🛍 Thêm vào giỏ
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default ListProducts_SP;
