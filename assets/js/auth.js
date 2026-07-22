// Hardcoded role redirection paths
const ROLE_PATHS = {
  'Admin': 'admin/dashboard.html',
  'BranchManager': 'branch-manager/index.html',
  'TeamLeader': 'TeamLeader/dashboard.html',
  'Employee': 'employee/index.html',
  'Agent': 'Agent/dashboard.html',
  'Vendor': 'Vendor/dashboard.html',
  'Customer': 'customer/index.html'
};

document.addEventListener('DOMContentLoaded', () => {
  // Login Form Handler
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value.trim();
      const roleSelect = document.getElementById('loginRole');
      const selectedRole = roleSelect ? roleSelect.value : 'Admin';
      
      let isValid = true;
      
      if (!email) {
        showFieldError('email', 'Email or Username is required');
        isValid = false;
      } else {
        clearFieldError('email');
      }
      
      if (!password) {
        showFieldError('password', 'Password is required');
        isValid = false;
      } else {
        clearFieldError('password');
      }
      
      if (isValid) {
        const emailLower = email.toLowerCase();
        
        // Define default pre-configured users
        const defaultUsers = {
          'admin@onkarfinance.com': { password: 'password123', role: 'admin', redirect: 'admin/dashboard.html' },
          'admin@onkar.com': { password: 'password123', role: 'admin', redirect: 'admin/dashboard.html' },
          'teamleader@onkarfinance.com': { password: 'password123', role: 'teamleader', redirect: 'TeamLeader/dashboard.html' },
          'teamleader@onkar.com': { password: 'password123', role: 'teamleader', redirect: 'TeamLeader/dashboard.html' },
          'tl@onkarfinance.com': { password: 'password123', role: 'teamleader', redirect: 'TeamLeader/dashboard.html' },
          'tl@onkar.com': { password: 'password123', role: 'teamleader', redirect: 'TeamLeader/dashboard.html' },
          'manager@onkarfinance.com': { password: 'password123', role: 'manager', redirect: 'branch-manager/index.html' },
          'manager@onkar.com': { password: 'password123', role: 'manager', redirect: 'branch-manager/index.html' },
          'employee@onkarfinance.com': { password: 'password123', role: 'employee', redirect: 'employee/index.html' },
          'employee@onkar.com': { password: 'password123', role: 'employee', redirect: 'employee/index.html' },
          'customer@onkarfinance.com': { password: 'password123', role: 'customer', redirect: 'customer/index.html' },
          'customer@onkar.com': { password: 'password123', role: 'customer', redirect: 'customer/index.html' },
          'agent@onkarfinance.com': { password: 'password123', role: 'agent', redirect: 'Agent/dashboard.html' },
          'agent@onkar.com': { password: 'password123', role: 'agent', redirect: 'Agent/dashboard.html' },
          'vendor@onkarfinance.com': { password: 'password123', role: 'vendor', redirect: 'Vendor/dashboard.html' },
          'vendor@onkar.com': { password: 'password123', role: 'vendor', redirect: 'Vendor/dashboard.html' }
        };

        let user = defaultUsers[emailLower];
        
        // If not a default user, check localStorage registered users
        if (!user) {
          const registeredUsers = JSON.parse(localStorage.getItem('onkar_users') || '[]');
          const regUser = registeredUsers.find(u => u.email === emailLower);
          if (regUser) {
            user = {
              password: regUser.password || 'password123',
              role: regUser.role || 'admin',
              redirect: (regUser.role === 'manager') ? 'branch-manager/index.html' : 
                        (regUser.role === 'employee') ? 'employee/index.html' :
                        (regUser.role === 'customer') ? 'customer/index.html' :
                        (regUser.role === 'teamleader') ? 'TeamLeader/dashboard.html' :
                        (regUser.role === 'agent') ? 'Agent/dashboard.html' :
                        (regUser.role === 'vendor') ? 'Vendor/dashboard.html' : 'admin/dashboard.html'
            };
          }
        }

        // Fallback: if user is not in database, authenticate via the dropdown selection
        if (!user) {
          const roleMapping = {
            'Admin': 'admin',
            'BranchManager': 'manager',
            'TeamLeader': 'teamleader',
            'Employee': 'employee',
            'Agent': 'agent',
            'Vendor': 'vendor',
            'Customer': 'customer'
          };
          const mappedRole = roleMapping[selectedRole] || 'admin';
          user = {
            password: password, // Accept whatever password was typed
            role: mappedRole,
            redirect: ROLE_PATHS[selectedRole] || 'admin/dashboard.html'
          };
        }

        if (user && (user.password === password || password === 'password123' || password === 'admin123')) {
          sessionStorage.setItem('onkar_session', JSON.stringify({ username: email, role: user.role }));
          
          // Also set local storage for compatibility
          localStorage.setItem('onkar_user', JSON.stringify({
            name: email.split('@')[0] || 'Logged In User',
            email: email,
            role: selectedRole,
            isLoggedIn: true,
            loginTime: new Date().toISOString()
          }));

          showToast(`Login successful as ${selectedRole || user.role}! Redirecting...`, 'success');
          setTimeout(() => {
            window.location.href = user.redirect;
          }, 1200);
        } else {
          showToast('Invalid username or password!', 'danger');
          showFieldError('email', 'Invalid credentials');
          showFieldError('password', 'Invalid credentials');
        }
      }
    });
  }
  
  // Password Visibility Toggle
  const togglePassBtns = document.querySelectorAll('.password-toggle-icon');
  togglePassBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.previousElementSibling;
      if (input.type === 'password') {
        input.type = 'text';
        btn.classList.replace('lucide-eye', 'lucide-eye-off');
      } else {
        input.type = 'password';
        btn.classList.replace('lucide-eye-off', 'lucide-eye');
      }
      if (window.lucide) lucide.createIcons();
    });
  });

  // Password Strength Tracker
  const signupPassword = document.getElementById('signupPassword');
  if (signupPassword) {
    signupPassword.addEventListener('input', () => {
      const password = signupPassword.value;
      const strength = checkPasswordStrength(password);
      updateStrengthUI(strength);
    });
  }

  // Signup Form Handler (All roles except Admin)
  const signupForm = document.getElementById('signupForm');
  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('fullname').value.trim();
      const email = document.getElementById('signupEmail').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const role = document.getElementById('roleSelect').value;
      const password = document.getElementById('signupPassword').value;
      const confirmPass = document.getElementById('confirmPassword').value;
      const terms = document.getElementById('terms').checked;
      
      let isValid = true;
      
      if (!name) { showFieldError('fullname', 'Full Name is required'); isValid = false; } else { clearFieldError('fullname'); }
      if (!email || !/\S+@\S+\.\S+/.test(email)) { showFieldError('signupEmail', 'Valid email is required'); isValid = false; } else { clearFieldError('signupEmail'); }
      if (!phone || phone.length < 10) { showFieldError('phone', 'Valid phone number is required'); isValid = false; } else { clearFieldError('phone'); }
      if (password.length < 6) { showFieldError('signupPassword', 'Password must be at least 6 characters'); isValid = false; } else { clearFieldError('signupPassword'); }
      if (password !== confirmPass) { showFieldError('confirmPassword', 'Passwords do not match'); isValid = false; } else { clearFieldError('confirmPassword'); }
      if (!terms) { showToast('You must agree to the Terms & Conditions', 'warning'); isValid = false; }
      
      if (isValid) {
        // Save new user to localStorage database
        const users = JSON.parse(localStorage.getItem('onkar_users') || '[]');
        const newUser = { 
          name: name,
          email: email.toLowerCase(), 
          password: password, 
          phone: phone,
          role: role, 
          isLoggedIn: true 
        };
        users.push(newUser);
        localStorage.setItem('onkar_users', JSON.stringify(users));
        localStorage.setItem('onkar_user', JSON.stringify(newUser));

        // Set session storage session
        const roleMapping = {
          'Admin': 'admin',
          'BranchManager': 'manager',
          'TeamLeader': 'teamleader',
          'Employee': 'employee',
          'Agent': 'agent',
          'Vendor': 'vendor',
          'Customer': 'customer'
        };
        const mappedRole = roleMapping[role] || role.toLowerCase();
        sessionStorage.setItem('onkar_session', JSON.stringify({ username: email, role: mappedRole }));

        showToast(`Account created as ${role}! Redirecting...`, 'success');
        setTimeout(() => {
          const targetUrl = ROLE_PATHS[role] || 'index.html';
          window.location.href = targetUrl;
        }, 1500);
      }
    });
  }

  // Forgot password flow
  const forgotForm = document.getElementById('forgotForm');
  if (forgotForm) {
    forgotForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('forgotEmail').value.trim();
      if (!email || !/\S+@\S+\.\S+/.test(email)) {
        showFieldError('forgotEmail', 'Please enter a valid email address');
      } else {
        clearFieldError('forgotEmail');
        showToast('Password reset link sent to your email!', 'success');
        setTimeout(() => {
          window.location.href = 'index.html';
        }, 2000);
      }
    });
  }
});

// Helper validation functions
function showFieldError(fieldId, message) {
  const group = document.getElementById(fieldId).closest('.form-group');
  if (group) {
    group.classList.add('has-error');
    const errorEl = group.querySelector('.form-error');
    if (errorEl) errorEl.textContent = message;
  }
}

function clearFieldError(fieldId) {
  const group = document.getElementById(fieldId).closest('.form-group');
  if (group) {
    group.classList.remove('has-error');
  }
}

function checkPasswordStrength(password) {
  let score = 0;
  if (!password) return score;
  if (password.length >= 6) score++;
  if (password.length >= 10) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score; // returns 0 to 5
}

function updateStrengthUI(score) {
  const bars = document.querySelectorAll('.strength-bar');
  const text = document.querySelector('.strength-text');
  if (!text) return;
  
  bars.forEach((bar, index) => {
    bar.style.backgroundColor = 'var(--color-border)';
  });
  
  if (score === 0) {
    text.textContent = 'Too Short';
    text.style.color = 'var(--color-text-muted)';
  } else if (score <= 2) {
    text.textContent = 'Weak';
    text.style.color = 'var(--color-danger)';
    bars[0].style.backgroundColor = 'var(--color-danger)';
  } else if (score <= 4) {
    text.textContent = 'Medium';
    text.style.color = 'var(--color-warning)';
    bars[0].style.backgroundColor = 'var(--color-warning)';
    bars[1].style.backgroundColor = 'var(--color-warning)';
    bars[2].style.backgroundColor = 'var(--color-warning)';
  } else {
    text.textContent = 'Strong';
    text.style.color = 'var(--color-success)';
    bars.forEach(bar => bar.style.backgroundColor = 'var(--color-success)');
  }
}

function initOtpInputs() {
  const inputs = document.querySelectorAll('.otp-input');
  inputs.forEach((input, index) => {
    input.addEventListener('keyup', (e) => {
      if (input.value.length === 1 && index < inputs.length - 1) {
        inputs[index + 1].focus();
      }
      if (e.key === 'Backspace' && index > 0 && input.value.length === 0) {
        inputs[index - 1].focus();
      }
    });
  });
}

function verifyOtp() {
  const inputs = document.querySelectorAll('.otp-input');
  let otp = '';
  inputs.forEach(input => otp += input.value);
  
  if (otp.length === 4) {
    showToast('Account created successfully!', 'success');
    closeModal('otpModal');
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1500);
  } else {
    showToast('Please enter a 4-digit code', 'danger');
  }
}
