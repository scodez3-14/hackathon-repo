
export function validateAuthorityInput({ username, password }) {
  if (!username || !password) {
    return 'Username and password are required.';
  }
  return null;
}
