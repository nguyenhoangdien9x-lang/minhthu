// =========================================
// 1. HIỆU ỨNG THANH MENU ĐỔI MÀU KHI CUỘN
// =========================================
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    // Khi cuộn xuống quá 50px, menu sẽ chuyển thành màu trắng
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// =========================================
// 2. BỘ ĐẾM NGƯỢC (COUNTDOWN)
// =========================================
// Thay đổi ngày cưới của cậu ở đây (Năm, Tháng - 1, Ngày, Giờ, Phút)
// Ví dụ: 15/10/2026 10:30 AM -> (2026, 9, 15, 10, 30, 0) (Lưu ý tháng bắt đầu từ 0)
const weddingDate = new Date(2026, 6, 4, 7, 0, 0).getTime();

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
