// === CHẠY KHI TRANG WEB VỪA TẢI XONG ===
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Kích hoạt lấy ảnh từ Google Drive cho Lễ Tân Hôn
    const scriptUrlTanHon = 'https://script.google.com/macros/s/AKfycbzjdu7Hq_YnfOUkKtg-Ol8tpON1Iw-zjMciupMlzIIaIs_tCd8fyPgnzMjLgf_AXs8/exec';
    loadImagesFromDrive('grid-tanhon', scriptUrlTanHon);

    // BẠN THÊM 2 DÒNG NÀY CHO TIỆC BÁO HỶ NHÉ:
    // Thay đường link bằng Web App URL của thư mục Báo Hỷ vừa tạo ở Bước 1
    const scriptUrlBaoHy = 'https://script.google.com/macros/s/AKfycbzVRKmv8PBQ1z8x2lzhGhafoX-WsZdGYplf-emJ2CimrKjC0Kr-oWm-ijqFfA8Z_KfC/exec';
    loadImagesFromDrive('grid-baohy', scriptUrlBaoHy);
    // 1C. Kích hoạt lấy ảnh từ Google Drive cho Lễ Vu Quy
    // Thay đường link bằng Web App URL của thư mục Vu Quy
    const scriptUrlVuQuy = 'https://script.google.com/macros/s/AKfycbyfI2BN8GPl4F236Bg1Kz0dUu9oM-VGf20n-LYU8cWkf_CgpU_A1XU8mMjMNHSrkgO6Vw/exec';
    loadImagesFromDrive('grid-vuquy', scriptUrlVuQuy);

    // 2. Kích hoạt hiệu ứng cuộn trang (Reveal) lần đầu
    initScrollReveal();

    // ... (Các phần code phía dưới giữ nguyên) ...
