// Constants
// Switch between 'sessionStorage' or 'localStorage' if needed.
const STORAGE_TYPE = 'sessionStorage'
// const STORAGE_TYPE = 'localStorage'

/**
 * Retrieves a value from the specified storage.
 * Parses the JSON stored value before returning it.
 *
 * @param {string} key - The key under which the value is stored.
 * @returns {any|null} The parsed value from storage if available, otherwise null.
 */
export const getFromStorage = (key: string) => {
    const value = window[STORAGE_TYPE].getItem(key)
    return value ? JSON.parse(value) : null
}

/**
 * Saves a value to the specified storage.
 * Stringifies the value before storing it.
 *
 * @param {string} key - The key under which to store the value.
 * @param {any} value - The value to be stored.
 */
export const setInStorage = (key: string, value: unknown) => {
    const stringValue = JSON.stringify(value)
    window[STORAGE_TYPE].setItem(key, stringValue)
}
