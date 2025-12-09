const items = [
{ name: "JavaScript Book", category: "Books", desc: "Like new" },
{ name: "Rice Cooker", category: "Appliances", desc: "Works well" },
{ name: "Winter Jacket", category: "Apparel", desc: "Very warm" }
];

function renderItems(filter = "All") {
const list = document.getElementById("item-list");
list.innerHTML = "";
items
.filter(i => filter === "All" || i.category === filter)
.forEach(i => {
const card = document.createElement("div");
card.className = "card";
card.innerHTML = `<h3>${i.name}</h3><p>${i.desc}</p><span>${i.category}</span>`;
list.appendChild(card);
});
}

renderItems();

const filterBtns = document.querySelectorAll(".filter");
filterBtns.forEach(btn => {
btn.add
