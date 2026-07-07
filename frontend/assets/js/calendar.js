let currentDate = new Date();

export function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Update header
    const monthYear = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
    const monthEl = document.getElementById('currentMonth');
    if (monthEl) monthEl.textContent = monthYear;

    // Clear grid
    const grid = document.getElementById('calendarGrid');
    if (!grid) return;
    grid.innerHTML = '';

    // Get first day of month and number of days
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'calendar-day empty';
        grid.appendChild(emptyCell);
    }

    // Add days of month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayCell = document.createElement('div');
        dayCell.className = 'calendar-day';

        // Highlight today
        const today = new Date();
        if (day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear()) {
            dayCell.classList.add('today');
        }

        dayCell.textContent = day;
        dayCell.style.cursor = 'pointer';
        dayCell.onclick = () => selectDay(day, month, year, dayCell);

        grid.appendChild(dayCell);
    }
}

export function previousMonth() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
}

export function nextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
}

function selectDay(day, month, year, element) {
    // Remove previous selection
    document.querySelectorAll('.calendar-day.selected').forEach(el => {
        el.classList.remove('selected');
    });

    // Add selection to clicked day
    element.classList.add('selected');
    console.log(`Selected: ${day}/${month + 1}/${year}`);
}

// Initialize calendar and event listeners
document.addEventListener('DOMContentLoaded', () => {
    renderCalendar();

    const prevBtn = document.querySelector('.calendar-nav-btn:first-of-type'); // Find prev button
    const nextBtn = document.querySelectorAll('.calendar-nav-btn')[1]; // Find next button

    if (prevBtn) prevBtn.addEventListener('click', previousMonth);
    if (nextBtn) nextBtn.addEventListener('click', nextMonth);
});
