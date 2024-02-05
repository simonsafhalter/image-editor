import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useImageList } from './getImageList'

vi.mock('@/utils/parse', () => ({
    parseHeaderLinks: vi
        .fn()
        .mockReturnValue({ next: 'nextPageUrl', prev: 'prevPageUrl' }),
}))

vi.stubGlobal(
    'fetch',
    vi.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve([{ id: 1 }]),
            ok: true,
        })
    )
)

describe('useImageList', () => {
    it('uses useQuery to fetch images and parse headers', async () => {
        const queryClient = new QueryClient()
        const wrapper = ({ children }) => (
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        )

        const { result } = renderHook(() => useImageList('1'), { wrapper })

        await waitFor(() => expect(result.current.isSuccess).toBe(true))

        expect(result.current.data).toEqual({
            images: [{ id: 1 }],
            links: { next: 'nextPageUrl', prev: 'prevPageUrl' },
        })
    })
})
