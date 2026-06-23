// === CÁC BIẾN TOÀN CỤC ===
let allWishes = [];
let displayedCount = 0;
const wishesPerPage = 5; // Số lời chúc hiện mỗi lần bấm xem thêm

// === CHẠY KHI TRANG WEB VỪA TẢI XONG ===
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Kích hoạt lấy ảnh từ Google Drive cho Lễ Tân Hôn
    const scriptUrlTanHon = 'https://script.google.com/macros/s/AKfycbzjdu7Hq_YnfOUkKtg-Ol8tpON1Iw-zjMciupMlzIIaIs_tCd8fyPgnzMjLgf_AXs8/exec';
    loadImagesFromDrive('grid-tanhon', scriptUrlTanHon);
// BẠN THÊM 2 DÒNG NÀY CHO TIỆC BÁO HỶ NHÉ:
    // Thay đường link bằng Web App URL của thư mục Báo Hỷ vừa tạo ở Bước 1
    const scriptUrlBaoHy = 'https://script.google.com/macros/s/AKfycbxJsJNxmPb1cHCZJvMxo76MrNicbK9jYYImbAWrR0cgK0xPkm3J1UldrjsRDghAHQuB/exec';
    loadImagesFromDrive('grid-baohy', scriptUrlBaoHy);
    // 2. Kích hoạt hiệu ứng cuộn trang (Reveal) lần đầu
    initScrollReveal();

    // 3. Xử lý Form Gửi Lời Chúc
    const wishForm = document.getElementById('wish-form');
    const submitBtn = document.getElementById('submit-wish-btn');
    const formMessage = document.getElementById('form-message');
    const scriptURL = 'https://script.google.com/macros/s/AKfycbxE0OGh5LMh-BDC69Jn-NPt8MdBPTdFvdBCng2cYEvINhmb0VKsTyy2MHrXrDJ9m5M9Bw/exec';

    if (wishForm) {
        wishForm.addEventListener('submit', e => {
            e.preventDefault(); 
            
            submitBtn.disabled = true;
            submitBtn.innerText = 'Đang gửi...';
            formMessage.style.display = 'none';

            const formData = new FormData(wishForm);

            fetch(scriptURL, { method: 'POST', body: formData })
                .then(response => response.json())
                .then(data => {
                    if(data.result === 'success') {
                        formMessage.innerText = 'Cảm ơn bạn! Lời chúc đã được gửi thành công.';
                        formMessage.style.color = 'var(--accent-color)';
                        formMessage.style.display = 'block';
                        wishForm.reset();
                        loadWishes(); // Tải lại danh sách
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
                    submitBtn.disabled = false;
                    submitBtn.innerText = 'Gửi Lời Chúc';
                });
        });
    }

    // 4. Xử lý Lightbox (Xem ảnh phóng to)
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeBtn = document.querySelector(".close-btn");
    const images = document.querySelectorAll(".gallery-img");

    if (lightbox && closeBtn) {
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
    }

    // 5. Tự động lấy lời chúc từ Sheets và xử lý nút Xem thêm
    loadWishes();
    const loadMoreBtn = document.getElementById('load-more-btn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', renderMoreWishes);
    }

}); // === KẾT THÚC KHỐI DOMContentLoaded ===


// ==========================================
// === CÁC HÀM HỖ TRỢ (NẰM NGOÀI ĐỂ TÁI SỬ DỤNG) ===
// ==========================================

// Hàm khởi tạo hiệu ứng Reveal (xuất hiện khi cuộn)
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Ngừng theo dõi khi đã hiện
            }
        });
    }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

    reveals.forEach(el => observer.observe(el));
}

// Hàm lấy ảnh từ Drive
function loadImagesFromDrive(gridId, scriptUrl) {
    const grid = document.getElementById(gridId);
    if (!grid) return; 

    fetch(scriptUrl)
        .then(response => response.json())
        .then(urls => {
            grid.innerHTML = ''; 
            
            urls.forEach((url, index) => {
                const imgElement = document.createElement('img');
                imgElement.src = url;
                imgElement.alt = `Ảnh ${index + 1}`;
                imgElement.className = 'gallery-img reveal';
                imgElement.loading = 'lazy';
                
                imgElement.addEventListener("click", function() {
                    const lightbox = document.getElementById("lightbox");
                    const lightboxImg = document.getElementById("lightbox-img");
                    lightbox.style.display = "block";
                    lightboxImg.src = this.src;
                });
                
                grid.appendChild(imgElement);
            });
            // Quét lại hiệu ứng Reveal cho các ảnh vừa tạo ra
            initScrollReveal();
        })
        .catch(error => {
            console.error("Lỗi:", error);
            grid.innerHTML = '<p>Không thể tải ảnh. Vui lòng kiểm tra lại kết nối.</p>';
        });
}

// Hàm lấy lời chúc từ Sheets
function loadWishes() {
    const sheetId = '1GljxDQcyBITzHgAxsL9ROI_vsSX_xzu6_iIZLsaEwX4';
    const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&gid=0`;

    fetch(url)
        .then(res => res.text())
        .then(text => {
            const jsonStr = text.substring(47, text.length - 2);
            const json = JSON.parse(jsonStr);
            const rows = json.table.rows;
            
            allWishes = []; 

            rows.forEach(row => {
                if (row.c && row.c[1] && row.c[2]) {
                    const time = row.c[0] ? row.c[0].f || row.c[0].v : '';
                    const name = row.c[1].v;
                    const wish = row.c[2].v;

                    if (name !== "Tên người chúc") {
                        allWishes.push({ time, name, wish });
                    }
                }
            });

            allWishes.reverse();

            const container = document.getElementById('wishes-container');
            if (container) {
                container.innerHTML = '';
                displayedCount = 0;
                renderMoreWishes();
            }
        })
        .catch(error => {
            console.error("Lỗi tải dữ liệu từ Sheets:", error);
            const container = document.getElementById('wishes-container');
            if (container) {
                container.innerHTML = '<p>Không thể kết nối đến danh sách lời chúc lúc này.</p>';
            }
        });
}

// Hàm render từng cụm lời chúc
function renderMoreWishes() {
    const container = document.getElementById('wishes-container');
    const loadMoreBtn = document.getElementById('load-more-btn');
    
    if (!container) return;

    const nextBatch = allWishes.slice(displayedCount, displayedCount + wishesPerPage);
    
    nextBatch.forEach(item => {
        const wishElement = document.createElement('div');
        wishElement.className = 'wish-item reveal active'; // Thêm active để không bị đè CSS ẩn
        wishElement.innerHTML = `
            <h4>${item.name}</h4>
            <p class="wish-text">${item.wish}</p>
            <span class="wish-time">${item.time}</span>
        `;
        container.appendChild(wishElement);
    });

    displayedCount += nextBatch.length;

    if (loadMoreBtn) {
        if (displayedCount >= allWishes.length) {
            loadMoreBtn.style.display = 'none'; 
        } else {
            loadMoreBtn.style.display = 'inline-block'; 
        }
    }
}
