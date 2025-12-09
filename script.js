/* -------------- Helper & Storage -------------- */
const STORAGE_KEY = 'donationItems_v1';

function saveItems(items){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}
function loadItems(){
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}
function uid(){ return 'i'+Date.now().toString(36)+Math.floor(Math.random()*900).toString(36); }

/* -------------- DOM refs -------------- */
const filters = document.querySelectorAll('.filter');
const itemList = document.getElementById('item-list');
const donationForm = document.getElementById('donation-form');
const itemImageInput = document.getElementById('itemImage');
const imagePreviewBox = document.getElementById('imagePreview');
const modal = document.getElementById('success-modal');
const modalClose = document.getElementById('modalClose') || document.getElementById('modalClose');
const searchInput = document.getElementById('searchInput');

/* -------------- Render Single Card -------------- */
function renderCard(item){
  const wrapper = document.createElement('div');
  wrapper.className = 'item-card fade-in';
  wrapper.setAttribute('data-category', item.category);
  wrapper.setAttribute('data-id', item.id);

  const tagsHtml = (item.tags || []).map(t=>`<span class="tag">${escapeHtml(t.trim())}</span>`).join(' ');

  wrapper.innerHTML = `
    <div class="item-card-inner">
      <div class="item-card-front">
        <img src="${item.image}" alt="${escapeHtml(item.name)}">
        <div class="item-info">
          <h3>${escapeHtml(item.name)} ${item.featured?'<span style="color:#bf6b6b;font-size:.9rem"> · ★</span>':''}</h3>
          <p>${escapeHtml(item.description).slice(0,120)}${item.description.length>120?'...':''}</p>
          <div class="item-card-meta">
            <small>${new Date(item.createdAt).toLocaleString()}</small>
          </div>
        </div>
      </div>
      <div class="item-card-back">
        <h3>${escapeHtml(item.name)}</h3>
        <small>Category: ${escapeHtml(item.category)} · Condition: ${escapeHtml(item.condition || 'Good')}</small>
        <p style="margin-top:12px">${escapeHtml(item.description)}</p>
        <div style="margin-top:10px">${tagsHtml}</div>
        <div class="card-actions" style="margin-top:14px">
          <button class="btn outline claim-btn">${item.claimed? 'Claimed' : 'Mark Claimed'}</button>
          <button class="btn primary delete-btn">Delete</button>
        </div>
      </div>
    </div>
  `;

  // actions: claim and delete
  wrapper.querySelector('.delete-btn').addEventListener('click', ()=>{
    deleteItem(item.id);
  });
  const claimBtn = wrapper.querySelector('.claim-btn');
  claimBtn.addEventListener('click', ()=>{
    toggleClaim(item.id);
  });

  return wrapper;
}

/* -------------- Escape HTML helper -------------- */
function escapeHtml(str){
  if(!str) return '';
  return String(str).replace(/[&<>"']/g, function(m){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m];});
}

/* -------------- Render list (with filters/search) -------------- */
function renderList(filterCategory = 'All', searchTerm = ''){
  const items = loadItems();
  itemList.innerHTML = '';
  const term = (searchTerm||'').trim().toLowerCase();
  items.sort((a,b)=> b.createdAt - a.createdAt);
  items.forEach(item=>{
    if(filterCategory !== 'All' && item.category !== filterCategory) return;
    if(term){
      const hay = (item.name + ' ' + item.description + ' ' + (item.tags||[]).join(' ')).toLowerCase();
      if(!hay.includes(term)) return;
    }
    const el = renderCard(item);
    itemList.appendChild(el);
    // fade-in visible trigger
    setTimeout(()=> el.classList.add('visible'), 40);
  });
}

/* -------------- CRUD operations -------------- */
function addItem(item){
  const items = loadItems();
  items.push(item);
  saveItems(items);
  renderList(document.querySelector('.filter.active').dataset.category || 'All', searchInput.value);
}
function deleteItem(id){
  let items = loadItems();
  items = items.filter(i=> i.id !== id);
  saveItems(items);
  renderList(document.querySelector('.filter.active').dataset.category || 'All', searchInput.value);
}
function toggleClaim(id){
  const items = loadItems();
  const idx = items.findIndex(i=> i.id===id);
  if(idx===-1) return;
  items[idx].claimed = !items[idx].claimed;
  saveItems(items);
  renderList(document.querySelector('.filter.active').dataset.category || 'All', searchInput.value);
}

/* -------------- Filters UI -------------- */
filters.forEach(btn=>{
  btn.addEventListener('click', ()=>{
    document.querySelector('.filter.active').classList.remove('active');
    btn.classList.add('active');
    renderList(btn.dataset.category, searchInput.value);
  });
});

/* -------------- Search -------------- */
searchInput && searchInput.addEventListener('input', (e)=>{
  const cat = document.querySelector('.filter.active').dataset.category || 'All';
  renderList(cat, e.target.value);
});

/* -------------- Image preview (client-side) -------------- */
itemImageInput.addEventListener('change', (e)=>{
  const file = e.target.files[0];
  imagePreviewBox.innerHTML = '';
  if(!file) return;
  const reader = new FileReader();
  reader.onload = function(ev){
    const img = document.createElement('img');
    img.src = ev.target.result;
    img.alt = 'Preview';
    img.style.width = '160px';
    img.style.height = '110px';
    img.style.objectFit = 'cover';
    img.style.borderRadius = '8px';
    imagePreviewBox.appendChild(img);
  };
  reader.readAsDataURL(file);
});

/* -------------- Form submit: read image, create item, store, modal -------------- */
donationForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  const form = e.target;
  const name = form.itemName.value.trim();
  const category = form.category.value || 'Others';
  const condition = form.condition.value || 'Good';
  const description = form.description.value.trim();
  const tags = (form.tags.value || '').split(',').map(t=>t.trim()).filter(Boolean);
  const featured = form.featured.value === 'yes';
  const file = itemImageInput.files[0];

  if(!name || !description || !file){
    alert('Please fill required fields and attach an image.');
    return;
  }

  const reader = new FileReader();
  reader.onload = function(ev){
    const base64 = ev.target.result;
    const newItem = {
      id: uid(),
      name, category, condition, description,
      tags, featured, claimed: false,
      image: base64,
      createdAt: Date.now()
    };
    addItem(newItem);
    // show modal
    showModal();
    form.reset();
    imagePreviewBox.innerHTML = '';
  };
  reader.readAsDataURL(file);
});

/* -------------- Modal control -------------- */
function showModal(){ modal.style.display = 'flex'; }
function hideModal(){ modal.style.display = 'none'; }
modal.addEventListener('click', (e)=> { if(e.target === modal) hideModal(); });
document.addEventListener('click', (e)=>{
  const close = e.target.closest('.modal-close');
  if(close) hideModal();
});
const modalBack = document.getElementById('modalBack');
if(modalBack) modalBack.addEventListener('click', hideModal);

/* -------------- Scroll fade-in trigger -------------- */
function handleFadeIn(){
  document.querySelectorAll('.fade-in').forEach(el=>{
    const top = el.getBoundingClientRect().top;
    if(top < window.innerHeight * 0.85) el.classList.add('visible');
  });
}
window.addEventListener('scroll', handleFadeIn);
window.addEventListener('load', ()=> {
  // preload demo items if none exist (optional demo)
  if(loadItems().length === 0){
    const demo = [
      { id: uid(), name:'The Great Gatsby', category:'Books', condition:'Like New', description:'Classic novel by F. Scott Fitzgerald', tags:['classic','book'], featured:false, claimed:false, image: demoPlaceholder('book'), createdAt: Date.now()-1000*60*60*24 },
      { id: uid(), name:'Blender', category:'Appliances', condition:'Lightly used', description:'500W kitchen blender in good condition', tags:['kitchen','appliance'], featured:true, claimed:false, image: demoPlaceholder('appliance'), createdAt: Date.now()-1000*60*60*12 }
    ];
    saveItems(demo);
  }
  renderList('All','');
  handleFadeIn();
});

/* -------------- Demo placeholders (small base64 SVG) -------------- */
function demoPlaceholder(kind){
  if(kind==='book'){
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='500'><rect width='100%' height='100%' fill='#e9e5e1'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='#b3a69f' font-size='40'>Book</text></svg>`;
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
  }
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='500'><rect width='100%' height='100%' fill='#e9e5e1'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='#8d8a83' font-size='40'>Item</text></svg>`;
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

