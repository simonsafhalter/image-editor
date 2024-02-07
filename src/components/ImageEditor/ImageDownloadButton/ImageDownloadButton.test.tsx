import '@testing-library/jest-dom'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, act, fireEvent } from '@testing-library/react'
import { ImageDownloadButton } from './ImageDownloadButton'

// Mocks
const downloadUrl = 'https://example.com/image.jpg'
const imageName = 'test-image.jpg'

vi.mock('@/utils/download', () => ({
    downloadImage: vi.fn(() => Promise.resolve()),
}))

describe('ImageDownloadButton', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('renders the download button', () => {
        // Act
        render(
            <ImageDownloadButton
                downloadUrl={downloadUrl}
                imageName={imageName}
            />
        )

        // Assert
        expect(
            screen.getByRole('button', { name: /download image/i })
        ).toBeInTheDocument()
    })

    it('shows loading indicator when the download is in progress', async () => {
        // Act
        render(
            <ImageDownloadButton
                downloadUrl={downloadUrl}
                imageName={imageName}
            />
        )
        const button = screen.getByRole('button', { name: /download image/i })
        await fireEvent.click(button)

        // Assert
        expect(
            screen.queryByRole('button', { name: /download image/i })
        ).not.toBeInTheDocument()
        expect(screen.getByRole('progressbar')).toBeInTheDocument()
    })

    it('hides the loading indicator after the download completes', async () => {
        // Act
        render(
            <ImageDownloadButton
                downloadUrl={downloadUrl}
                imageName={imageName}
            />
        )
        const button = screen.getByRole('button', { name: /download image/i })
        // Wrap in act for the "downloadImage" mock promise to resolve
        await act(async () => {
            await fireEvent.click(button)
        })

        // Assert
        expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
        expect(
            screen.getByRole('button', { name: /download image/i })
        ).toBeInTheDocument()
    })
})
