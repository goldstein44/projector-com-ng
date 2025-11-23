// frontend/lib/adminAuth.js
export const ADMINS = [
  { username: "goldstein", password: "epignosis" }
];

export function isAdmin(username, password) {
  return ADMINS.some(a => a.username === username && a.password === password);
}