// Demo data — in real app this would come from a backend API
const items = [
{ id: 1, name: "Used Textbook: Calculus", category: "Books", desc: "Slight markings on a few pages, overall good condition.", image: "" },
{ id: 2, name: "Rice Cooker (1.8L)", category: "Appliances", desc: "Works perfectly; comes with manual.", image: "" },
{ id: 3, name: "Winter Jacket (M)", category: "Apparel", desc: "Worn twice; barely used.", image: "" },
{ id: 4, name: "Kids Storybook Set", category: "Books", desc: "Colorful and intact; great for ages 3-7.", image: "" },
];

const itemGrid = document.getElementById('item-grid');
const filterBtns = document.querySelectorAll('.filter-btn');
const modal = document.getElementById('detail-modal');
const modalBody = document.getElementById('modal-body');
const modalClose = document.querySelector('.modal-close');

// Render list of items to the grid
function renderItems(category = 'All'){
itemGrid.innerHTML = '';
const list = category === 'All' ? items : items.filter(it => it.category === category);

if(list.length === 0){
itemGrid.innerHTML = `<p class="muted">No items in this category.</p>`;
return;
}

list.forEach(it => {
const card = document.createElement('div');
card.className = 'item-card';
card.innerHTML = `
<h3>${it.name}</h3>
<p>${it.category}</p>
<div class="item-meta">
<span class="badge">View Details</span>
</div>
`;
card.addEventListener('click', () => openDetail(it));
itemGrid.appendChild(card);
});
}

// Filter button events
filterBtns.forEach(btn => {
btn.addEventListener('click', () => {
filterBtns.forEach(b => b.classList.remove('active'));
btn.classList.add('active');
renderItems(btn.dataset.category);
});
});

// Modal control

