export function speedcal() {
    const distanceEl = document.getElementById("distance");
    const timeEl = document.getElementById("time");
    const speedEl = document.getElementById("speed");

    if (!distanceEl || !timeEl || !speedEl) return;

    const distance = distanceEl.value;
    const time = timeEl.value;

    if (distance && time) {
        const speed = time / distance;
        speedEl.innerHTML = speed.toFixed(2) + " km/h";
    }
}

export function toggleMenu() {
    const navbar = document.getElementById("navbar");
    const content = document.querySelector(".content-wrapper");

    if (!navbar) return;

    if (window.innerWidth > 768) {
        navbar.classList.toggle("hidden");
        if (content) {
            content.classList.toggle("full-width");
        }
    } else {
        navbar.classList.toggle("active");
    }
}

// Initialize event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Menu toggle
    const menuBtn = document.getElementById('toggleBtn'); // Corrected ID from index.html
    if (menuBtn) {
        menuBtn.addEventListener('click', toggleMenu);
    }

    // Speed calculator
    const distanceInput = document.getElementById('distance');
    const timeInput = document.getElementById('time');
    if (distanceInput) {
        distanceInput.addEventListener('input', speedcal);
    }
    if (timeInput) {
        timeInput.addEventListener('input', speedcal);
    }
});
