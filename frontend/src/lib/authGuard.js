export function requireAuth(redirectPath = '/ability-test') {
  if (typeof window === 'undefined') return false;
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = `/login?redirect=${encodeURIComponent(redirectPath)}`;
    return false;
  }
  return true;
}
