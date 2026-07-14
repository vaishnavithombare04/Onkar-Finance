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
    
    // Rewrite URLs dynamically if inside admin or TeamLeader folder
    const isInsideAdmin = window.location.pathname.includes('/admin/');
    const isInsideTeamLeader = window.location.pathname.includes('/TeamLeader/');
    if (isInsideAdmin || isInsideTeamLeader) {
      const folderPrefix = isInsideAdmin ? 'admin/' : 'TeamLeader/';
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
  const isInsideTeamLeader = currentPath.includes('/TeamLeader/');
  
  const rootPrefix = (isInsideAdmin || isInsideTeamLeader) ? '../' : './';
  const adminPrefix = isInsideAdmin ? '' : (isInsideTeamLeader ? '../admin/' : 'admin/');
  const tlPrefix = isInsideTeamLeader ? '' : (isInsideAdmin ? '../TeamLeader/' : 'TeamLeader/');

  if (selector === '[data-component="sidebar"]') {
    if (isInsideTeamLeader) {
      element.innerHTML = `
        <div class="sidebar-nav">
          <div class="sidebar-header">
            <div class="logo-icon">O</div>
            <span class="logo-text">Onkar Finance</span>
          </div>
          <ul class="sidebar-menu">
            <li><a href="${rootPrefix}${tlPrefix}dashboard.html" class="nav-item" data-page="dashboard"><i class="lucide-layout-dashboard"></i><span class="nav-label">Dashboard</span></a></li>
            <li><a href="${rootPrefix}${tlPrefix}leads.html" class="nav-item" data-page="leads"><i class="lucide-users"></i><span class="nav-label">Leads CRM</span></a></li>
            <li><a href="${rootPrefix}${tlPrefix}customers.html" class="nav-item" data-page="customers"><i class="lucide-user-check"></i><span class="nav-label">Customers</span></a></li>
            <li><a href="${rootPrefix}${tlPrefix}loan-applications.html" class="nav-item" data-page="loan-applications"><i class="lucide-file-text"></i><span class="nav-label">Applications</span></a></li>
            <li><a href="${rootPrefix}${tlPrefix}employees.html" class="nav-item" data-page="employees"><i class="lucide-user-cog"></i><span class="nav-label">My Team</span></a></li>
            <li><a href="${rootPrefix}${tlPrefix}communication-center.html" class="nav-item" data-page="communications"><i class="lucide-message-square"></i><span class="nav-label">Inbox</span></a></li>
            <li><a href="${rootPrefix}${tlPrefix}profile.html" class="nav-item" data-page="profile"><i class="lucide-user"></i><span class="nav-label">My Profile</span></a></li>
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
            <div class="logo-icon">O</div>
            <span class="logo-text">Onkar Finance</span>
          </div>
          <ul class="sidebar-menu">
            <li><a href="${rootPrefix}${adminPrefix}dashboard.html" class="nav-item" data-page="dashboard"><i class="lucide-layout-dashboard"></i><span class="nav-label">Dashboard</span></a></li>
            <li><a href="${rootPrefix}${adminPrefix}leads.html" class="nav-item" data-page="leads"><i class="lucide-users"></i><span class="nav-label">Leads CRM</span></a></li>
            <li><a href="${rootPrefix}${adminPrefix}customers.html" class="nav-item" data-page="customers"><i class="lucide-user-check"></i><span class="nav-label">Customers</span></a></li>
            <li><a href="${rootPrefix}${adminPrefix}loan-applications.html" class="nav-item" data-page="loan-applications"><i class="lucide-file-text"></i><span class="nav-label">Applications</span></a></li>
            <li><a href="${rootPrefix}${adminPrefix}employees.html" class="nav-item" data-page="employees"><i class="lucide-user-cog"></i><span class="nav-label">Employees</span></a></li>
            <li><a href="${rootPrefix}${adminPrefix}agents.html" class="nav-item" data-page="agents"><i class="lucide-shield-user"></i><span class="nav-label">Agents DSAs</span></a></li>
            <li><a href="${rootPrefix}${adminPrefix}vendors-banks.html" class="nav-item" data-page="vendors"><i class="lucide-landmark"></i><span class="nav-label">Banks Partners</span></a></li>
            <li><a href="${rootPrefix}${adminPrefix}branches.html" class="nav-item" data-page="branches"><i class="lucide-git-branch"></i><span class="nav-label">Branches</span></a></li>
            <li><a href="${rootPrefix}${adminPrefix}roles-permissions.html" class="nav-item" data-page="roles"><i class="lucide-key-round"></i><span class="nav-label">Permissions</span></a></li>
            <li><a href="${rootPrefix}${adminPrefix}communication-center.html" class="nav-item" data-page="communications"><i class="lucide-message-square"></i><span class="nav-label">Inbox</span></a></li>
            <li><a href="${rootPrefix}${adminPrefix}marketing-campaigns.html" class="nav-item" data-page="campaigns"><i class="lucide-megaphone"></i><span class="nav-label">Campaigns</span></a></li>
            <li><a href="${rootPrefix}${adminPrefix}reports-analytics.html" class="nav-item" data-page="reports"><i class="lucide-trending-up"></i><span class="nav-label">Reports</span></a></li>
            <li><a href="${rootPrefix}${adminPrefix}settings.html" class="nav-item" data-page="settings"><i class="lucide-settings"></i><span class="nav-label">Settings</span></a></li>
            <li><a href="${rootPrefix}${adminPrefix}profile.html" class="nav-item" data-page="profile"><i class="lucide-user"></i><span class="nav-label">My Profile</span></a></li>
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
    if (isInsideTeamLeader) {
      element.innerHTML = `
        <div class="topbar">
          <div class="topbar-tabs">
            <div class="tab-pill active">Overview</div>
            <div class="tab-pill" onclick="location.href='employees.html'">Targets</div>
          </div>
          <div class="topbar-actions">
            <div class="search-bar">
              <i class="lucide-search"></i>
              <input type="text" placeholder="Search team leads, customers..." id="globalSearch">
            </div>
            <div class="icon-btn">
              <i class="lucide-bell"></i>
              <div class="badge-dot"></div>
            </div>
            <div class="user-profile" onclick="location.href='${rootPrefix}${tlPrefix}profile.html'">
              <div class="avatar">PN</div>
              <div class="text-secondary bold" style="font-size: 13px;">Priya N.</div>
            </div>
          </div>
        </div>
      `;
    } else {
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
            <div class="user-profile" onclick="location.href='${rootPrefix}${adminPrefix}profile.html'">
              <div class="avatar">AD</div>
              <div class="text-secondary bold" style="font-size: 13px;">Aditya S.</div>
            </div>
          </div>
        </div>
      `;
    }
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
  const isInsideTeamLeader = window.location.pathname.includes('/TeamLeader/');
  const rootPrefix = (isInsideAdmin || isInsideTeamLeader) ? '../' : './';

  const sidebarPath = isInsideTeamLeader ? `${rootPrefix}components/sidebar-tl.html` : `${rootPrefix}components/sidebar.html`;
  const topbarPath = isInsideTeamLeader ? `${rootPrefix}components/topbar-tl.html` : `${rootPrefix}components/topbar.html`;

  loadComponent('[data-component="sidebar"]', sidebarPath);
  loadComponent('[data-component="topbar"]', topbarPath);
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
        const isInsideAdmin = window.location.pathname.includes('/admin/');
        const isInsideTeamLeader = window.location.pathname.includes('/TeamLeader/');
        const isInside = isInsideAdmin || isInsideTeamLeader;
        
        let prefix = '';
        if (!isInside) {
          prefix = 'admin/';
        }
        
        dropdown = document.createElement('div');
        dropdown.className = 'dropdown-menu';
        dropdown.style.right = '0';
        
        if (isInsideTeamLeader) {
          dropdown.innerHTML = `
            <div class="dropdown-item" onclick="location.href='profile.html'"><i class="lucide-user"></i> My Profile</div>
            <div class="dropdown-item" onclick="location.href='../index.html'"><i class="lucide-log-out"></i> Logout</div>
          `;
        } else {
          dropdown.innerHTML = `
            <div class="dropdown-item" onclick="location.href='${prefix}profile.html'"><i class="lucide-user"></i> My Profile</div>
            <div class="dropdown-item" onclick="location.href='${prefix}settings.html'"><i class="lucide-settings"></i> Settings</div>
            <div class="dropdown-item" onclick="location.href='${isInside ? '../' : './'}index.html'"><i class="lucide-log-out"></i> Logout</div>
          `;
        }
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

