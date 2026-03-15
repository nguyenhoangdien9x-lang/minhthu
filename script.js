// 1. CHÀO HỎI
const chiecNut = document.getElementById('nut-chao');
const oNhapTen = document.getElementById('nhap-ten');
const theHienThi = document.getElementById('loi-chao');

function guiLoiChao() {
    const ten = oNhapTen.value.trim();
    if (ten) {
        theHienThi.innerText = `Chào mừng ${ten}! Chúc cậu một ngày tuyệt vời 🚀`;
        theHienThi.style.color = "var(--accent)";
        oNhapTen.value = "";
    }
}
chiecNut.addEventListener('click', guiLoiChao);

// 2. DARK MODE + LOCAL STORAGE
const nutDarkMode = document.getElementById('dark-mode-toggle');
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-theme');
    nutDarkMode.innerText = "☀️ Chế độ sáng";
}

nutDarkMode.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    nutDarkMode.innerText = isDark ? "☀️ Chế độ sáng" : "🌙 Chế độ tối";
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// 3. SCROLL REVEAL (MẮT THẦN QUAN SÁT)
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));