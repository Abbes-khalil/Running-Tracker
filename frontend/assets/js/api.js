const API_ROOT = '/backend/runs';

async function request(path, options = {}) {
  const response = await fetch(`${API_ROOT}/${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options.headers },
  });

  let payload;
  try {
    payload = await response.json();
  } catch {
    throw new Error('The server returned an invalid response. Is the PHP server running?');
  }

  if (!response.ok || payload.status === 'error') {
    throw new Error(payload.message || `Request failed (${response.status}).`);
  }
  return payload;
}

export const runsApi = {
  async list() {
    const payload = await request('list.php');
    return payload.data;
  },
  create(run) {
    return request('create.php', { method: 'POST', body: JSON.stringify(run) });
  },
  update(run) {
    return request('update.php', { method: 'PUT', body: JSON.stringify(run) });
  },
  remove(id) {
    return request('delete.php', { method: 'DELETE', body: JSON.stringify({ id }) });
  },
};

export function durationLabel(totalSeconds) {
  const seconds = Number(totalSeconds) || 0;
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return hours ? `${hours}h ${minutes}m` : `${minutes}m`;
}

export function longDate(value) {
  return new Intl.DateTimeFormat('en', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })
    .format(new Date(`${value}T00:00:00Z`));
}

export function escapeHtml(value = '') {
  const element = document.createElement('div');
  element.textContent = value;
  return element.innerHTML;
}

export function setStatus(element, message, type = '') {
  if (!element) return;
  element.textContent = message;
  element.className = `status-message ${type}`;
  element.hidden = !message;
}
