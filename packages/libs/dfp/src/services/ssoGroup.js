/* global fetch localStorage */

const ITEM_NOT_FOUND = { reason: 'item not found', };

/**
 * async functions that fetchs the matching SSO-group-key for a logged-in user
 * @param {string} ssoUserId - the sso id of the logged-in user
 * @return {string} - SSOGroupKey of the given user
 * or null if unable to retrieve
 * @throws {object} ITEM_NOT_FOUND - check aginst this value to distinguish
 * between general error and 'item not found' case.
 */
const fetchSsoGroupKey = async ssoUserId => {
  // wait for header to fetch with body stream
  const res = await fetch(`/ssoGroupKey?value=${ssoUserId}`, {
    cache: 'no-cache',
  });
  // wait for body to fetch (and convert to json)
  const fullRes = await res.json();
  const result = fullRes.result;
  if (result === 'item not found') {
    // throw ITEM_NOT_FOUND to avoid caching this result (any exeption would do)
    throw ITEM_NOT_FOUND;
  }
  return result;
};

/**
 * Generates localStorage key from user-id
 * @param {string} ssoUserId - the sso id of the logged-in user
 * @return {string} - generated key
 */
const generateStorageKey = ssoUserId => `_ssoUser[${ssoUserId}]_`;

/**
 * retrieves ssoGroupKey from localStorage for a given user
 * @param {string} ssoUserId - the sso id of the logged-in user
 * @return {string} - ssoGroupKey of the user
 * or null if none exists
 */
export const retrieveSsoGroupKey = ssoUserId =>
  localStorage.getItem(generateStorageKey(ssoUserId));

/**
 * fetchs ssoGroupKey from the server and stores it in localStorage
 * @param {string} ssoUserId - the sso id of the logged-in user
 */
export const storeSsoGroupKey = async ssoUserId => {
  try {
    const ssoGroupKey = await fetchSsoGroupKey(ssoUserId);
    localStorage.setItem(generateStorageKey(ssoUserId), ssoGroupKey);
  }
  catch (err) {
    if (err !== ITEM_NOT_FOUND) {
      console.error('Error fetching SSOGroupKey.\n', err);
    }
  }
};
