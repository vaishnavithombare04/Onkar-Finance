// UI Components Manager (Toasts, Modals, Dynamic HTML Loading)

// Toast Alert Manager
function showToast(message, type = 'info') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  let iconClass = 'lucide-info';
  if (type === 'success') iconClass = 'lucide-check-circle';
  if (type === 'danger') iconClass = 'lucide-alert-triangle';
  if (type === 'warning') iconClass = 'lucide-alert-circle';
  
  toast.innerHTML = `
    <i class="${iconClass}" style="color: var(--color-${type})"></i>
    <div style="flex: 1; font-weight: 500; font-size: 13px;">${message}</div>
    <i class="lucide-x" style="cursor: pointer; opacity: 0.6;" onclick="this.parentElement.remove()"></i>
  `;
  
  container.appendChild(toast);
  
  if (window.lucide) {
    lucide.createIcons({ attrs: { class: 'lucide-icon' } });
  }
  
  setTimeout(() => {
    toast.style.animation = 'slideOutRight 0.3s forwards';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// Modal Manager
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = 'flex';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = 'none';
  }
}

// Dynamic Component Loader (Sidebar & Topbar)
async function loadComponent(selector, path) {
  const element = document.querySelector(selector);
  if (!element) return;
  
  try {
    const response = await fetch(path);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const html = await response.text();
    element.innerHTML = html;
    
    // Rewrite URLs dynamically if inside admin or branch-manager folder
    const isInsideAdmin = window.location.pathname.includes('/admin/');
    const isInsideBM = window.location.pathname.includes('/branch-manager/');
    if (isInsideAdmin || isInsideBM) {
      const folderPrefix = isInsideAdmin ? 'admin/' : 'branch-manager/';
      element.querySelectorAll('a').forEach(a => {
        const href = a.getAttribute('href');
        if (href && !href.startsWith('http') && !href.startsWith('#') && !href.startsWith('javascript:')) {
          if (href.startsWith(folderPrefix)) {
            a.setAttribute('href', href.replace(folderPrefix, ''));
          } else {
            a.setAttribute('href', '../' + href);
          }
        }
      });
      const userProfile = element.querySelector('.user-profile');
      if (userProfile) {
        userProfile.setAttribute('onclick', "location.href='profile.html'");
      }
    }
    
    // Auto-highlight active link in sidebar
    if (selector === '[data-component="sidebar"]') {
      const isExpanded = localStorage.getItem('onkar-sidebar-expanded') === '1';
      const sidebarEl = element.querySelector('.sidebar-nav');
      if (sidebarEl) {
        sidebarEl.classList.toggle('sidebar--expanded', isExpanded);
      }
      highlightActiveSidebar();
    }
    
    // Initialize Lucide icons
    if (window.initializeLucideIcons) {
      initializeLucideIcons();
    }
  } catch (error) {
    console.warn(`Failed to dynamically load ${path} (usually due to CORS or local filesystem restrictions):`, error);
    // Graceful fallback for local file:/// usage
    fallbackComponentRenderer(selector);
  }
}

// Fallback Renderer for local HTML viewing without local server
function fallbackComponentRenderer(selector) {
  const element = document.querySelector(selector);
  if (!element) return;

  const currentPath = window.location.pathname;
  const isInsideAdmin = currentPath.includes('/admin/');
  const isInsideBM = currentPath.includes('/branch-manager/');
  const rootPrefix = (isInsideAdmin || isInsideBM) ? '../' : './';
  const adminPrefix = isInsideAdmin ? '' : 'admin/';

  if (selector === '[data-component="sidebar"]') {
    if (isInsideBM) {
      element.innerHTML = `
        <div class="sidebar-nav">
          <div class="sidebar-header">
            <div class="sidebar-toggle" style="cursor: pointer;"><i class="lucide-more-horizontal"></i></div>
            <span class="logo-text">Onkar Finance</span>
          </div>
          <ul class="sidebar-menu">
            <li><a href="${rootPrefix}branch-manager/index.html" class="nav-item" data-page="dashboard"><i class="lucide-layout-dashboard"></i><span class="nav-label">Dashboard</span></a></li>
            <li><a href="${rootPrefix}branch-manager/leads.html" class="nav-item" data-page="leads"><i class="lucide-users"></i><span class="nav-label">Leads CRM</span></a></li>
            <li><a href="${rootPrefix}branch-manager/customers.html" class="nav-item" data-page="customers"><i class="lucide-user-check"></i><span class="nav-label">Customers</span></a></li>
            <li><a href="${rootPrefix}branch-manager/applications.html" class="nav-item" data-page="applications"><i class="lucide-file-text"></i><span class="nav-label">Applications</span></a></li>
            <li><a href="${rootPrefix}branch-manager/application-detail.html" class="nav-item" data-page="detail"><i class="lucide-info"></i><span class="nav-label">App Detail</span></a></li>
            <li><a href="${rootPrefix}branch-manager/employees.html" class="nav-item" data-page="employees"><i class="lucide-user-cog"></i><span class="nav-label">Employees</span></a></li>
            <li><a href="${rootPrefix}branch-manager/agents.html" class="nav-item" data-page="agents"><i class="lucide-shield-user"></i><span class="nav-label">Agents DSAs</span></a></li>
            <li><a href="${rootPrefix}branch-manager/communication.html" class="nav-item" data-page="communications"><i class="lucide-message-square"></i><span class="nav-label">Inbox</span></a></li>
            <li><a href="${rootPrefix}branch-manager/reports.html" class="nav-item" data-page="reports"><i class="lucide-trending-up"></i><span class="nav-label">Reports</span></a></li>
            <li><a href="${rootPrefix}branch-manager/profile.html" class="nav-item" data-page="profile"><i class="lucide-user"></i><span class="nav-label">Settings</span></a></li>
          </ul>
          <div class="sidebar-footer">
            <div class="theme-toggle-btn">
              <i class="lucide-moon"></i>
              <span class="theme-text">Dark Mode</span>
            </div>
          </div>
        </div>
      `;
    } else {
      element.innerHTML = `
        <div class="sidebar-nav">
          <div class="sidebar-header">
            <div class="sidebar-toggle" style="cursor: pointer;"><i class="lucide-more-horizontal"></i></div>
            <span class="logo-text">Onkar Finance</span>
          </div>
          <ul class="sidebar-menu">
            <li><a href="${rootPrefix}admin/dashboard.html" class="nav-item" data-page="dashboard"><i class="lucide-layout-dashboard"></i><span class="nav-label">Dashboard</span></a></li>
            <li><a href="${rootPrefix}admin/leads.html" class="nav-item" data-page="leads"><i class="lucide-users"></i><span class="nav-label">Leads CRM</span></a></li>
            <li><a href="${rootPrefix}admin/customers.html" class="nav-item" data-page="customers"><i class="lucide-user-check"></i><span class="nav-label">Customers</span></a></li>
            <li><a href="${rootPrefix}admin/loan-applications.html" class="nav-item" data-page="loan-applications"><i class="lucide-file-text"></i><span class="nav-label">Applications</span></a></li>
            <li><a href="${rootPrefix}admin/employees.html" class="nav-item" data-page="employees"><i class="lucide-user-cog"></i><span class="nav-label">Employees</span></a></li>
            <li><a href="${rootPrefix}admin/agents.html" class="nav-item" data-page="agents"><i class="lucide-shield-user"></i><span class="nav-label">Agents DSAs</span></a></li>
            <li><a href="${rootPrefix}admin/vendors-banks.html" class="nav-item" data-page="vendors"><i class="lucide-landmark"></i><span class="nav-label">Banks Partners</span></a></li>
            <li><a href="${rootPrefix}admin/branches.html" class="nav-item" data-page="branches"><i class="lucide-git-branch"></i><span class="nav-label">Branches</span></a></li>
            <li><a href="${rootPrefix}admin/roles-permissions.html" class="nav-item" data-page="roles"><i class="lucide-key-round"></i><span class="nav-label">Permissions</span></a></li>
            <li><a href="${rootPrefix}admin/communication-center.html" class="nav-item" data-page="communications"><i class="lucide-message-square"></i><span class="nav-label">Inbox</span></a></li>
            <li><a href="${rootPrefix}admin/marketing-campaigns.html" class="nav-item" data-page="campaigns"><i class="lucide-megaphone"></i><span class="nav-label">Campaigns</span></a></li>
            <li><a href="${rootPrefix}admin/reports-analytics.html" class="nav-item" data-page="reports"><i class="lucide-trending-up"></i><span class="nav-label">Reports</span></a></li>
            <li><a href="${rootPrefix}admin/settings.html" class="nav-item" data-page="settings"><i class="lucide-settings"></i><span class="nav-label">Settings</span></a></li>
            <li><a href="${rootPrefix}admin/profile.html" class="nav-item" data-page="profile"><i class="lucide-user"></i><span class="nav-label">My Profile</span></a></li>
          </ul>
          <div class="sidebar-footer">
            <div class="theme-toggle-btn">
              <i class="lucide-moon"></i>
              <span class="theme-text">Dark Mode</span>
            </div>
          </div>
        </div>
      `;
    }
    const isExpanded = localStorage.getItem('onkar-sidebar-expanded') === '1';
    const sidebarEl = element.querySelector('.sidebar-nav');
    if (sidebarEl) {
      sidebarEl.classList.toggle('sidebar--expanded', isExpanded);
    }
    highlightActiveSidebar();
  } else if (selector === '[data-component="topbar"]') {
    const avatar = isInsideBM ? 'BM' : 'AD';
    const name = isInsideBM ? 'Amit D.' : 'Aditya S.';
    element.innerHTML = `
      <div class="topbar">
        <div class="topbar-tabs">
          <div class="tab-pill active">Overview</div>
          <div class="tab-pill">Manage</div>
          <div class="tab-pill">Audit logs</div>
        </div>
        <div class="topbar-actions">
          <div class="search-bar">
            <i class="lucide-search"></i>
            <input type="text" placeholder="Search customer, lead, or application..." id="globalSearch">
          </div>
          <div class="icon-btn">
            <i class="lucide-bell"></i>
            <div class="badge-dot"></div>
          </div>
          <div class="user-profile" onclick="location.href='${rootPrefix}${isInsideBM ? 'branch-manager/' : 'admin/'}profile.html'">
            <div class="avatar">${avatar}</div>
            <div class="text-secondary bold" style="font-size: 13px;">${name}</div>
          </div>
        </div>
      </div>
    `;
  } else if (selector === '[data-component="footer"]') {
    element.innerHTML = `
      <footer style="padding: 24px; text-align: center; border-top: 1px solid var(--color-border); font-size: var(--fs-small); color: var(--color-text-muted);">
        &copy; 2026 Onkar Finance Administration System. All rights reserved.
      </footer>
    `;
  }
  
  if (window.initializeLucideIcons) {
    initializeLucideIcons();
  }
}

function highlightActiveSidebar() {
  const currentPath = window.location.pathname;
  const items = document.querySelectorAll('.nav-item');
  items.forEach(item => {
    const pageAttr = item.getAttribute('href');
    if (pageAttr && currentPath.includes(pageAttr.split('/').pop())) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
}

// Table filtering / search client-side utility
function initTableSearch(tableId, inputId) {
  const input = document.getElementById(inputId);
  const table = document.getElementById(tableId);
  if (!input || !table) return;
  
  input.addEventListener('keyup', () => {
    const filter = input.value.toLowerCase();
    const rows = table.getElementsByTagName('tr');
    
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      let match = false;
      const cells = row.getElementsByTagName('td');
      
      for (let j = 0; j < cells.length; j++) {
        if (cells[j] && cells[j].textContent.toLowerCase().includes(filter)) {
          match = true;
          break;
        }
      }
      row.style.display = match ? '' : 'none';
    }
  });
}

// Dynamic Tab switcher
function initTabs(containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;
  
  const pills = container.querySelectorAll('.tab-pill');
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
    });
  });
}

// Trigger components setup
document.addEventListener('DOMContentLoaded', () => {
  const isInsideAdmin = window.location.pathname.includes('/admin/');
  const isInsideBM = window.location.pathname.includes('/branch-manager/');
  const rootPrefix = (isInsideAdmin || isInsideBM) ? '../' : './';
  const sidebarPath = isInsideBM ? `${rootPrefix}components/sidebar-bm.html` : `${rootPrefix}components/sidebar.html`;

  loadComponent('[data-component="sidebar"]', sidebarPath);
  loadComponent('[data-component="topbar"]', `${rootPrefix}components/topbar.html`);
  loadComponent('[data-component="footer"]', `${rootPrefix}components/footer.html`);

  // Setup dropdown delegations
  document.body.addEventListener('click', (e) => {
    // Sidebar toggle control
    const sidebarToggle = e.target.closest('.sidebar-toggle');
    if (sidebarToggle) {
      const sidebarEl = document.querySelector('.sidebar-nav');
      if (sidebarEl) {
        const isExpanded = sidebarEl.classList.contains('sidebar--expanded');
        sidebarEl.classList.toggle('sidebar--expanded', !isExpanded);
        localStorage.setItem('onkar-sidebar-expanded', !isExpanded ? '1' : '0');
      }
      return;
    }
    // 1. Notification Dropdown Toggle
    const bellBtn = e.target.closest('.topbar .icon-btn');
    if (bellBtn && bellBtn.querySelector('.lucide-bell')) {
      e.stopPropagation();
      let dropdown = bellBtn.querySelector('.dropdown-menu');
      if (!dropdown) {
        dropdown = document.createElement('div');
        dropdown.className = 'dropdown-menu';
        dropdown.style.right = '0';
        dropdown.innerHTML = `
          <div class="dropdown-item bold" style="border-bottom: 1px solid var(--color-border); cursor: default; font-weight: 700;">Notifications</div>
          <div class="dropdown-item" onclick="showToast('Verification request for Amit Sharma', 'info')"><i class="lucide-user-plus"></i> New lead "Amit Sharma" registered</div>
          <div class="dropdown-item" onclick="showToast('Application approved successfully', 'success')"><i class="lucide-file-text"></i> Personal Loan APP-8902 is approved</div>
          <div class="dropdown-item" onclick="showToast('File escalated to audit committee', 'warning')"><i class="lucide-alert-triangle"></i> Lead APP-8904 is escalated</div>
        `;
        bellBtn.appendChild(dropdown);
        if (window.lucide) window.lucide.createIcons();
      }
      document.querySelectorAll('.dropdown-menu').forEach(d => { if (d !== dropdown) d.classList.remove('show'); });
      dropdown.classList.toggle('show');
    }

    // 2. Profile Dropdown Toggle
    const profileBtn = e.target.closest('.user-profile');
    if (profileBtn) {
      e.stopPropagation();
      let dropdown = profileBtn.querySelector('.dropdown-menu');
      if (!dropdown) {
        const isInside = window.location.pathname.includes('/admin/');
        const prefix = isInside ? '' : 'admin/';
        dropdown = document.createElement('div');
        dropdown.className = 'dropdown-menu';
        dropdown.style.right = '0';
        dropdown.innerHTML = `
          <div class="dropdown-item" onclick="location.href='${prefix}profile.html'"><i class="lucide-user"></i> My Profile</div>
          <div class="dropdown-item" onclick="location.href='${prefix}settings.html'"><i class="lucide-settings"></i> Settings</div>
          <div class="dropdown-item" onclick="location.href='${isInside ? '../' : './'}index.html'"><i class="lucide-log-out"></i> Logout</div>
        `;
        profileBtn.appendChild(dropdown);
        if (window.lucide) window.lucide.createIcons();
      }
      document.querySelectorAll('.dropdown-menu').forEach(d => { if (d !== dropdown) d.classList.remove('show'); });
      dropdown.classList.toggle('show');
    }

    // 3. Row action "⋯" context menu toggle
    const rowMenuBtn = e.target.closest('.row-menu-trigger');
    if (rowMenuBtn) {
      e.stopPropagation();
      let dropdown = rowMenuBtn.querySelector('.dropdown-menu');
      if (!dropdown) {
        dropdown = document.createElement('div');
        dropdown.className = 'dropdown-menu';
        dropdown.style.position = 'absolute';
        dropdown.innerHTML = `
          <div class="dropdown-item" onclick="showToast('Viewing record details', 'info')"><i class="lucide-eye"></i> View File</div>
          <div class="dropdown-item" onclick="showToast('Edit mode enabled', 'success')"><i class="lucide-edit-3"></i> Edit Row</div>
          <div class="dropdown-item" style="color: var(--color-danger)" onclick="deleteRow(this)"><i class="lucide-trash-2"></i> Delete</div>
        `;
        rowMenuBtn.appendChild(dropdown);
        if (window.lucide) window.lucide.createIcons();
      }
      document.querySelectorAll('.dropdown-menu').forEach(d => { if (d !== dropdown) d.classList.remove('show'); });
      dropdown.classList.toggle('show');
    }

    // Close all open dropdowns on background click
    if (!e.target.closest('.dropdown-menu') && !e.target.closest('.icon-btn') && !e.target.closest('.user-profile') && !e.target.closest('.row-menu-trigger')) {
      document.querySelectorAll('.dropdown-menu').forEach(d => d.classList.remove('show'));
    }
  });

  // 4. Bulk action bar change event delegation
  document.body.addEventListener('change', (e) => {
    if (e.target.closest('.data-table') && (e.target.type === 'checkbox')) {
      const table = e.target.closest('.data-table');
      const checkedBoxes = table.querySelectorAll('tbody input[type="checkbox"]:checked');
      let bulkBar = document.getElementById('globalBulkBar');
      
      if (checkedBoxes.length > 0) {
        if (!bulkBar) {
          bulkBar = document.createElement('div');
          bulkBar.id = 'globalBulkBar';
          bulkBar.className = 'bulk-action-bar';
          bulkBar.innerHTML = `
            <span style="font-weight: 600;"><span id="bulkCount">1</span> items selected</span>
            <button class="btn btn-secondary" style="padding: 6px 12px; font-size:12px;" onclick="showToast('Assigned selected items successfully', 'success')"><i class="lucide-user-check"></i> Assign</button>
            <button class="btn btn-outline" style="padding: 6px 12px; font-size:12px; border-color: rgba(255,255,255,0.2); color:#FFF;" onclick="showToast('Exported selection', 'info')"><i class="lucide-download"></i> Export</button>
            <button class="btn btn-danger" style="padding: 6px 12px; font-size:12px;" onclick="bulkDeleteItems()"><i class="lucide-trash-2"></i> Delete</button>
          `;
          document.body.appendChild(bulkBar);
          if (window.lucide) window.lucide.createIcons();
        }
        document.getElementById('bulkCount').textContent = checkedBoxes.length;
        bulkBar.classList.add('show');
      } else {
        if (bulkBar) {
          bulkBar.classList.remove('show');
        }
      }
    }
  });
});

// Row delete helper
window.deleteRow = function(element) {
  const row = element.closest('tr');
  if (row && confirm('Are you sure you want to delete this record?')) {
    row.remove();
    showToast('Record deleted successfully', 'warning');
  }
};

// Bulk delete helper
window.bulkDeleteItems = function() {
  if (confirm('Are you sure you want to delete selected items?')) {
    showToast('Deleted selected records', 'warning');
    const bulkBar = document.getElementById('globalBulkBar');
    if (bulkBar) bulkBar.classList.remove('show');
    
    const selectAll = document.getElementById('selectAllCheckbox');
    if (selectAll) selectAll.checked = false;
    
    const table = document.querySelector('.data-table');
    if (table) {
      const checked = table.querySelectorAll('tbody input[type="checkbox"]:checked');
      checked.forEach(cb => {
        const row = cb.closest('tr');
        if (row) row.remove();
      });
    }
  }
};

