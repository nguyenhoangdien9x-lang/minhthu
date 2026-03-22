/* --- CÀI ĐẶT CHUNG --- */
:root {
    --primary-color: #c89d71; /* Màu vàng hồng lãng mạn */
    --text-dark: #4a4a4a;
    --text-light: #777;
    --bg-light: #fdfaf6; /* Màu nền kem sữa */
    --font-heading: 'Playfair Display', serif;
    --font-body: 'Quicksand', sans-serif;
}

* { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }

body {
    font-family: var(--font-body);
    color: var(--text-dark);
    line-height: 1.6;
    background-color: #fff;
}

h1, h2, h3, .save-the-date { font-family: var(--font-heading); }
.text-center { text-align: center; }
.text-muted { color: var(--text-light); font-size: 1.1rem; max-width: 700px; margin: 0 auto 20px; }
.container { max-width: 1000px; margin: 0 auto; padding: 0 20px; }
.section { padding: 80px 0; }
.bg-light { background-color: var(--bg-light); }
.section-title { text-align: center; font-size: 2.5rem; color: var(--primary-color); margin-bottom: 40px; }

/* --- NAVBAR --- */
.navbar { position: fixed; top: 0; width: 100%; background: rgba(255,255,255,0.95); padding: 15px 30px; display: flex; justify-content: space-between; align-items: center; z-index: 1000; box-shadow: 0 2px 10px rgba(0,0,0,0.05); }
.logo { font-family: var(--font-heading); font-size: 1.5rem; font-weight: bold; color: var(--primary-color); }
.nav-links { list-style: none; display: flex; gap: 20px; }
.nav-links a { text-decoration: none; color: var(--text-dark); font-weight: 600; transition: color 0.3s; }
.nav-links a:hover { color: var(--primary-color); }

/* --- HERO SECTION --- */
.hero-section { height: 100vh; background: url('https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1920&q=80') center/cover no-repeat; position: relative; display: flex; align-items: center; justify-content: center; text-align: center; color: #fff; }
.hero-overlay { position: absolute; inset: 0; background: rgba(0, 0, 0, 0.4); }
.hero-content { position: relative; z-index: 10; padding: 20px; }

.save-the-date { font-size: 1.5rem; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 20px; }
.hero-content h1 { font-size: 4rem; margin: 10px 0; text-shadow: 2px 2px 4px rgba(0,0,0,0.5); }
.wedding-date { font-size: 1.5rem; letter-spacing: 5px; margin-bottom: 30px; font-weight: bold; }

/* 3 Ảnh Đại Diện */
.hero-avatars { display: flex; justify-content: center; align-items: center; gap: 15px; margin-bottom: 20px; }
.avatar { width: 100px; height: 100px; border-radius: 50%; object-fit: cover; border: 3px solid #fff; box-shadow: 0 5px 15px rgba(0,0,0,0.3); max-width: 100%; transition: transform 0.3s; }
.avatar-main { width: 130px; height: 130px; border: 4px solid var(--primary-color); z-index: 2; }
.avatar:hover { transform: scale(1.05); }

/* Đếm ngược */
.countdown { display: flex; justify-content: center; gap: 15px; margin-top: 30px; }
.time-box { background: rgba(255,255,255,0.2); backdrop-filter: blur(5px); padding: 15px; border-radius: 10px; min-width: 80px; border: 1px solid rgba(255,255,255,0.3); }
.time-box span { display: block; font-size: 2rem; font-weight: bold; font-family: var(--font-heading); }
.time-box p { font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px; margin-top: 5px; }

/* --- CÁC THÀNH PHẦN KHÁC --- */
.image-wrapper img { width: 100%; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); margin-top: 20px; }

.event-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: center; }
.event-card { background: #fff; padding: 40px; border-radius: 15px; box-shadow: 0 5px 20px rgba(0,0,0,0.05); border-top: 5px solid var(--primary-color); }
.event-card h3 { font-size: 1.8rem; margin-bottom: 20px; color: var(--text-dark); }
.event-details p { margin-bottom: 10px; font-size: 1.1rem; }
.event-note { margin-top: 20px; font-style: italic; color: var(--primary-color); }
.event-map iframe { width: 100%; height: 350px; border: none; border-radius: 15px; box-shadow: 0 5px 20px rgba(0,0,0,0.05); }

/* Form RSVP */
.rsvp-form { max-width: 600px; margin: 0 auto; display: flex; flex-direction: column; gap: 15px; }
.rsvp-form input, .rsvp-form select, .rsvp-form textarea { width: 100%; padding: 15px; border: 1px solid #ddd; border-radius: 8px; font-family: var(--font-body); font-size: 1rem; transition: border-color 0.3s; }
.rsvp-form input:focus, .rsvp-form select:focus, .rsvp-form textarea:focus { outline: none; border-color: var(--primary-color); }
.btn-primary { background-color: var(--primary-color); color: #fff; padding: 15px; border: none; border-radius: 8px; font-size: 1.1rem; font-weight: bold; cursor: pointer; transition: background 0.3s; font-family: var(--font-body); }
.btn-primary:hover { background-color: #b0875e; }

/* Mã QR Gửi quà */
.qr-card { background: #fff; max-width: 400px; margin: 30px auto 0; padding: 30px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.08); }
.qr-img { width: 200px; height: 200px; margin-bottom: 20px; border: 1px solid #eee; padding: 10px; border-radius: 10px; }
.highlight-text { color: var(--primary-color); font-size: 1.2rem; }

/* Trình phát nhạc */
.music-player { position: fixed; bottom: 20px; left: 20px; z-index: 1000; }
.music-btn { background: #fff; border: 2px solid var(--primary-color); color: var(--primary-color); padding: 10px 20px; border-radius: 50px; cursor: pointer; font-family: var(--font-body); font-weight: bold; box-shadow: 0 4px 10px rgba(0,0,0,0.1); transition: all 0.3s; }
.music-btn:hover { background: var(--primary-color); color: #fff; }

.footer { background: var(--text-dark); color: #fff; text-align: center; padding: 30px 20px; margin-top: 40px; }

/* --- RESPONSIVE CHO ĐIỆN THOẠI --- */
@media (max-width: 768px) {
    .nav-links { display: none; /* Ẩn menu trên mobile cho gọn */ }
    .hero-content h1 { font-size: 2.5rem; }
    .event-grid { grid-template-columns: 1fr; }
    .countdown { flex-wrap: wrap; }
    .time-box { flex: 1 1 40%; }
    .avatar { width: 70px; height: 70px; }
    .avatar-main { width: 90px; height: 90px; }
}
