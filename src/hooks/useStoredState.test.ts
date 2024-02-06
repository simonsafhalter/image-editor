import { renderHook } from '@testing-library/react'
import { describe, it, expect, vi, afterEach } from 'vitest'
import * as storage from '@/utils/storage'
import { useStoredState } from './useStoredState'

// Mocks
const storegeSpy = vi.spyOn(storage, 'getFromStorage')

describe('useStoredState', () => {
    afterEach(() => {
        vi.restoreAllMocks()
    })

    it('should return the stored value from the storage', () => {
        // Arrange
        storegeSpy.mockReturnValue({
            storedValue: 123,
        })

        // Act
        const { result } = renderHook(() =>
            useStoredState('key', 'defaultValue')
        )

        // Assert
        expect(result.current[0]).toStrictEqual({
            storedValue: 123,
        })
    })

    it('should return the default value if nothing is stored under the given key', () => {
        // Act
        const { result } = renderHook(() =>
            useStoredState('key', 'defaultValue')
        )

        // Assert
        expect(result.current[0]).toBe('defaultValue')
    })
})
