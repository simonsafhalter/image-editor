import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, act, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ImageDownloader } from './ImageDownloader'

// Mock the downloadImage utility
vi.mock('@/utils/download', () => ({
    downloadImage: vi.fn(() => Promise.resolve()),
}))

describe('ImageDownloader', () => {
    const downloadUrl = 'https://example.com/image.jpg'
    const imageName = 'test-image.jpg'

    beforeEach(() => {
        // Clear all mocks before each test
        vi.clearAllMocks()
    })

    it('renders the download button', () => {
        render(
            <ImageDownloader downloadUrl={downloadUrl} imageName={imageName} />
        )
        expect(
            screen.getByRole('button', { name: /download image/i })
        ).toBeInTheDocument()
    })

    it('shows loading indicator when the download is in progress', async () => {
        render(
            <ImageDownloader downloadUrl={downloadUrl} imageName={imageName} />
        )
        const button = screen.getByRole('button', { name: /download image/i })

        await fireEvent.click(button)

        expect(
            screen.queryByRole('button', { name: /download image/i })
        ).not.toBeInTheDocument()
        expect(screen.getByRole('progressbar')).toBeInTheDocument()
    })

    it('hides the loading indicator after the download completes', async () => {
        render(
            <ImageDownloader downloadUrl={downloadUrl} imageName={imageName} />
        )
        const button = screen.getByRole('button', { name: /download image/i })

        // Wrap in act for the "downloadImage" mock promise to resolve
        await act(async () => {
            await fireEvent.click(button)
        })

        expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
        expect(
            screen.getByRole('button', { name: /download image/i })
        ).toBeInTheDocument()
    })
})
