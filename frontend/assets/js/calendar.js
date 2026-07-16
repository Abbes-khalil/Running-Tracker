import { escapeHtml, runsApi, setStatus } from './api.js';

let currentDate = new Date();
let runs = [];
const grid = document.querySelector('#calendar-grid');
const title = document.querySelector('#current-month');
const status = document.querySelector('#page-status');

function renderCalendar() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  title.textContent = new Intl.DateTimeFormat('en', { month: 'long', year: 'numeric' }).format(currentDate);
  const firstDay = new Date(year, month, 1).getDay();
  const days = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < firstDay; i += 1) cells.push('<div class="calendar-cell muted" aria-hidden="true"></div>');
  for (let day = 1; day <= days; day += 1) {
    const key = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const dayRuns = runs.filter((run) => run.run_date === key);
    const isToday = new Date().toDateString() === new Date(year, month, day).toDateString();
    cells.push(`<div class="calendar-cell${isToday ? ' today' : ''}">
      <span class="day-number">${day}</span>
      ${dayRuns.map((run) => `<a href="./activities.html" class="calendar-run"><strong>${escapeHtml(run.run_type)}</strong><span>${Number(run.distance_km).toFixed(1)} km</span></a>`).join('')}
    </div>`);
  }
  grid.innerHTML = cells.join('');
}

document.querySelector('#previous-month').addEventListener('click', () => {
  currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
  renderCalendar();
});
document.querySelector('#next-month').addEventListener('click', () => {
  currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
  renderCalendar();
});

try {
  runs = await runsApi.list();
  renderCalendar();
} catch (error) {
  setStatus(status, error.message, 'error');
  renderCalendar();
}
