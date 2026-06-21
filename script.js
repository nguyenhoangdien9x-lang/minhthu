// Khai báo các biến toàn cục để quản lý phân trang lời chúc
let allWishes = [];
let displayedCount = 0;
const wishesPerPage = 5; // Thay đổi số này nếu bạn muốn hiện nhiều hoặc ít hơn mỗi lượt

document.addEventListener('DOMContentLoaded', function() {
    // === TÍNH NĂNG LIGHTBOX XEM ẢNH ===
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeBtn = document.querySelector(".close-btn");
    const images = document.querySelectorAll(".gallery-img");

    images.forEach(img => {
        img.addEventListener("click", function() {
            lightbox.style.display = "block";
            lightboxImg.src = this.src;
        });
    });

    closeBtn.addEventListener("click", function() {
        lightbox.style.display = "none";
    });

    lightbox.addEventListener("click", function(e) {
        if (e.target !== lightboxImg) {
            lightbox.style.display = "none";
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === "Escape" && lightbox.style.display === "block") {
            lightbox.style.display = "none";
        }
    });

    // === TÍNH NĂNG TỰ ĐỘNG LẤY VÀ PHÂN TRANG LỜI CHÚC ===
    loadWishes();

    // Lắng nghe sự kiện click vào nút Xem thêm
    const loadMoreBtn = document.getElementById('load-more-btn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', renderMoreWishes);
    }
});

function loadWishes() {
    const sheetId = '1GljxDQcyBITzHgAxsL9ROI_vsSX_xzu6_iIZLsaEwX4';
    const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&gid=0`;

    fetch(url)
        .then(res => res.text())
        .then(text => {
            const jsonStr = text.substring(47, text.length - 2);
            const json = JSON.parse(jsonStr);
            const rows = json.table.rows;
            
            allWishes = []; // Reset dữ liệu mảng cũ

            rows.forEach(row => {
                if (row.c && row.c[1] && row.c[2]) {
                    const time = row.c[0] ? row.c[0].f || row.c[0].v : '';
                    const name = row.c[1].v;
                    const wish = row.c[2].v;

                    // Bỏ qua dòng tiêu đề của Google Sheets
                    if (name !== "Tên người chúc") {
                        allWishes.push({ time, name, wish });
                    }
                }
            });

            // ĐẢO NGƯỢC MẢNG: Lời chúc nhập sau (mới nhất) sẽ đảo lên vị trí đầu tiên
            allWishes.reverse();

            // Xóa chữ "Đang tải lời chúc..."
            const container = document.getElementById('wishes-container');
            container.innerHTML = '';
            displayedCount = 0;

            // Gọi hàm hiển thị lượt đầu tiên
            renderMoreWishes();
        })
        .catch(error => {
            console.error("Lỗi tải dữ liệu từ Sheets:", error);
            document.getElementById('wishes-container').innerHTML = '<p>Không thể kết nối đến danh sách lời chúc lúc này.</p>';
        });
}

function renderMoreWishes() {
    const container = document.getElementById('wishes-container');
    const loadMoreBtn = document.getElementById('load-more-btn');
    
    // Cắt mảng lấy ra số lượng lời chúc cần hiển thị tiếp theo
    const nextBatch = allWishes.slice(displayedCount, displayedCount + wishesPerPage);
    
    // Tạo HTML cho từng lời chúc và chèn vào giao diện
    nextBatch.forEach(item => {
        const wishElement = document.createElement('div');
        wishElement.className = 'wish-item';
        wishElement.innerHTML = `
            <h4>${item.name}</h4>
            <p class="wish-text">${item.wish}</p>
            <span class="wish-time">${item.time}</span>
        `;
        container.appendChild(wishElement);
    });

    // Cập nhật lại số lượng lời chúc đã hiển thị lên màn hình
    displayedCount += nextBatch.length;

    // Kiểm tra xem đã hiển thị hết toàn bộ lời chúc chưa để ẩn/hiện nút
    if (displayedCount >= allWishes.length) {
        loadMoreBtn.style.display = 'none'; // Ẩn nút nếu đã hiện hết
    } else {
        loadMoreBtn.style.display = 'inline-block'; // Hiện nút nếu còn lời chúc chưa xem
    }
}
