export function speedcal() {
    const distanceEl = document.getElementById("distance");
    const timeEl = document.getElementById("time");
    const speedEl = document.getElementById("speed");

    if (!distanceEl || !timeEl || !speedEl) return;

    const distance = parseFloat(distanceEl.value);
    const timeStr = timeEl.value;

    if (distance && timeStr) {
        // Parse time (HH:MM:SS format)
        const timeParts = timeStr.split(':');
        let hours = parseFloat(timeParts[0]) || 0;
        let minutes = parseFloat(timeParts[1]) || 0;
        let seconds = parseFloat(timeParts[2]) || 0;

        // Convert to hours
        const timeInHours = hours + (minutes / 60) + (seconds / 3600);

        if (timeInHours > 0) {
            const speed = distance / timeInHours;
            speedEl.textContent = speed.toFixed(2) + " km/h";
            return;
        }
    }

    speedEl.textContent = "--";
}

export function toggleMenu() {
    const navbar = document.getElementById("navbar");
    const content = document.querySelector(".content-wrapper");

    if (!navbar) return;

    navbar.classList.toggle("-translate-x-full");
    if (content && window.innerWidth >= 1024) {
        content.classList.toggle("lg:ml-[260px]");
        content.classList.toggle("lg:ml-0");
    }
}

// Enhanced initialization with accessibility and interaction improvements
document.addEventListener('DOMContentLoaded', () => {
    // Menu toggle
    const menuBtn = document.getElementById('toggleBtn');
    if (menuBtn) {
        menuBtn.addEventListener('click', toggleMenu);

        // Add keyboard accessibility
        menuBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleMenu();
            }
        });
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

    // Form enhancements
    enhanceFormInputs();

    // Focus management for modals/dialogs
    setupFocusTrap();

    // Add smooth scroll behavior for anchor links
    setupSmoothScrolling();

    // Respect reduced motion preference
    respectReducedMotion();

    // Add lazy loading for images
    lazyLoadImages();
});

// Enhanced form inputs with better validation and feedback
function enhanceFormInputs() {
    // Add input masks for phone numbers, dates, etc.
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 0) {
                value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
            }
            e.target.value = value;
        });
    });

    // Add real-time validation for password strength
    const passwordInputs = document.querySelectorAll('input[type="password"]');
    passwordInputs.forEach(input => {
        const strengthMeter = input.parentElement.querySelector('.password-strength-bar');
        const strengthText = input.parentElement.querySelector('#strengthText');
        const strengthLabel = input.parentElement.querySelector('#strengthLabel');

        if (strengthMeter && strengthText && strengthLabel) {
            input.addEventListener('input', () => {
                const strength = calculatePasswordStrength(input.value);
                updatePasswordStrength(strengthMeter, strengthText, strengthLabel, strength);
            });
        }
    });
}

// Password strength calculation
function calculatePasswordStrength(password) {
    let score = 0;

    // Length
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;

    // Character variety
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    // Common patterns (simplified)
    if (password.length >= 8) {
        const commonPatterns = ['12345678', 'password', 'qwerty', 'abc123'];
        const isCommon = commonPatterns.some(p => password.toLowerCase().includes(p));
        if (!isCommon) score++;
    }

    return Math.min(score, 6); // Max score of 6
}

// Update password strength UI
function updatePasswordStrength(bar, text, label, score) {
    const strengthLevels = [
        { label: 'Very Weak', color: '#ef4444' },
        { label: 'Weak', color: '#f97316' },
        { label: 'Fair', color: '#eab308' },
        { label: 'Good', color: '#84cc16' },
        { label: 'Strong', color: '#22c55e' },
        { label: 'Very Strong', color: '#10b981' }
    ];

    const level = Math.floor(score / 2); // 0-3 index for 6-point scale
    const { label: levelLabel, color } = strengthLevels[level] || strengthLevels[0];

    bar.style.width = `${(score / 6) * 100}%`;
    bar.style.backgroundColor = color;
    text.textContent = `Password strength: ${levelLabel}`;
    label.textContent = levelLabel;
}

// Focus trap for modals and dialogs
function setupFocusTrap() {
    // This would be implemented for actual modals/dialogs
    // For now, we'll just ensure focusable elements are accessible
    const focusableElements = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex]:not([tabindex="-1"]), [contenteditable]';

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            // Handle circular tab navigation in modals when implemented
        }
    });
}

// Smooth scrolling for anchor links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Respect reduced motion preference
function respectReducedMotion() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        // Disable animations and transitions
        document.documentElement.style.setProperty('--transition', 'none');
        document.documentElement.style.setProperty('--transition-fast', 'none');

        // Add a class to allow CSS-based overrides
        document.documentElement.classList.add('reduced-motion');
    }
}

// Lazy load images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[loading="lazy"], img[data-src]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        images.forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
            }
        });
    }
}

// Show loading states for buttons during async operations
function setButtonLoading(button, isLoading) {
    if (isLoading) {
        button.disabled = true;
        button.innerHTML = '<span class="spinner"></span> Loading...';
    } else {
        button.disabled = false;
        button.textContent = button.dataset.originalText || button.textContent;
    }
}

// Initialize tooltips for elements with title attribute
function initTooltips() {
    const elementsWithTitle = document.querySelectorAll('[title]:not(.tooltip-initialized)');
    elementsWithTitle.forEach(el => {
        el.classList.add('tooltip-initialized');
        // Tooltip implementation would go here
        // For simplicity, we'll rely on native tooltips for now
    });
}

// Call tooltip initialization
initTooltips();

// Announce dynamic content changes for screen readers
function announce(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('class', 'sr-only');
    announcement.textContent = message;
    document.body.appendChild(announcement);

    // Remove after a short delay to prevent buildup
    setTimeout(() => {
        announcement.remove();
    }, 3000);
}
