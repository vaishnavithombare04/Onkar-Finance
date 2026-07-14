// Mock API endpoints for local database simulation and workflow integrations

const mockDb = {
  leads: [
    { id: "LD-8902", name: "Amit Sharma", contact: "+91 98765 43210", email: "amit.sharma@example.com", source: "Website", product: "Personal Loan", assignedTo: "Rahul Verma", status: "New Lead", date: "2026-07-10", amount: 500000 },
    { id: "LD-8903", name: "Priya Patel", contact: "+91 87654 32109", email: "priya.patel@example.com", source: "Agent", product: "Home Loan", assignedTo: "Siddhi Sen", status: "Verification", date: "2026-07-11", amount: 3500000 },
    { id: "LD-8904", name: "Rajesh Kumar", contact: "+91 76543 21098", email: "rajesh.k@example.com", source: "Google Ads", product: "Business Loan", assignedTo: "Rahul Verma", status: "Under Process", date: "2026-07-12", amount: 1500000 },
    { id: "LD-8905", name: "Neha Gupta", contact: "+91 98123 45678", email: "neha.g@example.com", source: "Referral", product: "Gold Loan", assignedTo: "Anjali Rao", status: "Approved", date: "2026-07-13", amount: 250000 },
    { id: "LD-8906", name: "Vikram Malhotra", contact: "+91 99112 23344", email: "vikram.m@example.com", source: "Direct", product: "Vehicle Loan", assignedTo: "Rahul Verma", status: "Disbursed", date: "2026-07-14", amount: 800000 }
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
  ]
};

// Initializing local storage database if not present
if (!localStorage.getItem('onkar_db')) {
  localStorage.setItem('onkar_db', JSON.stringify(mockDb));
}

const api = {
  getDb() {
    return JSON.parse(localStorage.getItem('onkar_db'));
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
