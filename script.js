// Filter
const filters = document.querySelectorAll(".filter");
filters.forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector(".filter.active").classList.remove("active");
    btn.classList.add("active");

    const category = btn.dataset.category;
    document.querySelectorAll(".item-card").forEach(card => {
      card.style.display =
        category === "All" || category === card.dataset.category
          ? "block"
          : "none";
    });
  });
});

// Add new donated item
const form = document.getElementById("donation-form");
const itemList = document.getElementById("item-list");
const modal = document.getElementById("success-modal");
const closeBtn = document.querySelector(".close-btn");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = form.itemName.value;
  const category = form.category.value;
  const desc = form.description.value;
  const imageFile = form.itemImage.files[0];

  const reader = new FileReader();

  reader.onload = function (event) {
    const card = document.createElement("div");
    card.className = "item-card fade-in";
    card.dataset.category = category;

    card.innerHTML = `
      <img src="${event.target.result}" alt="Item Image">
      <div class="item-info">
        <h3>${name}</h3>
        <p>${desc}</p>
      </div>
    `;

    itemList.prepend(card);
  };

  reader.readAsDataURL(imageFile);

  modal.style.display = "flex";
  form.reset();
});

// Modal close
closeBtn.addEventListener("click", () => modal.style.display = "none");
window.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});


