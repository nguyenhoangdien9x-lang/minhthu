document.addEventListener('DOMContentLoaded', function() {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeBtn = document.querySelector(".close-btn");
    const images = document.querySelectorAll(".gallery-img");

    // Mở lightbox khi click vào ảnh
    images.forEach(img => {
        img.addEventListener("click", function() {
            lightbox.style.display = "block";
            lightboxImg.src = this.src;
        });
    });

    // Đóng lightbox khi click nút X
    closeBtn.addEventListener("click", function() {
        lightbox.style.display = "none";
    });

    // Đóng lightbox khi click ra ngoài ảnh
    lightbox.addEventListener("click", function(e) {
        if (e.target !== lightboxImg) {
            lightbox.style.display = "none";
        }
    });

    // Hỗ trợ đóng lightbox bằng phím ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === "Escape" && lightbox.style.display === "block") {
            lightbox.style.display = "none";
        }
    });
});
document.addEventListener('DOMContentLoaded', function() {
    // [Đoạn code Lightbox xem ảnh của phần trước vẫn giữ nguyên ở đây]
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

    // === TÍNH NĂNG TỰ ĐỘNG LẤY LỜI CHÚC TỪ GOOGLE SHEETS ===
    loadWishes();
});

function loadWishes() {
    // ID file sheet của bạn
    const sheetId = '1GljxDQcyBITzHgAxsL9ROI_vsSX_xzu6_iIZLsaEwX4';
    // API đọc dữ liệu dạng JSON từ Google Sheets
    const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&gid=0`;

    fetch(url)
        .then(res => res.text())
        .then(text => {
            // Google trả về text bị bọc trong hàm, cần cắt chuỗi để lấy chuẩn JSON
            const jsonStr = text.substring(47, text.length - 2);
            const json = JSON.parse(jsonStr);
            
            const rows = json.table.rows;
            const container = document.getElementById('wishes-container');
            container.innerHTML = ''; // Xóa chữ "Đang tải lời chúc..."

            // Chạy vòng lặp qua từng hàng (bỏ qua hàng tiêu đề đầu tiên nếu cần)
            // Lưu ý: data bắt đầu từ rows[0] (có thể là tiêu đề tùy cấu trúc sheet)
            rows.forEach((row, index) => {
                // Kiểm tra nếu hàng đó có dữ liệu
                if (row.c && row.c[1] && row.c[2]) {
                    // Cột A: Thời gian (row.c[0])
                    // Cột B: Tên (row.c[1])
                    // Cột C: Lời chúc (row.c[2])
                    
                    const time = row.c[0] ? row.c[0].f || row.c[0].v : '';
                    const name = row.c[1].v;
                    const wish = row.c[2].v;

                    // Không in hàng tiêu đề "Thời gian, Tên người chúc, Lời chúc"
                    if (name !== "Tên người chúc") {
                        const wishElement = document.createElement('div');
                        wishElement.className = 'wish-item';
                        wishElement.innerHTML = `
                            <h4>${name}</h4>
                            <p class="wish-text">${wish}</p>
                            <span class="wish-time">${time}</span>
                        `;
                        container.appendChild(wishElement);
                    }
                }
            });
        })
        .catch(error => {
            console.error("Lỗi khi tải dữ liệu từ Sheets:", error);
            document.getElementById('wishes-container').innerHTML = '<p>Không thể tải lời chúc lúc này, bạn vui lòng thử lại sau nhé.</p>';
        });
}
