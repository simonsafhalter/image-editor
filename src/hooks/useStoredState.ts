import { useState } from 'react'
import { getFromStorage } from '@/utils/storage'

/**
 * Custom hook to manage state based on the storage.
 * Initializes the state with a value from storage if it exists, or uses a default value.
 *
 * @param {string} key - The key under which the state is stored in the storage.
 * @param {unknown} defaultValue - The default value to use if the key does not exist in the storage.
 * @returns {[unknown, Function]} A stateful value, and a function to update it.
 *
 * @example
 * const [value, setValue] = useStoredState('myKey', 'defaultValue');
 */
export function useStoredState(key: string, defaultValue: unknown) {
    const [value, setValue] = useState(getFromStorage(key) || defaultValue)
    return [value, setValue]
}
