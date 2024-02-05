import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { downloadImage } from './download'

describe('downloadImage', () => {
    beforeEach(() => {
        // Mock global fetch
        global.fetch = vi.fn()

        // Mock URL.createObjectURL and URL.revokeObjectURL
        global.URL.createObjectURL = vi.fn()
        global.URL.revokeObjectURL = vi.fn()

        // Mock document.createElement and its methods
        const createElementMock = vi.fn().mockImplementation(() => ({
            click: vi.fn(),
        }))
        global.document.createElement = createElementMock

        // Mock document.body.appendChild and document.body.removeChild
        global.document.body.appendChild = vi.fn()
        global.document.body.removeChild = vi.fn()
    })

    afterEach(() => {
        vi.restoreAllMocks()
    })

    it('successfully downloads an image', async () => {
        const mockImageURL = 'http://example.com/image.jpg'
        const mockImageName = 'testImage.jpg'
        const mockBlob = new Blob(['image data'], { type: 'image/jpeg' })

        // Mock fetch to simulate successful response
        fetch.mockResolvedValue({
            ok: true,
            blob: () => Promise.resolve(mockBlob),
        })

        const result = await downloadImage(mockImageURL, mockImageName)

        expect(result).toBe(true)
        expect(fetch).toHaveBeenCalledWith(mockImageURL)
        expect(global.URL.createObjectURL).toHaveBeenCalledWith(mockBlob)
        expect(global.document.createElement).toHaveBeenCalledWith('a')
        expect(global.document.body.appendChild).toHaveBeenCalled()
        expect(global.document.body.removeChild).toHaveBeenCalled()
    })

    it('returns false on network error', async () => {
        const mockImageURL = 'http://example.com/image.jpg'
        const mockImageName = 'testImage.jpg'

        // Mock fetch to simulate network error
        fetch.mockResolvedValue({
            ok: false,
            status: 404,
            statusText: 'Not Found',
        })

        const result = await downloadImage(mockImageURL, mockImageName)

        expect(result).toBe(false)
        expect(fetch).toHaveBeenCalledWith(mockImageURL)
    })
})
