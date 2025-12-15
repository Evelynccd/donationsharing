document.addEventListener('DOMContentLoaded', () => {
    // ------------------------------------------
    // 1. Donation Form Logic
    // ------------------------------------------
    const amountButtons = document.querySelectorAll('.amount-btn');
    const customAmountInput = document.getElementById('custom-amount');
    const displayAmount = document.getElementById('display-amount');
    const donationForm = document.getElementById('donation-form');

    let selectedAmount = 0;

    const formatCurrency = (amount) => {
        return `$${amount.toLocaleString('en-US')}`;
    }

    // Handle preset buttons
    amountButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            amountButtons.forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            selectedAmount = parseInt(e.target.dataset.amount, 10);
            customAmountInput.value = '';
            updateDisplay();
        });
    });

    // Handle custom input
    customAmountInput.addEventListener('input', (e) => {
        amountButtons.forEach(btn => btn.classList.remove('active'));
        selectedAmount = parseInt(e.target.value, 10) || 0; 
        updateDisplay();
    });

    function updateDisplay() {
        displayAmount.textContent = formatCurrency(selectedAmount);
    }

    // Handle form submission
    donationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (selectedAmount < 10) {
            alert('Please select or enter a valid donation amount (minimum $10).');
            return;
        }

        console.log(`Donating: ${formatCurrency(selectedAmount)}`);
        alert(`Thank you for your generous donation of ${formatCurrency(selectedAmount)}! (Demo mode: This would redirect to a payment processor)`);

        // Reset
        donationForm.reset();
        selectedAmount = 0;
        amountButtons.forEach(btn => btn.classList.remove('active'));
        updateDisplay();
    });

    // ------------------------------------------
    // 2. Counter Animation for Hero Section
    // ------------------------------------------
    const counters = document.querySelectorAll('.count-number');
    const speed = 200; // The lower the number, the faster the count

    const animateCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;

                // Calculate increment value (makes larger numbers count faster)
                const inc = target / speed;

                if (count < target) {
                    // Round up to ensure we reach the target
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 1);
                } else {
                    // Final value cleanup and formatting
                    if (target >= 1000) {
                        counter.innerText = (target / 1000).toFixed(1) + 'K';
                    } else {
                         counter.innerText = target;
                    }
                }
            };
            updateCount();
        });
    };

    // Use Intersection Observer to trigger the animation when the section is visible
    const heroSection = document.getElementById('hero');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(heroSection); // Stop observing once animated
            }
        });
    }, { threshold: 0.5 }); // Trigger when 50% of the section is visible

    observer.observe(heroSection);

    // Initial load display
    updateDisplay();
});
