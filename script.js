// === CHẠY KHI TRANG WEB VỪA TẢI XONG ===
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Kích hoạt lấy ảnh từ Google Drive cho Lễ Tân Hôn
    const scriptUrlTanHon = 'https://script.google.com/macros/s/AKfycbzjdu7Hq_YnfOUkKtg-Ol8tpON1Iw-zjMciupMlzIIaIs_tCd8fyPgnzMjLgf_AXs8/exec';
    loadImagesFromDrive('grid-tanhon', scriptUrlTanHon);

    // BẠN THÊM 2 DÒNG NÀY CHO TIỆC BÁO HỶ NHÉ:
    // Thay đường link bằng Web App URL của thư mục Báo Hỷ vừa tạo ở Bước 1
    const scriptUrlBaoHy = 'DÁN_LINK_APPS_SCRIPT_CỦA_BÁO_HỶ_VÀO_ĐÂY';
    loadImagesFromDrive('grid-baohy', scriptUrlBaoHy);

    // 2. Kích hoạt hiệu ứng cuộn trang (Reveal) lần đầu
    initScrollReveal();

    // ... (Các phần code phía dưới giữ nguyên) ...
