// Khai báo các biến toàn cục để quản lý phân trang lời chúc
let allWishes = [];
let displayedCount = 0;
const wishesPerPage = 5; // Thay đổi số này nếu bạn muốn hiện nhiều hoặc ít hơn mỗi lượt

document.addEventListener('DOMContentLoaded', function() {
    // === TỰ ĐỘNG KÉO ẢNH TỪ GOOGLE DRIVE THÔNG QUA APPS SCRIPT ===
    
    // Thay link Web app URL của bạn vào đây
    const driveScriptUrl = 'https://script.google.com/macros/s/AKfycbzjdu7Hq_YnfOUkKtg-Ol8tpON1Iw-zjMciupMlzIIaIs_tCd8fyPgnzMjLgf_AXs8/exec';
    
    fetch(driveScriptUrl)
        .then(response => response.json())
        .then(urls => {
            const grid = document.getElementById('grid-vuquy');
            grid.innerHTML = ''; // Xóa chữ "Đang tải..."
            
            // Chạy vòng lặp tạo thẻ img cho từng link lấy được
            urls.forEach((url, index) => {
                const imgElement = document.createElement('img');
                imgElement.src = url;
                imgElement.alt = `Tân Hôn ${index + 1}`;
                imgElement.className = 'gallery-img reveal active'; // Thêm class hiệu ứng
                imgElement.loading = 'lazy'; // Cực kỳ quan trọng để web không bị đơ
                
                // Thêm sự kiện click để mở Lightbox phóng to
                imgElement.addEventListener("click", function() {
                    document.getElementById("lightbox").style.display = "block";
                    document.getElementById("lightbox-img").src = this.src;
                });
                
                grid.appendChild(imgElement);
            });
        })
        .catch(error => {
            console.error("Lỗi khi tải ảnh:", error);
            document.getElementById('grid-vuquy').innerHTML = '<p>Không thể tải ảnh lúc này.</p>';
        });
    // === HIỆU ỨNG TRƯỢT LÊN KHI CUỘN TRANG (SCROLL REVEAL) ===
    const reveals = document.querySelectorAll('.reveal');

    // Cài đặt độ nhạy: Phần tử hiện ra khoảng 15% màn hình thì mới kích hoạt hiệu ứng
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                // Thêm class 'active' để chạy CSS transition
                entry.target.classList.add('active');
                // Hủy theo dõi sau khi đã hiện ra để tối ưu hiệu năng
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    reveals.forEach(reveal => {
        revealOnScroll.observe(reveal);
    });
    // === XỬ LÝ GỬI FORM LỜI CHÚC MỚI ===
    const wishForm = document.getElementById('wish-form');
    const submitBtn = document.getElementById('submit-wish-btn');
    const formMessage = document.getElementById('form-message');

    // THAY ĐƯỜNG LINK NÀY BẰNG WEB APP URL CỦA BẠN (Từ Bước 1)
    const scriptURL = 'https://script.google.com/macros/s/AKfycbxE0OGh5LMh-BDC69Jn-NPt8MdBPTdFvdBCng2cYEvINhmb0VKsTyy2MHrXrDJ9m5M9Bw/exec';

    wishForm.addEventListener('submit', e => {
        e.preventDefault(); // Ngăn chặn trang bị reload khi bấm gửi
        
        // Đổi trạng thái nút thành đang gửi
        submitBtn.disabled = true;
        submitBtn.innerText = 'Đang gửi...';
        formMessage.style.display = 'none';

        // Lấy dữ liệu từ form để chuẩn bị gửi
        const formData = new FormData(wishForm);

        fetch(scriptURL, { method: 'POST', body: formData })
            .then(response => response.json())
            .then(data => {
                if(data.result === 'success') {
                    // Thông báo thành công và xóa trắng form
                    formMessage.innerText = 'Cảm ơn bạn! Lời chúc đã được gửi thành công.';
                    formMessage.style.color = 'var(--accent-color)';
                    formMessage.style.display = 'block';
                    wishForm.reset();
                    
                    // Tải lại danh sách lời chúc để hiện ngay lời chúc vừa gửi
                    loadWishes();
                } else {
                    throw new Error('Lỗi từ server');
                }
            })
            .catch(error => {
                console.error('Error!', error.message);
                formMessage.innerText = 'Đã có lỗi xảy ra. Vui lòng thử lại sau.';
                formMessage.style.color = 'red';
                formMessage.style.display = 'block';
            })
            .finally(() => {
                // Trả lại trạng thái bình thường cho nút bấm
                submitBtn.disabled = false;
                submitBtn.innerText = 'Gửi Lời Chúc';
            });
    });
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
