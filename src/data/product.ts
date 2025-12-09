// src/data/product.ts (hoặc src/product.ts tùy vào đường dẫn import)

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

// 🔥 Đã bổ sung CartItem để fix lỗi import
export interface CartItem {
  product: Product;
  quantity: number;
}

export const products: Product[] = [
  // Ví dụ dữ liệu sản phẩm (Giữ nguyên)
  {
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    price: 109.95,
    description:
      "Your perfect pack for everyday use and walks in the forest...",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
  },
  // ... Thêm các sản phẩm khác ở đây ...
];
