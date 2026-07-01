// === CÁC BIẾN TOÀN CỤC ===
let allWishes = [];
let displayedCount = 0;
const wishesPerPage = 5; 

// Biến lưu trữ toàn bộ ảnh cho tính năng Gallery Lightbox
const galleryData = {
    'grid-tanhon': [],
    'grid-baohy': [],
    'grid-vuquy': []
};
let currentGallery = [];
let currentIndex = 0;

// === CHẠY KHI TRANG WEB VỪA TẢI XONG ===
document.addEventListener('DOMContentLoaded', function() {
    
    // 1A. Kích hoạt lấy ảnh Lễ Tân Hôn
    const scriptUrlTanHon = 'https://script.google.com/macros/s/AKfycbzjdu7Hq_YnfOUkKtg-Ol8tpON1Iw-zjMciupMlzIIaIs_tCd8fyPgnzMjLgf_AXs8/exec';
    loadImagesFromDrive('grid-tanhon', scriptUrlTanHon);

    // 1B. Kích hoạt lấy ảnh Tiệc Báo Hỷ
    const scriptUrlBaoHy = 'https://script.google.com/macros/s/AKfycbzVRKmv8PBQ1z8x2lzhGhafoX-WsZdGYplf-emJ2CimrKjC0Kr-oWm-ijqFfA8Z_KfC/exec';
    loadImagesFromDrive('grid-baohy', scriptUrlBaoHy);

    // 1C. Kích hoạt lấy ảnh Lễ Vu Quy
    const scriptUrlVuQuy = 'https://script.google.com/macros/s/AKfycbyfI2BN8GPl4F236Bg1Kz0dUu9oM-VGf20n-LYU8cWkf_CgpU_A1XU8mMjMNHSrkgO6Vw/exec';
    loadImagesFromDrive('grid-vuquy', scriptUrlVuQuy);

    // 2. Kích hoạt hiệu ứng cuộn trang (Reveal) lần đầu
    initScrollReveal();

    // 3. Xử lý Form Gửi Lời Chúc
    setupWishForm();

    // 4. Xử lý sự kiện cho Cửa sổ xem ảnh phóng to (Lightbox)
    setupLightbox();

    // 5. Tự động lấy lời chúc từ Sheets
    loadWishes();
    const loadMoreBtn = document.getElementById('load-more-btn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', renderMoreWishes);
    }
});


// ==========================================
// === CÁC HÀM XỬ LÝ HÌNH ẢNH (GALLERY) ===
// ==========================================

function loadImagesFromDrive(gridId, scriptUrl) {
    const grid = document.getElementById(gridId);
    if (!grid) return; 

    fetch(scriptUrl)
        .then(response => response.json())
        .then(urls => {
            // Lưu toàn bộ link ảnh vào bộ nhớ ảo
            galleryData[gridId] = urls; 
            grid.innerHTML = ''; 
            
            // CHỈ HIỂN THỊ TỐI ĐA 20 ẢNH ĐỂ WEB LOAD NHANH
            const maxDisplay = 20;
            const displayCount = Math.min(urls.length, maxDisplay);
            
            for(let i = 0; i < displayCount; i++) {
                const imgElement = document.createElement('img');
                imgElement.src = urls[i];
                imgElement.className = 'gallery-img reveal';
                imgElement.loading = 'lazy';
                
                // Bấm vào ảnh nào thì mở Lightbox từ ảnh đó
                imgElement.onclick = () => openLightbox(gridId, i);
                grid.appendChild(imgElement);
            }

            // Nếu số ảnh nhiều hơn 20, tạo nút "Xem toàn bộ ảnh"
            if (urls.length > maxDisplay) {
                const btnContainer = document.createElement('div');
                btnContainer.style.width = "100%";
                btnContainer.style.textAlign = "center";
                btnContainer.style.marginTop = "30px";
                
                const btn = document.createElement('button');
                btn.className = 'btn-load-more btn-gallery-more';
                btn.innerText = `Xem toàn bộ album (${urls.length} ảnh)`;
                // Bấm nút thì mở Lightbox từ tấm ảnh đầu tiên (index 0)
                btn.onclick = () => openLightbox(gridId, 0);
                
                btnContainer.appendChild(btn);
                // Đặt nút ở dưới cùng của khu vực ảnh
                grid.insertAdjacentElement('afterend', btnContainer);
            }
            
            initScrollReveal();
        })
        .catch(error => {
            console.error("Lỗi:", error);
            grid.innerHTML = '<p>Không thể tải ảnh. Vui lòng kiểm tra lại kết nối.</p>';
        });
}

// Mở cửa sổ xem ảnh
function openLightbox(gridId, index) {
    currentGallery = galleryData[gridId];
    currentIndex = index;
    updateLightbox();
    document.getElementById('lightbox').style.display = 'block';
}

// Cập nhật ảnh và link tải xuống trong Lightbox
function updateLightbox() {
    if (currentGallery.length === 0) return;
    const url = currentGallery[currentIndex];
    document.getElementById('lightbox-img').src = url;
    document.getElementById('lightbox-download').href = url;
}

// Chuyển ảnh tiếp theo
function showNextImage() {
    if (currentGallery.length === 0) return;
    currentIndex = (currentIndex + 1) % currentGallery.length; // Quay vòng lại từ đầu nếu hết
    updateLightbox();
}

// Quay lại ảnh trước
function showPrevImage() {
    if (currentGallery.length === 0) return;
    currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
    updateLightbox();
}

function setupLightbox() {
    const lightbox = document.getElementById("lightbox");
    const closeBtn = document.querySelector(".close-btn");
    const nextBtn = document.getElementById("next-btn");
    const prevBtn = document.getElementById("prev-btn");

    if (!lightbox) return;

    // Bấm X để đóng
    closeBtn.addEventListener("click", () => lightbox.style.display = "none");

    // Bấm nút trái phải
    nextBtn.addEventListener("click", (e) => { e.stopPropagation(); showNextImage(); });
    prevBtn.addEventListener("click", (e) => { e.stopPropagation(); showPrevImage(); });

    // Bấm ra ngoài vùng ảnh đen để đóng
    lightbox.addEventListener("click", function(e) {
        if (e.target === lightbox) { 
            lightbox.style.display = "none";
        }
    });

    // Dùng bàn phím để chuyển ảnh
    document.addEventListener('keydown', function(e) {
        if (lightbox.style.display === "block") {
            if (e.key === "Escape") lightbox.style.display = "none";
            if (e.key === "ArrowRight") showNextImage();
            if (e.key === "ArrowLeft") showPrevImage();
        }
    });
}


// ==========================================
// === CÁC HÀM XỬ LÝ KHÁC ===
// ==========================================

function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

    reveals.forEach(el => observer.observe(el));
}

function setupWishForm() {
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
                    submitBtn.disabled = false;
                    submitBtn.innerText = 'Gửi Lời Chúc';
                });
        });
    }
}

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

function renderMoreWishes() {
    const container = document.getElementById('wishes-container');
    const loadMoreBtn = document.getElementById('load-more-btn');
    
    if (!container) return;

    const nextBatch = allWishes.slice(displayedCount, displayedCount + wishesPerPage);
    
    nextBatch.forEach(item => {
        const wishElement = document.createElement('div');
        wishElement.className = 'wish-item reveal active'; 
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
