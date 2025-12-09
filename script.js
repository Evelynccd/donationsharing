// Filter items
const filters = document.querySelectorAll('.filter');
const itemsContainer = document.getElementById('item-list');

filters.forEach(filter=>{
  filter.addEventListener('click',()=>{
    document.querySelector('.filter.active').classList.remove('active');
    filter.classList.add('active');
    const category = filter.dataset.category;
    const allItems = document.querySelectorAll('.item-card');
    allItems.forEach(item=>{
      item.style.display=(category==='All'||item.dataset.category===category)?'block':'none';
    });
  });
});

// Fade-in on scroll
function fadeInScroll() {
  const faders = document.querySelectorAll('.fade-in');
  faders.forEach(fader=>{
    const top = fader.getBoundingClientRect().top;
    if(top < window.innerHeight*0.85) fader.classList.add('visible');
  });
}
window.addEventListener('scroll', fadeInScroll);
window.addEventListener('load', fadeInScroll);

// Donation form modal & add card
const form = document.getElementById('donation-form');
const modal = document.getElementById('success-modal');
const closeBtn = document.querySelector('.close-btn');

form.addEventListener('submit', function(e){
  e.preventDefault();

  // 1. 取得表單資料
  const itemName = form.itemName.value;
  const category = form.category.value;
  const description = form.description.value;

  // 2. 生成新的物品卡片 HTML
  const card = document.createElement('div');
  card.classList.add('item-card', 'fade-in');
  card.setAttribute('data-category', category);
  card.innerHTML = `
    <div class="item-card-inner">
      <div class="item-card-front">
        <h3>${itemName}</h3>
        <p>${category}</p>
      </div>
      <div class="item-card-back">
        <p>${description}</p>
      </div>
    </div>
  `;

  // 3. 插入到物品列表
  itemsContainer.prepend(card);

  // 4. 觸發 fade-in 效果
  setTimeout(()=>{ card.classList.add('visible'); }, 50);

  // 5. 清空表單
  form.reset();

  // 6. 顯示成功 modal
  modal.style.display = 'flex';
});

// Modal 關閉
closeBtn.addEventListener('click', ()=>{ modal.style.display = 'none'; });
window.closeModal = function(){ modal.style.display = 'none'; }
window.addEventListener('click', (e)=>{ if(e.target==modal) modal.style.display='none'; });


