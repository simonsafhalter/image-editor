import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

import { getFromStorage, setInStorage } from './storage'

describe('Utils: storage', () => {
    beforeEach(() => {
        const storageMock = {
            getItem: vi.fn(),
            setItem: vi.fn(),
        }
        vi.spyOn(storageMock, 'getItem')
        vi.spyOn(storageMock, 'setItem')

        // Replace window's localStorage with the mock
        Object.defineProperty(window, 'sessionStorage', {
            value: storageMock,
        })
    })

    afterEach(() => {
        vi.restoreAllMocks()
    })

    describe('setInStorage', () => {
        it('stores a value correctly', () => {
            setInStorage('testKey', { a: 1 })

            expect(window.sessionStorage.setItem).toHaveBeenCalledWith(
                'testKey',
                JSON.stringify({ a: 1 })
            )
        })
    })

    describe('getFromStorage', () => {
        it('retrieves a stored value correctly', () => {
            getFromStorage('testKey')

            expect(window.sessionStorage.getItem).toHaveBeenCalledWith(
                'testKey'
            )
        })
    })
})
