import { v4 as uuidv4 } from "uuid";

export function generateId() {
  return uuidv4();
}

/**
 * Returns true if the given email is valid, false otherwise.
 *
 * The email is considered valid if it matches the following regex:
 * /^[^\s@]+@[^\s@]+\.[^\s@]+$/
 *
 * @param {string} email
 * @returns {boolean}
 */
export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// password should consist of one uppercase letter, one lowercase letter, and at least total of 8 characters
export function isValidPassword(password) {
  return /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{8,}$/.test(password);
}
