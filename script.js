// script.js

document.addEventListener('DOMContentLoaded', () => {

    // ----------------------------------------------------
    // 1. Initial Data and DOM Elements (保持不變)
    // ----------------------------------------------------

    let donatedItems = [
        // 保持您的初始物品數據...
        { name: "Electronic Calculator", category: "Appliances", description: "90% new, fully functional, suitable for students. Donor: Ms. Chen", status: "Available", contact: "Internal" },
        { name: "Complete Fairytale Book Set", category: "Books", description: "Hardcover, well-preserved, suitable for children aged 3-6. Donor: Mr. Wang", status: "Available", contact: "Internal" },
        { name: "Lightweight Down Jacket", category: "Apparel", description: "Size L, Black, cleaned, no damage. Donor: Ms. Lin", status: "Available", contact: "Internal" },
        { name: "Academic Thesis Guide", category: "Books", description: "Latest 2023 edition, no highlights. Donor: Ms. Chen", status: "Available", contact: "Internal" }
    ];

    const itemList = document.getElementById('item-list');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const modal = document.getElementById('item-modal');
    const closeBtn = document.querySelector('.close-btn');
    const modalDetailsContent = document.getElementById('modal-details-content');


    // ----------------------------------------------------
    // 2. 渲染和過濾邏輯 (保持不變)
    // ----------------------------------------------------

    function renderItems(items) {
        // ... (renderItems 函數邏輯保持不變)
        itemList.innerHTML = '';
        items.slice().reverse().forEach(item => { 
            const itemCard = document.createElement('div');
            itemCard.className = 'item-card';
            itemCard.setAttribute('data-category', item.category);
            
            const statusClass = item.status.toLowerCase().replace(/\s/g, '-');
            
            itemCard.innerHTML = `
                <div class="card-content">
                    <h3>${item.name}</h3>
                    <p class="category-tag">Category: ${item.category}</p>
                    <p>Status: <span class="status ${statusClass}">${item.status}</span></p>
                    <button class="details-btn">View Details</button>
                </div>
            `;
            
            itemCard.querySelector('.details-btn').addEventListener('click', () => {
                showModal(item);
            });
            itemList.appendChild(itemCard);
        });
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            let filteredItems = (category === 'All') 
                ? donatedItems 
                : donatedItems.filter(item => item.category === category);
            
            renderItems(filteredItems);
        });
    });


    // ----------------------------------------------------
    // 3. 表單提交邏輯 (!!! 刪除或註釋掉此部分 !!!)
    // ----------------------------------------------------

    /* const donationForm = document.getElementById('donation-form');
    donationForm.addEventListener('submit', async function(e) {
        // 這段程式碼已被刪除，現在表單將直接使用 HTML 的 action 和 method 提交
    });
    */

    // ----------------------------------------------------
    // 4. Modal 彈出視窗邏輯 (保持不變)
    // ----------------------------------------------------

    function showModal(item) {
        // ... (showModal 函數邏輯保持不變)
        modalDetailsContent.innerHTML = `
            <h2>${item.name}</h2>
            <p><strong>Category:</strong> ${item.category}</p>
            <p><strong>Status:</strong> <span class="status ${item.status.toLowerCase().replace(/\s/g, '-')}">${item.status}</span></p>
            <hr>
            <h3>Condition and Details:</h3>
            <p>${item.description}</p>
            <hr>
            <div class="note-box">
                <p><strong>⚠️ Contact Information:</strong></p>
                <p>The donor's contact information is only used for handover coordination and will not be publicly displayed.</p>
            </div>
        `;
        modal.style.display = 'block';
    }

    closeBtn.onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    }


    // ----------------------------------------------------
    // 5. Initialize Page (保持不變)
    // ----------------------------------------------------

    renderItems(donatedItems);
});