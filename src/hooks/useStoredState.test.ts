import { renderHook } from '@testing-library/react'
import { describe, it, expect, vi, afterEach } from 'vitest'
import * as storage from '@/utils/storage'
import { useStoredState } from './useStoredState'

describe('useStoredState', () => {
    afterEach(() => {
        vi.restoreAllMocks()
    })

    it('should return the stored value from the storage', () => {
        vi.spyOn(storage, 'getFromStorage').mockReturnValue({
            storedValue: 123,
        })

        const { result } = renderHook(() =>
            useStoredState('key', 'defaultValue')
        )

        expect(result.current[0]).toStrictEqual({
            storedValue: 123,
        })
    })

    it('should return the default value if nothing is stored under the given key', () => {
        vi.spyOn(storage, 'getFromStorage')

        const { result } = renderHook(() =>
            useStoredState('key', 'defaultValue')
        )

        expect(result.current[0]).toBe('defaultValue')
    })
})
