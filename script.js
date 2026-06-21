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