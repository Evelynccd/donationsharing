const items = [
    { name: "Used Textbook", category: "Books", desc: "Good condition, no writing." },
    { name: "Rice Cooker", category: "Appliances", desc: "Works perfectly." },
    { name: "Winter Jacket", category: "Apparel", desc: "Worn once, very warm." },
];

const itemList = document.getElementById("item-list");
const buttons = document.querySelectorAll(".filter-btn");

function displayItems(category) {
    itemList.innerHTML = "";

    const filtered = category === "All"
        ? items
        : items.filter(i => i.category === category);

    filtered.forEach(item => {
        const card = document.createElement("div");
        card.className = "item-card";
        card.innerHTML = `
            <h3>${item.name}</h3>
            <p>${item.category}</p>
        `;
        card.onclick = () => openModal(item);
        itemList.appendChild(card);
    });
}

buttons.forEach(btn => {
    btn.onclick = () => {
        buttons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        displayItems(btn.dataset.category);
    };
});

displayItems("All");

const modal = document.getElementById("item-modal");
const modalContent = document.getElementById("modal-details-content");
document.querySelector(".close-btn").onclick = () => modal.style.display = "none";

function openModal(item) {
    modalContent.innerHTML = `
        <h2>${item.name}</h2>
        <p><strong>Category:</strong> ${item.category}</p>
        <p>${item.desc}</p>
    `;
    modal.style.display = "flex";
}
