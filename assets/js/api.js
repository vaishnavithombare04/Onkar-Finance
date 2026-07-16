// Mock API endpoints for local database simulation and workflow integrations

const mockDb = {
  leads: [
    { id: "LD-8902", name: "Amit Sharma", contact: "+91 98765 43210", email: "amit.sharma@example.com", source: "Website", product: "Personal Loan", assignedTo: "Rahul Verma", status: "New Lead", date: "2026-07-10", amount: 500000, sentTo: "HDFC Bank Ltd.", documents: [ { fileName: "Amit_Sharma_PAN.pdf", type: "PAN Card", status: "Completed", date: "2026-07-10" }, { fileName: "Amit_Sharma_Aadhaar.pdf", type: "Aadhaar Card", status: "Completed", date: "2026-07-10" } ] },
    { id: "LD-8903", name: "Priya Patel", contact: "+91 87654 32109", email: "priya.patel@example.com", source: "Agent", product: "Home Loan", assignedTo: "Siddhi Sen", status: "Verification", date: "2026-07-11", amount: 3500000, sentTo: "ICICI Bank Ltd.", documents: [] },
    { id: "LD-8904", name: "Rajesh Kumar", contact: "+91 76543 21098", email: "rajesh.k@example.com", source: "Google Ads", product: "Business Loan", assignedTo: "Rahul Verma", status: "Under Process", date: "2026-07-12", amount: 1500000, sentTo: "HDFC Bank Ltd.", documents: [ { fileName: "Rajesh_Kumar_PAN.pdf", type: "PAN Card", status: "Completed", date: "2026-07-12" } ] },
    { id: "LD-8905", name: "Neha Gupta", contact: "+91 98123 45678", email: "neha.g@example.com", source: "Referral", product: "Gold Loan", assignedTo: "Anjali Rao", status: "Approved", date: "2026-07-13", amount: 250000, sentTo: "State Bank of India (SBI)", documents: [] },
    { id: "LD-8906", name: "Vikram Malhotra", contact: "+91 99112 23344", email: "vikram.m@example.com", source: "Direct", product: "Vehicle Loan", assignedTo: "Rahul Verma", status: "Disbursed", date: "2026-07-14", amount: 800000, sentTo: "HDFC Bank Ltd.", documents: [ { fileName: "Vikram_Malhotra_PAN.pdf", type: "PAN Card", status: "Completed", date: "2026-07-14" }, { fileName: "Vikram_Malhotra_SalarySlips.pdf", type: "Salary Slips (Last 3 Mos)", status: "Completed", date: "2026-07-14" } ] }
  ],
  customers: [
    { id: "CUST-4101", name: "Amit Sharma", email: "amit.sharma@example.com", contact: "+91 98765 43210", activeLoans: 1, kycStatus: "Completed", branch: "Mumbai Main" },
    { id: "CUST-4102", name: "Neha Gupta", email: "neha.g@example.com", contact: "+91 98123 45678", activeLoans: 1, kycStatus: "Completed", branch: "Delhi Connaught" },
    { id: "CUST-4103", name: "Vikram Malhotra", email: "vikram.m@example.com", contact: "+91 99112 23344", activeLoans: 2, kycStatus: "Completed", branch: "Pune Deccan" },
    { id: "CUST-4104", name: "Kunal Deshmukh", email: "kunal.d@example.com", contact: "+91 98887 76655", activeLoans: 0, kycStatus: "Pending", branch: "Mumbai Main" }
  ],
  employees: [
    { name: "Rahul Verma", role: "Branch Manager", branch: "Mumbai Main", team: "Sales Team A", attendance: 95, target: 5000000, achieved: 4200000, status: "Active" },
    { name: "Siddhi Sen", role: "Verification Officer", branch: "Delhi Connaught", team: "Risk & Credit", attendance: 98, target: 0, achieved: 0, status: "Active" },
    { name: "Anjali Rao", role: "Relationship Manager", branch: "Pune Deccan", team: "Sales Team B", attendance: 92, target: 3000000, achieved: 3100000, status: "Active" }
  ],
  agents: [
    { name: "Suresh Patil", contact: "+91 95555 44444", referred: 14, conversion: "78%", commission: 142000, status: "Active" },
    { name: "Ramesh Iyer", contact: "+91 96666 55555", referred: 8, conversion: "62%", commission: 68000, status: "Active" },
    { name: "Manoj Awasthi", contact: "+91 97777 66666", referred: 22, conversion: "85%", commission: 310000, status: "Active" }
  ],
  banks: [
    { id: "BNK-001", name: "HDFC Bank Ltd.", products: "Home Loan, Personal Loan", routed: 142, approvalRate: 82, apiStatus: "API Connected", support: "hdfc.support@onkar.com", apiKey: "hdfc_live_k9x2m", webhookUrl: "https://api.hdfcbank.com/webhook/onkar", routingMode: "API" },
    { id: "BNK-002", name: "ICICI Bank Ltd.", products: "Business Loan, Auto Loan", routed: 98, approvalRate: 75, apiStatus: "API Connected", support: "icici.api@onkar.com", apiKey: "icici_prod_p4r7t", webhookUrl: "https://gateway.icicibank.com/hook/onkar", routingMode: "API" },
    { id: "BNK-003", name: "State Bank of India (SBI)", products: "Agriculture Loan, Home Loan", routed: 210, approvalRate: 64, apiStatus: "Manual Routing", support: "sbi.manual@onkar.com", apiKey: "", webhookUrl: "", routingMode: "Manual" }
  ],
  branches: [
    { id: "BR-001", name: "Mumbai Main",      manager: "Rahul Verma",  region: "Maharashtra", staff: 12, disbursedCr: 2.4, targetCr: 2.6, status: "On Track"      },
    { id: "BR-002", name: "Delhi Connaught",   manager: "Siddhi Sen",   region: "Delhi NCR",   staff: 8,  disbursedCr: 1.8, targetCr: 2.4, status: "Action Needed" },
    { id: "BR-003", name: "Pune Deccan",       manager: "Anjali Rao",   region: "Maharashtra", staff: 4,  disbursedCr: 0.62,targetCr: 1.2, status: "Lagging"       }
  ]
};

// Initializing local storage database if not present
let existingDb = localStorage.getItem('onkar_db');
if (!existingDb) {
  localStorage.setItem('onkar_db', JSON.stringify(mockDb));
} else {
  try {
    const dbObj = JSON.parse(existingDb);
    const needsMigration = dbObj.leads && dbObj.leads.some(l => !l.sentTo);
    if (needsMigration) {
      dbObj.leads.forEach((l, idx) => {
        const updatedLead = mockDb.leads.find(ml => ml.id === l.id);
        if (updatedLead) {
          l.sentTo = l.sentTo || updatedLead.sentTo;
          l.documents = l.documents || updatedLead.documents;
        } else {
          if (idx % 3 === 0) l.sentTo = "HDFC Bank Ltd.";
          else if (idx % 3 === 1) l.sentTo = "ICICI Bank Ltd.";
          else l.sentTo = "State Bank of India (SBI)";
          l.documents = l.documents || [];
        }
      });
      localStorage.setItem('onkar_db', JSON.stringify(dbObj));
    }
  } catch (e) {
    console.error("Migration failed, resetting db:", e);
    localStorage.setItem('onkar_db', JSON.stringify(mockDb));
  }
}

// Initializing vendor profile if not present
if (!localStorage.getItem('onkar_vendor_profile')) {
  const defaultVendorProfile = {
    name: "Rajesh Saxena",
    bankName: "HDFC Bank Ltd.",
    email: "rajesh.saxena@hdfcbank.com",
    contact: "+91 98989 12345",
    apiKey: "hk_live_9a2f8b5c4d2e"
  };
  localStorage.setItem('onkar_vendor_profile', JSON.stringify(defaultVendorProfile));
}

const api = {
  getDb() {
    const db = JSON.parse(localStorage.getItem('onkar_db'));
    if (db) {
      let updated = false;
      if (!db.partners) {
        db.partners = [
          { name: "HDFC Bank Ltd.", products: "Home Loan, Personal Loan", routed: 142, rate: 82, status: "API Connected", contact: "hdfc.support@onkar.com" },
          { name: "ICICI Bank Ltd.", products: "Business Loan, Auto Loan", routed: 98, rate: 75, status: "API Connected", contact: "icici.api@onkar.com" },
          { name: "State Bank of India (SBI)", products: "Agriculture Loan, Home Loan", routed: 210, rate: 64, status: "Manual Routing", contact: "sbi.manual@onkar.com" }
        ];
        updated = true;
      }
      if (!db.branches) {
        db.branches = [
          { name: "Mumbai Main", manager: "Rahul Verma", staffCount: 12, disbursed: 2.4, target: 2.6, status: "On Track" },
          { name: "Delhi Connaught", manager: "Siddhi Sen", staffCount: 8, disbursed: 1.8, target: 2.4, status: "Action Needed" },
          { name: "Pune Deccan", manager: "Anjali Rao", staffCount: 4, disbursed: 0.62, target: 1.2, status: "Lagging" }
        ];
        updated = true;
      }
      if (!db.roles) {
        db.roles = [
          { name: "Super Admin", icon: "lucide-shield" },
          { name: "Branch Manager", icon: "lucide-user-check" },
          { name: "Relationship Manager", icon: "lucide-users" },
          { name: "Verification Agent", icon: "lucide-search" },
          { name: "Partner / DSA", icon: "lucide-handshake" }
        ];
        updated = true;
      }
      if (!db.campaigns) {
        db.campaigns = [
          { name: "Monsoon Special Home Loan", channel: "WhatsApp", status: "Completed", sent: "10,000 / 9,800", clicks: "42% / 15%", date: "10 Jul 2026" },
          { name: "Aadhaar E-Sign Reminder", channel: "SMS", status: "Completed", sent: "2,400 / 2,350", clicks: "98% / 60%", date: "12 Jul 2026" },
          { name: "Festival Gold Loan Discount", channel: "WhatsApp", status: "Scheduled", sent: "0 / 0", clicks: "0% / 0%", date: "20 Jul 2026" }
        ];
        updated = true;
      }
      if (updated) {
        localStorage.setItem('onkar_db', JSON.stringify(db));
      }
    }
    return db;
  },
  
  saveDb(db) {
    localStorage.setItem('onkar_db', JSON.stringify(db));
  },
  
  getLeads() {
    return this.getDb().leads;
  },
  
  addLead(lead) {
    const db = this.getDb();
    const newId = `LD-${Math.floor(1000 + Math.random() * 9000)}`;
    const newLead = {
      id: newId,
      date: new Date().toISOString().split('T')[0],
      ...lead
    };
    db.leads.unshift(newLead);
    this.saveDb(db);
    return newLead;
  },
  
  addAgent(agent) {
    const db = this.getDb();
    const newAgent = {
      referred: 0,
      conversion: '0%',
      commission: 0,
      status: 'Active',
      ...agent
    };
    db.agents.unshift(newAgent);
    this.saveDb(db);
    return newAgent;
  },

  addBank(bank) {
    const db = this.getDb();
    if (!db.banks) db.banks = [];
    const newId = `BNK-${String(db.banks.length + 1).padStart(3, '0')}`;
    const newBank = { id: newId, routed: 0, approvalRate: 0, ...bank };
    db.banks.unshift(newBank);
    this.saveDb(db);
    return newBank;
  },

  updateBank(id, fields) {
    const db = this.getDb();
    if (!db.banks) db.banks = [];
    const bank = db.banks.find(b => b.id === id);
    if (bank) { Object.assign(bank, fields); this.saveDb(db); }
    return bank;
  },

  addBranch(branch) {
    const db = this.getDb();
    if (!db.branches) db.branches = [];
    const newId = `BR-${String(db.branches.length + 1).padStart(3, '0')}`;
    const newBranch = { id: newId, staff: 0, disbursedCr: 0, ...branch };
    db.branches.push(newBranch);
    this.saveDb(db);
    return newBranch;
  },

  updateLeadStatus(id, status) {
    const db = this.getDb();
    const lead = db.leads.find(l => l.id === id);
    if (lead) {
      lead.status = status;
      this.saveDb(db);
    }
    return lead;
  }
};
