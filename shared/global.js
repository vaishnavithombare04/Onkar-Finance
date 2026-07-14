/**
 * ==========================================================================
 * Onkar Finance - Shared Global Logic Layer (global.js)
 * ==========================================================================
 */

// Initialize Onkar Finance Mock DB
const defaultOnkarDB = {
    "users": [
        {
            "id": "BM001",
            "name": "Amit Deshmukh",
            "email": "amit.d@onkarfinance.com",
            "role": "Branch Manager",
            "branch": "Pune City Branch",
            "status": "active",
            "phone": "+91 98230 11223"
        },
        {
            "id": "TL001",
            "name": "Sanjay Mehta",
            "email": "sanjay.m@onkarfinance.com",
            "role": "Team Leader",
            "branch": "Pune City Branch",
            "status": "active",
            "phone": "+91 98230 44556"
        },
        {
            "id": "EMP101",
            "name": "Karan Joshi",
            "email": "karan.j@onkarfinance.com",
            "role": "Loan Executive",
            "branch": "Pune City Branch",
            "status": "active",
            "phone": "+91 98230 77889"
        },
        {
            "id": "EMP102",
            "name": "Priya Salunkhe",
            "email": "priya.s@onkarfinance.com",
            "role": "Loan Executive",
            "branch": "Pune City Branch",
            "status": "active",
            "phone": "+91 98230 99001"
        }
    ],
    "leads": [
        {
            "id": "LD901",
            "name": "Rahul Deshpande",
            "phone": "+91 98900 12345",
            "email": "rahul.d@gmail.com",
            "loanProduct": "Personal Loan",
            "value": "₹5,00,000",
            "status": "Fresh",
            "date": "2026-07-01",
            "nextFollowup": "2026-07-15",
            "assignedTo": "Karan Joshi"
        },
        {
            "id": "LD902",
            "name": "Ananya Kulkarni",
            "phone": "+91 98900 67890",
            "email": "ananya.k@yahoo.com",
            "loanProduct": "Home Loan",
            "value": "₹45,00,000",
            "status": "Interested",
            "date": "2026-07-02",
            "nextFollowup": "2026-07-16",
            "assignedTo": "Priya Salunkhe"
        },
        {
            "id": "LD903",
            "name": "Shridhar Patil",
            "phone": "+91 98900 55443",
            "email": "shridhar@patilenterprises.com",
            "loanProduct": "Business Loan",
            "value": "₹25,00,000",
            "status": "Follow-up",
            "date": "2026-07-05",
            "nextFollowup": "2026-07-17",
            "assignedTo": "Karan Joshi"
        },
        {
            "id": "LD904",
            "name": "Sunita Gokhale",
            "phone": "+91 98900 99887",
            "email": "sunita.g@outlook.com",
            "loanProduct": "Car Loan",
            "value": "₹12,00,000",
            "status": "Converted",
            "date": "2026-07-06",
            "nextFollowup": "2026-07-20",
            "assignedTo": "Priya Salunkhe"
        }
    ],
    "customers": [
        {
            "id": "CUST801",
            "name": "Abhijit Ranade",
            "phone": "+91 98500 11223",
            "email": "abhijit.r@gmail.com",
            "pan": "ABCDE1234F",
            "aadhaar": "1234-5678-9012",
            "profession": "Salaried (IT Professional)",
            "income": "₹1,20,000/mo",
            "activeLoans": "1 (Home Loan)"
        },
        {
            "id": "CUST802",
            "name": "Sneha Tambe",
            "phone": "+91 98500 44556",
            "email": "sneha.t@gmail.com",
            "pan": "XYZWV9876U",
            "aadhaar": "9876-5432-1098",
            "profession": "Self-Employed (Retailer)",
            "income": "₹1,80,000/mo",
            "activeLoans": "None (Disbursed Closed)"
        }
    ],
    "applications": [
        {
            "id": "APP701",
            "customer": "Abhijit Ranade",
            "loanProduct": "Home Loan",
            "amount": "₹35,00,000",
            "status": "Verification",
            "assignedTo": "Karan Joshi",
            "date": "2026-07-04"
        },
        {
            "id": "APP702",
            "customer": "Sneha Tambe",
            "loanProduct": "Business Loan",
            "amount": "₹15,00,000",
            "status": "Approved",
            "assignedTo": "Priya Salunkhe",
            "date": "2026-07-06"
        },
        {
            "id": "APP703",
            "customer": "Milind Raje",
            "loanProduct": "Personal Loan",
            "amount": "₹4,00,000",
            "status": "New Lead",
            "assignedTo": "Karan Joshi",
            "date": "2026-07-08"
        },
        {
            "id": "APP704",
            "customer": "Vikram Mane",
            "loanProduct": "Car Loan",
            "amount": "₹10,00,000",
            "status": "Bank Submission",
            "assignedTo": "Priya Salunkhe",
            "date": "2026-07-09"
        },
        {
            "id": "APP705",
            "customer": "Shilpa Shinde",
            "loanProduct": "Education Loan",
            "amount": "₹8,00,000",
            "status": "Under Process",
            "assignedTo": "Karan Joshi",
            "date": "2026-07-10"
        }
    ],
    "employees": [
        {
            "id": "EMP101",
            "name": "Karan Joshi",
            "role": "Loan Executive",
            "target": "₹50L",
            "achieved": "₹35L",
            "attendance": "94%",
            "status": "Active"
        },
        {
            "id": "EMP102",
            "name": "Priya Salunkhe",
            "role": "Loan Executive",
            "target": "₹50L",
            "achieved": "₹48L",
            "attendance": "96%",
            "status": "Active"
        },
        {
            "id": "TL001",
            "name": "Sanjay Mehta",
            "role": "Team Leader",
            "target": "₹2Cr",
            "achieved": "₹1.6Cr",
            "attendance": "98%",
            "status": "Active"
        }
    ],
    "agents": [
        {
            "id": "AGT601",
            "name": "Rajesh Phadke",
            "leadsGenerated": 18,
            "conversions": 12,
            "commission": "₹1,45,000",
            "status": "Active",
            "phone": "+91 99011 22334"
        },
        {
            "id": "AGT602",
            "name": "Vikas Shinde",
            "leadsGenerated": 10,
            "conversions": 5,
            "commission": "₹60,000",
            "status": "Active",
            "phone": "+91 99011 55667"
        }
    ],
    "communication_logs": [
        {
            "timestamp": "2026-07-14 10:15",
            "type": "Call",
            "recipient": "Rahul Deshpande",
            "agent": "Karan Joshi",
            "details": "Completed inquiry call. Requested income proofs.",
            "duration": "2m 14s"
        },
        {
            "timestamp": "2026-07-14 09:40",
            "type": "WhatsApp",
            "recipient": "Ananya Kulkarni",
            "agent": "Priya Salunkhe",
            "details": "Sent Home Loan checklist template.",
            "duration": "N/A"
        },
        {
            "timestamp": "2026-07-13 16:22",
            "type": "SMS",
            "recipient": "Shridhar Patil",
            "agent": "Karan Joshi",
            "details": "Follow-up reminder: Document submission pending.",
            "duration": "N/A"
        },
        {
            "timestamp": "2026-07-13 11:05",
            "type": "Email",
            "recipient": "Sunita Gokhale",
            "agent": "Priya Salunkhe",
            "details": "Emailed Car Loan approval quotation.",
            "duration": "N/A"
        }
    ],
    "audit_logs": [
        {
            "timestamp": "2026-07-14 08:30:10",
            "user": "Amit Deshmukh",
            "module": "Applications",
            "action": "Approve",
            "details": "Approved business loan APP702 for Sneha Tambe"
        },
        {
            "timestamp": "2026-07-13 15:40:22",
            "user": "Karan Joshi",
            "module": "Leads",
            "action": "Update",
            "details": "Moved lead LD901 status from Fresh to Follow-up"
        }
    ],
    "sessions": [
        {
            "device": "HP EliteBook 840",
            "browser": "Chrome 126.0",
            "ip": "192.168.1.44",
            "lastLogin": "2026-07-14 08:15",
            "status": "Active (This Session)"
        },
        {
            "device": "OnePlus 11 5G",
            "browser": "Chrome Mobile",
            "ip": "103.88.22.109",
            "lastLogin": "2026-07-13 22:45",
            "status": "Inactive"
        }
    ],
    "notifications": [
        {
            "id": "NTF991",
            "type": "leads",
            "message": "New lead assigned to Priya Salunkhe: Sunita Gokhale",
            "time": "12m ago"
        },
        {
            "id": "NTF992",
            "type": "applications",
            "message": "Document verification completed for APP702",
            "time": "1h ago"
        }
    ]
};

// Initialize Database Storage
const storedOnkarDB = localStorage.getItem('onkar_mock_db');
if (!storedOnkarDB) {
    window.mockDB = defaultOnkarDB;
    localStorage.setItem('onkar_mock_db', JSON.stringify(defaultOnkarDB));
} else {
    window.mockDB = JSON.parse(storedOnkarDB);
}

// Global Save Method
window.saveMockDB = () => {
    localStorage.setItem('onkar_mock_db', JSON.stringify(window.mockDB));
};

// Log Audit Trail Entry
window.logAudit = (user, module, action, details) => {
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 16);
    window.mockDB.audit_logs.unshift({ timestamp, user, module, action, details });
    window.saveMockDB();
};

// Theme Synchronizer Init
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const getStoredTheme = () => localStorage.getItem('theme');
    const setStoredTheme = theme => localStorage.setItem('theme', theme);
    
    const getPreferredTheme = () => {
        const stored = getStoredTheme();
        if (stored) return stored;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };

    const applyTheme = (theme) => {
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            document.body.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
            document.body.removeAttribute('data-theme');
        }
        setStoredTheme(theme);

        // Sync header theme toggle button icons
        if (themeToggle) {
            const sun = themeToggle.querySelector('.sun-icon');
            const moon = themeToggle.querySelector('.moon-icon');
            if (sun && moon) {
                if (theme === 'dark') {
                    sun.classList.add('d-none');
                    moon.classList.remove('d-none');
                } else {
                    sun.classList.remove('d-none');
                    moon.classList.add('d-none');
                }
            }
        }

        // Sync sidebar theme toggle button icons
        if (themeToggleBtn) {
            const icon = themeToggleBtn.querySelector('i');
            const span = themeToggleBtn.querySelector('span');
            if (icon) {
                if (theme === 'dark') {
                    icon.className = 'bi bi-sun';
                    if (span) span.innerText = 'Light Mode';
                } else {
                    icon.className = 'bi bi-moon';
                    if (span) span.innerText = 'Dark Mode';
                }
            }
        }

        // Trigger custom chart colors update
        if (window.Chart) {
            const isDark = theme === 'dark';
            Chart.defaults.color = isDark ? '#a3b3c9' : '#475569';
            Chart.defaults.borderColor = isDark ? '#223049' : '#e2e8f0';
        }

        const event = new CustomEvent('themechange', { detail: { theme } });
        document.dispatchEvent(event);
    };

    applyTheme(getPreferredTheme());

    const toggleHandler = () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark' || document.body.getAttribute('data-theme') === 'dark';
        applyTheme(isDark ? 'light' : 'dark');
    };

    if (themeToggle) {
        themeToggle.addEventListener('click', toggleHandler);
    }
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleHandler);
    }
}

// Responsive Sidebar Init
function initSidebar() {
    const toggleBtn = document.getElementById('sidebarToggle');
    const sidebar = document.querySelector('.app-sidebar');
    
    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            sidebar.classList.toggle('show');
        });

        // Close on clicking outside on mobile
        document.addEventListener('click', (e) => {
            if (window.innerWidth < 768 && sidebar.classList.contains('show') && !sidebar.contains(e.target) && e.target !== toggleBtn) {
                sidebar.classList.remove('show');
            }
        });
    }

    // Manual Expand/Collapse Toggle (via three dots icon in footer)
    const collapseToggleBtn = document.getElementById('sidebarToggleBtn');
    if (collapseToggleBtn && sidebar) {
        collapseToggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isExpanded = sidebar.classList.toggle('sidebar--expanded');
            localStorage.setItem('bm-sidebar-expanded', isExpanded ? '1' : '0');
        });

        // Restore expanded state on boot (defaults to collapsed if not set)
        if (localStorage.getItem('bm-sidebar-expanded') === '1') {
            sidebar.classList.add('sidebar--expanded');
        }
    }
}

// Global Calendar Popover Init
function formatLocalDate(date) {
    if (!date) return '';
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
}

function getActiveDate() {
    let dateStr = localStorage.getItem('onkar_active_date');
    if (!dateStr) {
        dateStr = formatLocalDate(new Date());
        localStorage.setItem('onkar_active_date', dateStr);
    }
    const parts = dateStr.split('-');
    return new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
}

function initGlobalCalendar() {
    const dateBadge = document.getElementById('serverDateLabel') || document.querySelector('.date-badge');
    if (!dateBadge) return;

    dateBadge.style.position = 'relative';
    let activeDate = getActiveDate();

    const updateBadgeText = (date) => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateBadge.innerHTML = `<i class="bi bi-calendar3 me-2"></i> ${date.toLocaleDateString('en-US', options)}`;
    };
    updateBadgeText(activeDate);

    const popover = document.createElement('div');
    popover.className = 'calendar-popover';
    dateBadge.appendChild(popover);

    let displayMonth = activeDate.getMonth();
    let displayYear = activeDate.getFullYear();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const renderCalendar = () => {
        popover.innerHTML = `
            <div class="calendar-header">
                <button class="calendar-nav-btn prev-month" type="button"><i class="bi bi-chevron-left"></i></button>
                <h4>${monthNames[displayMonth]} ${displayYear}</h4>
                <button class="calendar-nav-btn next-month" type="button"><i class="bi bi-chevron-right"></i></button>
            </div>
            <div class="calendar-grid">
                <div class="calendar-day-header">Su</div>
                <div class="calendar-day-header">Mo</div>
                <div class="calendar-day-header">Tu</div>
                <div class="calendar-day-header">We</div>
                <div class="calendar-day-header">Th</div>
                <div class="calendar-day-header">Fr</div>
                <div class="calendar-day-header">Sa</div>
            </div>
        `;

        const grid = popover.querySelector('.calendar-grid');
        const firstDayIndex = new Date(displayYear, displayMonth, 1).getDay();
        const totalDays = new Date(displayYear, displayMonth + 1, 0).getDate();

        for (let i = 0; i < firstDayIndex; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day empty';
            grid.appendChild(emptyDay);
        }

        const today = new Date();
        const curActive = getActiveDate();

        for (let day = 1; day <= totalDays; day++) {
            const dayEl = document.createElement('div');
            dayEl.className = 'calendar-day';
            dayEl.innerText = day;

            if (day === curActive.getDate() && displayMonth === curActive.getMonth() && displayYear === curActive.getFullYear()) {
                dayEl.classList.add('selected');
            }
            if (day === today.getDate() && displayMonth === today.getMonth() && displayYear === today.getFullYear()) {
                dayEl.classList.add('today');
            }

            dayEl.addEventListener('click', (e) => {
                e.stopPropagation();
                const newDate = new Date(displayYear, displayMonth, day);
                localStorage.setItem('onkar_active_date', formatLocalDate(newDate));
                updateBadgeText(newDate);
                popover.classList.remove('show');
            });

            grid.appendChild(dayEl);
        }

        popover.querySelector('.prev-month').addEventListener('click', (e) => {
            e.stopPropagation();
            displayMonth--;
            if (displayMonth < 0) { displayMonth = 11; displayYear--; }
            renderCalendar();
        });

        popover.querySelector('.next-month').addEventListener('click', (e) => {
            e.stopPropagation();
            displayMonth++;
            if (displayMonth > 11) { displayMonth = 0; displayYear++; }
            renderCalendar();
        });
    };

    dateBadge.addEventListener('click', (e) => {
        e.stopPropagation();
        const isShown = popover.classList.contains('show');
        document.querySelectorAll('.calendar-popover').forEach(el => el.classList.remove('show'));
        if (!isShown) {
            renderCalendar();
            popover.classList.add('show');
        }
    });

    document.addEventListener('click', (e) => {
        if (!dateBadge.contains(e.target)) {
            popover.classList.remove('show');
        }
    });
}

// Custom select dropdown wrapper generator
function initCustomDropdowns() {
    const nativeSelects = document.querySelectorAll('select:not([data-custom-select])');
    nativeSelects.forEach(select => {
        select.setAttribute('data-custom-select', 'true');

        const wrapper = document.createElement('div');
        wrapper.className = 'custom-select-wrapper';
        select.parentNode.insertBefore(wrapper, select);
        wrapper.appendChild(select);

        // Hide native visually
        select.style.position = 'absolute';
        select.style.width = '1px';
        select.style.height = '1px';
        select.style.overflow = 'hidden';
        select.style.clip = 'rect(0,0,0,0)';

        const trigger = document.createElement('button');
        trigger.className = 'custom-select-trigger';
        trigger.type = 'button';
        
        const activeOption = select.options[select.selectedIndex];
        const triggerText = document.createElement('span');
        triggerText.innerText = activeOption ? activeOption.text : 'Select...';
        trigger.appendChild(triggerText);

        const chevron = document.createElement('i');
        chevron.className = 'bi bi-chevron-down';
        trigger.appendChild(chevron);
        wrapper.appendChild(trigger);

        const optionsList = document.createElement('div');
        optionsList.className = 'custom-select-options';
        wrapper.appendChild(optionsList);

        const buildOptions = () => {
            optionsList.innerHTML = '';
            Array.from(select.options).forEach(opt => {
                const optEl = document.createElement('div');
                optEl.className = 'custom-select-option';
                optEl.innerText = opt.text;
                if (opt.value === select.value) optEl.classList.add('selected');

                optEl.addEventListener('click', (e) => {
                    e.stopPropagation();
                    select.value = opt.value;
                    triggerText.innerText = opt.text;
                    select.dispatchEvent(new Event('change'));
                    optionsList.classList.remove('show');
                });
                optionsList.appendChild(optEl);
            });
        };

        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            const isShown = optionsList.classList.contains('show');
            document.querySelectorAll('.custom-select-options').forEach(el => el.classList.remove('show'));
            if (!isShown) {
                buildOptions();
                optionsList.classList.add('show');
            }
        });

        select.addEventListener('change', () => {
            const currentOption = select.options[select.selectedIndex];
            triggerText.innerText = currentOption ? currentOption.text : 'Select...';
        });

        document.addEventListener('click', () => {
            optionsList.classList.remove('show');
        });
    });
}

// Toast alerts helper
function showToast(message, type = "success") {
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `custom-toast toast-${type}`;
    
    const iconMap = {
        success: 'bi-check-circle-fill',
        error: 'bi-x-circle-fill',
        warning: 'bi-exclamation-triangle-fill',
        reminder: 'bi-bell-fill'
    };
    const iconClass = iconMap[type] || 'bi-info-circle-fill';

    toast.innerHTML = `
        <div class="d-flex align-items-center gap-2">
            <i class="bi ${iconClass} text-${type === 'error' ? 'danger' : type === 'reminder' ? 'primary' : type}"></i>
            <div class="toast-content">
                <span class="toast-title">${type.toUpperCase()}</span>
                <span class="toast-desc">${message}</span>
            </div>
        </div>
        <button class="toast-close">&times;</button>
    `;

    container.appendChild(toast);
    toast.querySelector('.toast-close').addEventListener('click', () => toast.remove());

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.5s';
        setTimeout(() => toast.remove(), 500);
    }, 4000);
}

// Datatable controller helper
function initDataTable(tableSelector) {
    const table = document.querySelector(tableSelector);
    if (!table) return;

    const tbody = table.querySelector('tbody');
    const originalRows = Array.from(tbody.querySelectorAll('tr'));
    let filteredRows = [...originalRows];

    // Simple text search filter bar hook
    table.addEventListener('filterTable', (e) => {
        const { searchVal } = e.detail;
        filteredRows = originalRows.filter(row => {
            return row.innerText.toLowerCase().includes(searchVal.toLowerCase());
        });
        tbody.innerHTML = "";
        filteredRows.forEach(row => tbody.appendChild(row));
    });
}

function initFilterBar(barSelector, tableSelector) {
    const bar = document.querySelector(barSelector);
    const table = document.querySelector(tableSelector);
    if (!bar || !table) return;

    const searchInput = bar.querySelector('input[type="text"]');
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            const searchVal = searchInput.value;
            const filterEvent = new CustomEvent('filterTable', { detail: { searchVal } });
            table.dispatchEvent(filterEvent);
        });
    }
}

// Bootstrap modal quick wrappers
function openModal(id) {
    const el = document.getElementById(id);
    if (el && window.bootstrap) {
        const modal = bootstrap.Modal.getOrCreateInstance(el);
        modal.show();
    }
}

function closeModal(id) {
    const el = document.getElementById(id);
    if (el && window.bootstrap) {
        const modal = bootstrap.Modal.getOrCreateInstance(el);
        modal.hide();
    }
}

// Notifications dynamic renderer
function initNotifications() {
    const badge = document.getElementById('notifBadge');
    const list = document.getElementById('notificationList');
    const clearBtn = document.getElementById('clearNotifLink');

    const renderNotifs = () => {
        if (!list) return;
        const notifs = window.mockDB.notifications || [];
        if (notifs.length === 0) {
            if (badge) badge.style.display = 'none';
            list.innerHTML = `<div class="text-muted text-center py-2 font-11">No new notifications</div>`;
        } else {
            if (badge) badge.style.display = 'block';
            list.innerHTML = notifs.map(n => `
                <div class="d-flex flex-column border-bottom pb-2">
                    <span class="font-12" style="font-weight: 500; color: var(--text-primary);">${n.message}</span>
                    <small class="text-muted font-10 mt-1">${n.time}</small>
                </div>
            `).join('');
        }
    };

    if (clearBtn) {
        clearBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.mockDB.notifications = [];
            window.saveMockDB();
            renderNotifs();
            showToast("Notifications cleared", "success");
        });
    }

    renderNotifs();
}

// Global script running
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initSidebar();
    initGlobalCalendar();
    initCustomDropdowns();
    initNotifications();
});

// Expose globals
window.showToast = showToast;
window.initDataTable = initDataTable;
window.initFilterBar = initFilterBar;
window.openModal = openModal;
window.closeModal = closeModal;
