import React, { useState } from "react";
import "./assets/css/contact.css";

const Contact = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Giả lập gửi thành công
    setStatus("✅ Gửi liên hệ thành công! Chúng tôi sẽ phản hồi sớm nhất.");

    // ✅ Reset form
    setFullname("");
    setEmail("");
    setMessage("");

    // ✅ Ẩn thông báo sau 4 giây
    setTimeout(() => setStatus(""), 4000);
  };

  return (
    <div className="contact-container">
      <h2 className="contact-title">📞 Liên hệ với HCE Store</h2>

      <p className="contact-desc">
        Nếu bạn có bất kỳ câu hỏi nào, hãy gửi tin nhắn cho chúng tôi.
      </p>

      <div className="contact-content">
        
        {/* ✅ FORM LIÊN HỆ */}
        <form className="contact-form" onSubmit={handleSubmit}>
          <label>Họ và tên</label>
          <input
            type="text"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            placeholder="Nhập họ tên..."
            required
          />

          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Nhập email..."
            required
          />

          <label>Nội dung</label>
          <textarea
            rows="5"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Bạn muốn gửi gì cho chúng tôi?"
            required
          />

          <button type="submit" className="contact-btn">
            Gửi liên hệ
          </button>

          {status && <p className="contact-status">{status}</p>}
        </form>

        {/* ✅ THÔNG TIN + GOOGLE MAP */}
        <div className="contact-info">
          <h4>Thông tin cửa hàng</h4>
          <p><i className="bi bi-geo-alt-fill"></i> 123 Nguyễn Trãi, TP Huế</p>
          <p><i className="bi bi-telephone-fill"></i> 0123 456 789</p>
          <p><i className="bi bi-envelope-fill"></i> support@hce.com</p>

          <h4 className="mt-4">Bản đồ</h4>
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.123456!2d107.590000!3d16.463713!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3141a13b12345678%3A0xabcdef123456789!2zMTIzIE5ndXnhu4VuIFRy4bqjSSwgSOG7kyBDaMOidSwgSHXhu5U!5e0!3m2!1svi!2s!4v1700000000000"
            width="100%"
            height="250"
            style={{ border: 0, borderRadius: "10px" }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>

          <h4 className="mt-4">Mạng xã hội</h4>
          <div className="social-icons">
            <i className="bi bi-facebook"></i>
            <i className="bi bi-instagram"></i>
            <i className="bi bi-youtube"></i>
            <i className="bi bi-tiktok"></i>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;
