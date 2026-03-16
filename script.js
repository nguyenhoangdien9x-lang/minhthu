/* --- 1. CẤU HÌNH KHUNG HERO (CAROUSEL CONTAINER) --- */
.hero-section {
    height: 100vh;
    position: relative;
    display: flex; align-items: center; justify-content: center;
    text-align: center; color: white;
    overflow: hidden; /* Cắt bỏ phần ảnh thừa nằm ngoài màn hình */
}

.hero-overlay {
    position: absolute; top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(0, 0, 0, 0.4); /* Làm tối để chữ nổi bật */
    z-index: 2; /* Nằm trên ảnh, dưới chữ */
}

.hero-content {
    position: relative; z-index: 3; /* Chữ nằm trên cùng */
}

/* --- 2. CẤU HÌNH CÁC TẤM ẢNH (SLIDES) --- */
.hero-slider {
    display: flex; /* Đặt 3 tấm ảnh nằm hàng ngang */
    width: 300%;   /* Khung dài gấp 3 lần màn hình */
    height: 100%;
    position: absolute; top: 0; left: 0; z-index: 1; /* Nằm dưới cùng */
    
    /* 1. Kích hoạt hiệu ứng cuộn: 
       Tên: sliding | Thời gian: 15s | Lặp lại: vô hạn | Kiểu: mượt mà */
    animation: sliding 15s infinite;
}

.slide {
    width: 100%; /* Mỗi tấm ảnh chiếm 100% chiều rộng màn hình */
    height: 100%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

/* --- 3. ĐƯỜNG DẪN 3 HÌNH ẢNH CỦA CẬU --- */
/* Cậu tải 3 ảnh đám cưới lên và thay link vào đây nhé */
.slide-1 { background-image: url('https://images.unsplash.com/photo-1583939000240-690b63924ee2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'); }
.slide-2 { background-image: url('https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'); }
.slide-3 { background-image: url('https://images.unsplash.com/photo-1511285560929-80b456dfe0ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'); }

/* --- 4. ĐỊNH NGHĨA HIỆU ỨNG TỰ ĐỘNG CUỘN (KEYFRAMES) --- */
/* Tổng thời gian là 15 giây (mỗi ảnh hiện 5 giây) */
@keyframes sliding {
    /* 0s - 4.5s: Hiện Ảnh 1 (Dừng lại để người xem nhìn) */
    0%, 30% { transform: translateX(0%); }
    
    /* 4.5s - 5s: Cuộn từ Ảnh 1 sang Ảnh 2 (Di chuyển mượt) */
    33.33% { transform: translateX(-33.33%); }
    
    /* 5s - 9.5s: Hiện Ảnh 2 */
    33.33%, 63.33% { transform: translateX(-33.33%); }
    
    /* 9.5s - 10s: Cuộn từ Ảnh 2 sang Ảnh 3 */
    66.66% { transform: translateX(-66.66%); }
    
    /* 10s - 14.5s: Hiện Ảnh 3 */
    66.66%, 96.66% { transform: translateX(-66.66%); }
    
    /* 14.5s - 15s: Cuộn từ Ảnh 3 quay về Ảnh 1 */
    100% { transform: translateX(0%); }
}

/* --- Các phần chữ và bộ đếm ngược giữ nguyên --- */
.hero-content h1 { font-family: var(--font-heading); font-size: 4rem; margin: 10px 0; font-style: italic; }
.save-the-date, .wedding-date { font-size: 1.2rem; letter-spacing: 3px; text-transform: uppercase; }

// =========================================
// 2. BỘ ĐẾM NGƯỢC (COUNTDOWN)
// =========================================
// Thay đổi ngày cưới của cậu ở đây (Năm, Tháng - 1, Ngày, Giờ, Phút)
// Ví dụ: 15/10/2026 10:30 AM -> (2026, 9, 15, 10, 30, 0) (Lưu ý tháng bắt đầu từ 0)
const weddingDate = new Date(2026, 9, 4, 6, 7, 0).getTime();

const countdownTimer = setInterval(() => {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance < 0) {
        clearInterval(countdownTimer);
        document.getElementById("countdown").innerHTML = "<h2>Đám cưới đang diễn ra! 🎉</h2>";
        return;
    }

    // Tính toán thời gian
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Hiển thị ra màn hình (thêm số 0 đằng trước nếu nhỏ hơn 10)
    document.getElementById("days").innerText = days < 10 ? "0" + days : days;
    document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
    document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
    document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;
}, 1000);

// =========================================
// 3. HIỆU ỨNG HIỆN HÌNH KHI CUỘN (REVEAL)
// =========================================
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
// =========================================
// 4. ĐIỀU KHIỂN NHẠC NỀN
// =========================================
const musicToggle = document.getElementById('music-toggle');
const bgMusic = document.getElementById('bg-music');
let isPlaying = false;

musicToggle.addEventListener('click', () => {
    if (isPlaying) {
        // Nếu đang phát thì Tắt
        bgMusic.pause();
        musicToggle.innerText = "🎵 Bật nhạc nền";
        musicToggle.classList.remove('playing');
    } else {
        // Nếu đang tắt thì Bật
        bgMusic.play();
        musicToggle.innerText = "⏸ Tắt nhạc";
        musicToggle.classList.add('playing');
    }
    // Đảo ngược trạng thái
    isPlaying = !isPlaying;
});
