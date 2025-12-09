// =======================================================
// 1. 圖片預覽功能 (Image Preview)
// =======================================================

const itemImageInput = document.getElementById('itemImage');
const imagePreviewDiv = document.getElementById('imagePreview');

if (itemImageInput && imagePreviewDiv) {
    // 監聽檔案輸入框的 'change' 事件
    itemImageInput.addEventListener('change', function(event) {
        const file = event.target.files[0]; // 取得使用者選擇的第一個檔案

        if (file) {
            imagePreviewDiv.innerHTML = ''; // 清空舊的預覽
            
            // 檢查檔案類型是否為圖片
            if (!file.type.startsWith('image/')) {
                imagePreviewDiv.innerHTML = '<p class="error-text">Please upload a valid image file.</p>';
                return;
            }

            const reader = new FileReader();
            
            // 當檔案讀取完成後，建立圖片元素
            reader.onload = function(e) {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.alt = "Item Preview";
                img.classList.add('preview-image'); 
                
                imagePreviewDiv.appendChild(img);
            };
            
            // 以 Data URL 格式開始讀取檔案
            reader.readAsDataURL(file);
        } else {
            // 如果使用者取消選擇檔案，清空預覽區
            imagePreviewDiv.innerHTML = '';
        }
    });
}


// =======================================================
// 2. 表單提交與模態視窗控制 (Form & Modal Control)
// =======================================================

const donationForm = document.getElementById('donation-form');
const successModal = document.getElementById('success-modal');
const modalClose = document.getElementById('modalClose');
const modalBack = document.getElementById('modalBack');
const navbar = document.querySelector('.navbar');

if (donationForm && successModal && modalClose && modalBack) {
    
    // 處理表單提交事件
    donationForm.addEventListener('submit', function(event) {
        event.preventDefault(); // 阻止表單預設提交行為 (防止頁面刷新)
        
        // **********************************************
        // 實際應用中，您會在這裡執行 AJAX/Fetch 來發送數據到伺服器
        // const formData = new FormData(donationForm);
        // **********************************************
        
        // 模擬成功後的操作：
        
        // 1. 顯示成功模態視窗
        successModal.style.display = 'flex'; // 使用 flex 確保居中
        
        // 2. 清空表單並移除圖片預覽
        donationForm.reset(); 
        imagePreviewDiv.innerHTML = ''; 
    });

    // 關閉模態視窗 (X 按鈕)
    modalClose.addEventListener('click', () => {
        successModal.style.display = 'none';
    });

    // 關閉模態視窗 (Back to site 按鈕)
    modalBack.addEventListener('click', () => {
        successModal.style.display = 'none';
    });
    
    // 點擊視窗外部關閉模態視窗
    window.addEventListener('click', (event) => {
        if (event.target == successModal) {
            successModal.style.display = 'none';
        }
    });
}

// =======================================================
// 3. 導航欄黏貼效果 (Sticky Navbar)
// =======================================================

if (navbar) {
    const stickyPoint = navbar.offsetTop; // 導航欄距離頂部的原始位置

    window.addEventListener('scroll', () => {
        if (window.scrollY >= stickyPoint) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }
    });
}

// =======================================================
// 4. 滾動時的淡入效果 (Fade-in on Scroll)
// =======================================================

const faders = document.querySelectorAll('.fade-in');

const appearOptions = {
    threshold: 0.1, // 當元素 10% 進入視圖時觸發
    rootMargin: "0px 0px -100px 0px" // 提前觸發 (在元素進入底部 100px 之前)
};

const appearOnScroll = new IntersectionObserver(function(
    entries, 
    appearOnScroll
) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        }
        entry.target.classList.add('visible');
        appearOnScroll.unobserve(entry.target);
    });
}, appearOptions);

faders.forEach(fader => {
    fader.classList.add('invisible'); // 初始設置為隱藏
    appearOnScroll.observe(fader);
});
