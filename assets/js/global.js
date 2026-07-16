// Global Utility Functions & State Management

// Load Bootstrap Icons stylesheet dynamically
(function() {
  if (!document.querySelector('link[href*="bootstrap-icons"]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css';
    document.head.appendChild(link);
  }
})();

const iconMapping = {
  'layout-dashboard': 'speedometer2',
  'users': 'people',
  'user-check': 'person-check',
  'file-text': 'file-earmark-text',
  'user-cog': 'person-gear',
  'shield-user': 'shield-shaded',
  'landmark': 'bank',
  'git-branch': 'diagram-3',
  'key-round': 'key',
  'message-square': 'chat-left-text',
  'megaphone': 'megaphone',
  'trending-up': 'graph-up-arrow',
  'settings': 'gear',
  'user': 'person',
  'moon': 'moon',
  'sun': 'sun',
  'menu': 'list',
  'search': 'search',
  'bell': 'bell',
  'download': 'download',
  'plus': 'plus-lg',
  'plus-circle': 'plus-circle',
  'eye': 'eye',
  'trash-2': 'trash',
  'arrow-left': 'arrow-left',
  'check': 'check-lg',
  'check-circle': 'check-circle',
  'x-circle': 'x-circle',
  'x': 'x',
  'alert-triangle': 'exclamation-triangle',
  'camera': 'camera',
  'key': 'key',
  'log-out': 'box-arrow-right',
  'shield': 'shield',
  'handshake': 'handshake',
  'play': 'play-fill',
  'percent': 'percent',
  'smartphone': 'smartphone',
  'shield-check': 'shield-check',
  'zap': 'lightning',
  'user-plus': 'person-plus',
  'edit-3': 'pencil-square',
  'arrow-down-left': 'arrow-down-left-circle',
  'arrow-up-right': 'arrow-up-right-circle',
  'home': 'house',
  'banknote': 'cash',
  'loader-circle': 'arrow-clockwise',
  'badge-check': 'patch-check',
  'filter-x': 'funnel',
  'more-vertical': 'three-dots-vertical',
  'more-horizontal': 'three-dots',
  'clipboard-list': 'clipboard-check',
  'clock': 'clock'
};

function initTheme() {
  const currentTheme = localStorage.getItem('onkar-theme') || 'light';
  document.documentElement.setAttribute('data-theme', currentTheme);
  document.documentElement.style.colorScheme = currentTheme;
  updateThemeIcon(currentTheme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  document.documentElement.style.colorScheme = newTheme;
  localStorage.setItem('onkar-theme', newTheme);
  updateThemeIcon(newTheme);
}


function updateThemeIcon(theme) {
  const icon = document.querySelector('.theme-toggle-btn i');
  if (!icon) return;
  if (theme === 'dark') {
    icon.className = 'lucide-sun';
    const text = document.querySelector('.theme-toggle-btn .theme-text');
    if (text) text.textContent = 'Light Mode';
  } else {
    icon.className = 'lucide-moon';
    const text = document.querySelector('.theme-toggle-btn .theme-text');
    if (text) text.textContent = 'Dark Mode';
  }
  initializeLucideIcons();
}

function initializeLucideIcons() {
  document.querySelectorAll('i[class^="lucide-"], i[class*=" lucide-"]').forEach(el => {
    const classList = Array.from(el.classList);
    const lucideClass = classList.find(c => c.startsWith('lucide-') && c !== 'lucide');
    if (lucideClass) {
      const iconName = lucideClass.replace('lucide-', '');
      const biIcon = iconMapping[iconName] || iconName;
      el.className = `bi bi-${biIcon}`;
    }
  });
}

// Override window.lucide to prevent console errors in pages that call lucide.createIcons()
window.lucide = {
  createIcons: initializeLucideIcons
};
window.initializeLucideIcons = initializeLucideIcons;

// Formatting helpers
function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
}

// Debounce helper for inputs/search
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  
  // Theme toggle button click event delegation
  document.body.addEventListener('click', (e) => {
    const toggleBtn = e.target.closest('.theme-toggle-btn');
    if (toggleBtn) {
      toggleTheme();
    }
  });
});
