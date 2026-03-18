import { useAuth } from '../context/AuthContext';

const AuthDebug = () => {
  const { currentUser, isAdmin, loading } = useAuth();

  return (
    <div className="fixed top-4 right-4 bg-white border border-gray-300 rounded-lg p-4 shadow-lg z-50 max-w-sm">
      <h3 className="font-bold text-sm mb-2">Auth Debug</h3>
      <div className="text-xs space-y-1">
        <div><strong>Loading:</strong> {loading ? 'Yes' : 'No'}</div>
        <div><strong>Current User:</strong> {currentUser ? currentUser.email : 'None'}</div>
        <div><strong>Is Admin:</strong> {isAdmin ? 'Yes' : 'No'}</div>
        <div><strong>User UID:</strong> {currentUser?.uid || 'None'}</div>
        <div><strong>LocalStorage Admin:</strong> {localStorage.getItem('adminUser') ? 'Yes' : 'No'}</div>
      </div>
    </div>
  );
};

export default AuthDebug;
