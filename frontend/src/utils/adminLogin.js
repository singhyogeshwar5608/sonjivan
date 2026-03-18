// Utility function to manually set admin login for testing
export const setAdminLogin = () => {
  const adminData = {
    uid: 'RXvPCSMbc7Ul1N2VNjTGQnASTuz2',
    email: 'admin@jbaluminumindustries.in',
    isAdmin: true
  };
  
  localStorage.setItem('adminUser', JSON.stringify(adminData));
  console.log('Admin user set in localStorage:', adminData);
  
  // Reload the page to trigger auth state change
  window.location.reload();
};

// Function to clear admin login
export const clearAdminLogin = () => {
  localStorage.removeItem('adminUser');
  console.log('Admin user cleared from localStorage');
  window.location.reload();
};

// Add to window for easy console access
if (typeof window !== 'undefined') {
  window.setAdminLogin = setAdminLogin;
  window.clearAdminLogin = clearAdminLogin;
}
