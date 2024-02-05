import { describe, it, expect, vi } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useImageDetails } from './getImageDetails'

vi.stubGlobal(
    'fetch',
    vi.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve({ author: 'Author' }),
            ok: true,
        })
    )
)

describe('useImageDetails', () => {
    it('uses useQuery to fetch images', async () => {
        const queryClient = new QueryClient()
        const wrapper = ({ children }) => (
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        )

        const { result } = renderHook(() => useImageDetails('1'), { wrapper })

        await waitFor(() => expect(result.current.isSuccess).toBe(true))

        expect(result.current.data).toEqual({
            author: 'Author',
        })
    })
})
