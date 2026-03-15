// 1. THANH TIẾN TRÌNH
window.addEventListener('scroll', () => {
    const progress = document.getElementById('scroll-progress');
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / height) * 100;
    progress.style.width = scrolled + "%";
});

// 2. CHÀO HỎI
const chiecNut = document.getElementById('nut-chao');
const oNhapTen = document.getElementById('nhap-ten');
const theHienThi = document.getElementById('loi-chao');

function guiLoiChao() {
    const ten = oNhapTen.value.trim();
    if (ten) {
        theHienThi.innerText = `Chào mừng ${ten}! Chúc cậu học code thật vui 🚀`;
        theHienThi.style.color = "var(--accent)";
        oNhapTen.value = "";
    }
}
chiecNut.addEventListener('click', guiLoiChao);

// 3. DARK MODE + LOCAL STORAGE
const nutDarkMode = document.getElementById('dark-mode-toggle');
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-theme');
    nutDarkMode.innerText = "☀️ Chế độ sáng";
}

nutDarkMode.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    nutDarkMode.innerText = isDark ? "☀️ Chế độ sáng" : "🌙 Chế độ tối";
});

// 4. SCROLL REVEAL
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
// =========================================
// 5. HIỆU ỨNG CHỮ TỰ ĐÁNH (TYPING EFFECT)
// =========================================

function tuDongDanhChu(idElement, vanBan, tocDo = 100) {
    let i = 0;
    const element = document.getElementById(idElement);
    element.innerText = ""; // Xóa chữ cũ đi trước khi gõ

    function gõ() {
        if (i < vanBan.length) {
            element.innerText += vanBan.charAt(i);
            i++;
            setTimeout(gõ, tocDo); // Chờ một chút rồi gõ chữ tiếp theo
        }
    }
    gõ();
}

// Chạy hiệu ứng ngay khi trang web vừa load xong
window.addEventListener('load', () => {
    tuDongDanhChu("loi-chao", "Chào mừng cậu đến với thế giới lập trình đầy sáng tạo! 🚀");
});