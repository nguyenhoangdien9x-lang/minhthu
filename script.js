// === CÁC BIẾN TOÀN CỤC ===
let allWishes = [];
let displayedCount = 0;
const wishesPerPage = 5; 

const galleryData = {
    'grid-tanhon': [],
    'grid-baohy': [],
    'grid-vuquy': []
};
let currentGallery = [];
let currentIndex = 0;

// === CHẠY KHI TRANG WEB VỪA TẢI XONG ===
document.addEventListener('DOMContentLoaded', function() {
    
    const scriptUrlTanHon = 'https://script.google.com/macros/s/AKfycbzjdu7Hq_YnfOUkKtg-Ol8tpON1Iw-zjMciupMlzIIaIs_tCd8fyPgnzMjLgf_AXs8/exec';
    loadImagesFromDrive('grid-tanhon', scriptUrlTanHon);

    const scriptUrlBaoHy = 'https://script.google.com/macros/s/AKfycbzVRKmv8PBQ1z8x2lzhGhafoX-WsZdGYplf-emJ2CimrKjC0Kr-oWm-ijqFfA8Z_KfC/exec';
    loadImagesFromDrive('grid-baohy', scriptUrlBaoHy);

    const scriptUrlVuQuy = 'https://script.google.com/macros/s/AKfycbyfI2BN8GPl4F236Bg1Kz0dUu9oM-VGf20n-LYU8cWkf_CgpU_A1XU8mMjMNHSrkgO6Vw/exec';
    loadImagesFromDrive('grid-vuquy', scriptUrlVuQuy);

    initScrollReveal();
    setupWishForm();
    setupLightbox();

    loadWishes();
    const loadMoreBtn = document.getElementById('load-more-btn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', renderMoreWishes);
    }
});

// ==========================================
// === CÁC HÀM XỬ LÝ HÌNH ẢNH (GALLERY) ===
// ==========================================

// Hàm siêu bóc tách ID ảnh từ bất kỳ loại link Google Drive nào
function extractFileId(url) {
    if (url.includes('/d/')) return url.split('/d/')[1].split('&')[0].split('/')[0];
    if (url.includes('id=')) return url.split('id=')[1].split('&')[0];
    return url; 
}

function loadImagesFromDrive(gridId, scriptUrl) {
    const grid = document.getElementById(gridId);
    if (!grid) return; 

    fetch(scriptUrl)
        .then(response => response.json())
        .then(urls => {
            // Lưu mảng gốc vào bộ nhớ
            galleryData[gridId] = urls; 
            grid.innerHTML = ''; 
            
            const maxDisplay = 20;
            const displayCount = Math.min(urls.length, maxDisplay);
            
            for(let i = 0; i < displayCount; i++) {
                const fileId = extractFileId(urls[i]);
                const imgElement = document.createElement('img');
                
                // 1. LINK NGOÀI LƯỚI: Nét vừa đủ (800px) để load cực nhanh
                imgElement.src = `https://drive.google.com/thumbnail?id=${fileId}&sz=w800`;
                imgElement.className = 'gallery-img reveal';
                imgElement.loading = 'lazy';
                
                imgElement.onclick = () => openLightbox(gridId, i);
                grid.appendChild(imgElement);
            }

            if (urls.length > maxDisplay) {
                const btnContainer = document.createElement('div');
                btnContainer.style.width = "100%";
                btnContainer.style.textAlign = "center";
                btnContainer.style.marginTop = "30px";
                
                const btn = document.createElement('button');
                btn.className = 'btn-load-more btn-gallery-more';
                btn.innerText = `Xem toàn bộ album (${urls.length} ảnh)`;
                btn.onclick = () => openLightbox(gridId, 0);
                
                btnContainer.appendChild(btn);
                grid.insertAdjacentElement('afterend', btnContainer);
            }
            
            initScrollReveal();
        })
        .catch(error => {
            console.error("Lỗi:", error);
            grid.innerHTML = '<p>Không thể tải ảnh. Vui lòng kiểm tra lại kết nối.</p>';
        });
}

function openLightbox(gridId, index) {
    currentGallery = galleryData[gridId];
    currentIndex = index;
    updateLightbox();
    document.getElementById('lightbox').style.display = 'block';
}

function updateLightbox() {
    if (currentGallery.length === 0) return;
    
    const rawUrl = currentGallery[currentIndex];
    const fileId = extractFileId(rawUrl);

    // 2. LINK PHÓNG TO: Độ phân giải cao (2000px) để xem sắc nét
    document.getElementById('lightbox-img').src = `https://drive.google.com/thumbnail?id=${fileId}&sz=w2000`;
    
    // 3. LINK TẢI XUỐNG: Ép tải file chuẩn gốc .jpg về máy
    document.getElementById('lightbox-download').href = `https://drive.google.com/uc?export=download&id=${fileId}`;
}

function showNextImage() {
    if (currentGallery.length === 0) return;
    currentIndex = (currentIndex + 1) % currentGallery.length; 
    updateLightbox();
}

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

    closeBtn.addEventListener("click", () => lightbox.style.display = "none");
    nextBtn.addEventListener("click", (e) => { e.stopPropagation(); showNextImage(); });
    prevBtn.addEventListener("click", (e) => { e.stopPropagation(); showPrevImage(); });

    lightbox.addEventListener("click", function(e) {
        if (e.target === lightbox) { 
            lightbox.style.display = "none";
        }
    });

    document.addEventListener('keydown', function(e) {
        if (lightbox.style.display === "block") {
            if (e.key === "Escape") lightbox.style.display = "none";
            if (e.key === "ArrowRight") showNextImage();
            if (e.key === "ArrowLeft") showPrevImage();
        }
    });
}

// ==========================================
// === CÁC HÀM XỬ LÝ LỜI CHÚC & HIỆU ỨNG ===
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
