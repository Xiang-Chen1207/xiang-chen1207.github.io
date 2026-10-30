(() => {
  const container = document.querySelector('.visitor-stats');
  if (!container) return;

  const fields = [...container.querySelectorAll('[data-visitor-stat]')];
  const status = container.querySelector('.visitor-stats-status');
  const siteOrigin = 'https://xiang-chen1207.github.io';
  const endpoint = 'https://bsz.iirose.cn/api';
  const identityKey = 'xiang-chen-visitor-id';
  const numberFormat = new Intl.NumberFormat('en-US');
  const dayFormat = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit'
  });
  let inFlight = false;

  // Local previews and copies must not add visits to the published homepage.
  if (window.location.origin !== siteOrigin) {
    status.textContent = 'Visit statistics are available on the live website.';
    return;
  }

  function dayKey() {
    const parts = Object.fromEntries(dayFormat.formatToParts(new Date()).map(part => [part.type, part.value]));
    return `${parts.year}-${parts.month}-${parts.day}`;
  }

  async function updateStatistics(method) {
    if (inFlight) return;
    inFlight = true;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    // One dated page bucket gives daily PV/UV while the host aggregates all-time PV/UV.
    // Hash navigation and background refreshes never submit additional page views.
    const headers = { 'x-bsz-referer': `${siteOrigin}/__visits/${dayKey()}` };
    try {
      const identity = localStorage.getItem(identityKey);
      if (identity) headers.Authorization = `Bearer ${identity}`;
    } catch {
      // The service can still estimate visitors when browser storage is unavailable.
    }

    try {
      const response = await fetch(endpoint, {
        method, headers, credentials: 'omit', referrerPolicy: 'no-referrer',
        cache: 'no-store', signal: controller.signal
      });
      if (!response.ok) throw new Error('Statistics request failed');
      const result = await response.json();
      if (result.success !== true || !result.data) throw new Error('Statistics are unavailable');
      const counts = fields.map(field => result.data[field.dataset.visitorStat]);
      if (!counts.every(value => Number.isSafeInteger(value) && value >= 0)) {
        throw new Error('Invalid statistics response');
      }

      try {
        const identity = response.headers.get('Set-Bsz-Identity');
        if (identity) localStorage.setItem(identityKey, identity);
      } catch {
        // A disabled storage API must not prevent the counters from displaying.
      }
      fields.forEach((field, index) => { field.textContent = numberFormat.format(counts[index]); });
      status.textContent = '';
    } catch {
      fields.forEach(field => { field.textContent = '—'; });
      status.textContent = 'Visit statistics are temporarily unavailable.';
    } finally {
      clearTimeout(timeout);
      inFlight = false;
    }
  }

  // Honor an explicit browser tracking preference while still displaying public totals.
  const doNotTrack = navigator.globalPrivacyControl === true || navigator.doNotTrack === '1';
  updateStatistics(doNotTrack ? 'GET' : 'POST');
  // Read-only refreshes also move the daily bucket forward after midnight in China.
  setInterval(() => { if (!document.hidden) updateStatistics('GET'); }, 300000);
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) updateStatistics('GET');
  });
})();
