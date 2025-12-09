// Filter items
const filters = document.querySelectorAll('.filter');
const items = document.querySelectorAll('.item-card');

filters.forEach(filter=>{
  filter.addEventListener('click',()=>{
    document.querySelector('.filter.active').classList.remove('active');
    filter.classList.add('active');
    const category = filter.dataset.category;
    items.forEach(item=>{
      item.style.display=(category==='All'||item.dataset.category===category)?'block':'none';
    });
  });
});

// Fade-in on scroll
const faders = document.querySelectorAll('.fade-in');
window.addEventListener('scroll', ()=>{
  faders.forEach(fader=>{
    const top=fader.getBoundingClientRect().top;
    if(top < window.innerHeight*0.85) fader.classList.add('visible');
  });
});

// Donation form modal
const form = document.getElementById('donation-form');
const modal = document.getElementById('success-modal');
const closeBtn = document.querySelector('.close-btn');

form.addEventListener('submit', function(e){
  e.preventDefault();
  modal.style.display = 'flex';
});

closeBtn.addEventListener('click', ()=>{ modal.style.display = 'none'; });
window.closeModal = function(){ modal.style.display = 'none'; }
window.addEventListener('click', (e)=>{ if(e.target==modal) modal.style.display='none'; });

