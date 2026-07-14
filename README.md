# Onkar Finance — Administration Portal Frontend (ERP + CRM)

Welcome to the **Onkar Finance** administration portal frontend. This application is a lightweight, responsive, and modern Loan & Lead Management dashboard designed for fintech administrators, branch managers, and credit officers.

Built entirely with **Vanilla HTML, CSS, and JavaScript**, the architecture uses single-page application (SPA) dynamics and client-side page swapping without any thick framework dependencies (React/Vue/Angular), achieving instant load speeds and zero-latency navigations.

---

## 🔑 Demo Access Credentials

To test the admin interface from the login portal (`index.html`), use the following pre-configured credentials:

*   **Email / Username:** `admin@onkarfinance.com`
*   **Password:** `admin123`

---

## 📁 Workspace & Directory Structure

```text
Onkar-Finance/
├── index.html                   # Login & Authentication Entry Point
├── signup.html                  # Staff/Officer Registration Page (with dynamic OTP mockup)
├── forgot-password.html         # Forgot Password Recovery Page
├── 404.html                     # Custom 404 Fallback Page
│
├── admin/                       # Core Administration Sub-modules
│   ├── dashboard.html           # Principal Business KPI Hub & Performance Charts
│   ├── leads.html               # Lead CRM & Pipeline Manager (with dynamically generated tables)
│   ├── customers.html           # Registered Customer directory (with sliding drawers)
│   ├── loan-applications.html   # Underwriting Pipeline Stage tracker (horizontal layout)
│   ├── loan-application-detail.html # OCR documents, Credit Score and Underwriting actions
│   ├── employees.html           # Staff and System user directory
│   ├── agents.html              # DSA Partner profile and Commission Payout tracker
│   ├── vendors-banks.html       # Financial funding and bank partnership dashboard
│   ├── branches.html            # Physical branch layout directories
│   ├── roles-permissions.html   # Access control matrix & user permission levels
│   ├── communication-center.html # Chat CRM, SMS queues and template editors
│   ├── marketing-campaigns.html # Wizard-stepper Campaign creator
│   ├── reports-analytics.html   # Charts, CSV exports, and ledger audit files
│   ├── settings.html            # Global ERP configurations
│   └── profile.html             # Admin profile and credentials manager
│
├── assets/
│   ├── css/
│   │   ├── global.css           # Core typography, HSL color tokens, utility classes
│   │   ├── components.css       # Sidebar, Topbar, Modals, Forms & Table layouts
│   │   └── auth.css             # Unified login, signup, and stepper panels
│   └── js/
│       ├── global.js            # Theme controller, Bootstrap Icon translator, global formatters
│       ├── api.js               # Mock database tables and CRUD simulators
│       ├── components.js        # Global listeners, dynamic sidebar & dropdown managers
│       ├── auth.js              # Login validation, password strength tracker, OTP verification
│       └── nav.js               # Dynamic AJAX client-side page swapper & header style injector
│
└── components/                  # Asynchronous Page Fragments
    ├── sidebar.html             # Collapsible left panel layout
    ├── topbar.html              # User status, Notifications, Search and Theme Toggle
    └── footer.html              # Copyright notice and systemic indicators
```

---

## ⚡ Architectural Core Features

### 1. Theme Engine & Anti-Blink Prevention
To prevent dark-theme layout shift/flash (blink) on page load, a synchronous, blocking initialization script is embedded in the `<head>` of every single document. It retrieves user theme settings (`light`/`dark`) directly from `localStorage` and locks the `data-theme` attribute and browser `color-scheme` property before the browser renders any HTML nodes.

### 2. Client-Side AJAX Swapper (`nav.js`)
Pages inside `/admin/` navigate without full-browser reloads. `nav.js` intercepts all link clicks with `data-nav` attributes:
*   Fetches target pages asynchronously.
*   Parses the fetched HTML, swapping out `#page-content` in the active DOM.
*   Dynamically extracts page-specific `<style>` tags from the fetched `<head>` and appends them to the active document, ensuring layouts (e.g. horizontal pipelines, tab panels) render correctly.
*   Extracts and executes script tags tagged with `data-page-init` to scope initialization logic on page load.

### 3. Bootstrap Icons (BI) Adapter
The project features a clean utility mapping in `global.js` that scans the document for Lucide class tags (`class="lucide-..."`) and dynamically updates them into high-performance **Bootstrap Icons** classes (`class="bi bi-..."`). This translates icons across static markup and dynamically rendered tables seamlessly.

### 4. Mock Database State (`api.js`)
Contains local storage based mock datasets to simulate database actions including:
*   Adding leads and computing pipeline statistics.
*   Deleting rows and handling batch actions (bulk deletion).
*   Mocking OTP verification codes.

---

##