// --------- 篩選功能 ----------
const filters = document.querySelectorAll('.filter');
const items = document.querySelectorAll('.item-card');

filters.forEach(filter => {
    filter.addEventListener('click', () => {
        document.querySelector('.filter.active').classList.remove('active');
        filter.classList.add('active');
        const category = filter.dataset.category;
        items.forEach(item => {
            if (category === 'All' || item.dataset.category === category) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// --------- 表單提交提示 ----------
const form = document.getElementById('donation-form');
const successMessage = document.getElementById('success-message');

form.addEventListener('submit', (e) => {
    e.preventDefault(); // 阻止跳轉
    successMessage.style.display = 'block';
    form.reset();
    setTimeout(() => successMessage.style.display = 'none', 3000);
});
