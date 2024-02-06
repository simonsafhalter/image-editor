import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { downloadImage } from './download'

describe('downloadImage', () => {
    beforeEach(() => {
        global.fetch = vi.fn()
        global.URL.createObjectURL = vi.fn()
        global.URL.revokeObjectURL = vi.fn()
        global.document.body.appendChild = vi.fn()
        global.document.body.removeChild = vi.fn()
        const createElementMock = vi.fn().mockImplementation(() => ({
            click: vi.fn(),
        }))
        global.document.createElement = createElementMock
    })

    afterEach(() => {
        vi.restoreAllMocks()
    })

    it('successfully downloads an image', async () => {
        // Arrange
        const mockImageURL = 'http://example.com/image.jpg'
        const mockImageName = 'testImage.jpg'
        const mockBlob = new Blob(['image data'], { type: 'image/jpeg' })

        fetch.mockResolvedValue({
            ok: true,
            blob: () => Promise.resolve(mockBlob),
        })

        // Act
        const result = await downloadImage(mockImageURL, mockImageName)

        // Assert
        expect(result).toBe(true)
        expect(fetch).toHaveBeenCalledWith(mockImageURL)
        expect(global.URL.createObjectURL).toHaveBeenCalledWith(mockBlob)
        expect(global.document.createElement).toHaveBeenCalledWith('a')
        expect(global.document.body.appendChild).toHaveBeenCalled()
        expect(global.document.body.removeChild).toHaveBeenCalled()
    })

    it('returns false on network error', async () => {
        // Arrange
        const mockImageURL = 'http://example.com/image.jpg'
        const mockImageName = 'testImage.jpg'
        fetch.mockResolvedValue({
            ok: false,
            status: 404,
            statusText: 'Not Found',
        })

        // Act
        const result = await downloadImage(mockImageURL, mockImageName)

        // Assert
        expect(result).toBe(false)
        expect(fetch).toHaveBeenCalledWith(mockImageURL)
    })
})
