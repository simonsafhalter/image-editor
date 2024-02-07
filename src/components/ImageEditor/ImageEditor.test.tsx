import { describe, it, expect, vi } from 'vitest'
import { ImageEditor } from './ImageEditor' // Adjust the import path
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

describe('ImageEditor', () => {
    beforeEach(() => {
        vi.mock('./ImagePreview/ImagePreview', () => ({
            ImagePreview: () => <div data-testid="image-preview"></div>,
        }))
        vi.mock('./ControlPanel/ControlPanel', () => ({
            ControlPanel: () => <div data-testid="control-panel"></div>,
        }))
        vi.mock('./ImageDownloadButton/ImageDownloadButton', () => ({
            ImageDownloadButton: () => (
                <div data-testid="image-downloader"></div>
            ),
        }))
    })
    afterEach(() => {
        vi.clearAllMocks()
    })

    it('renders ImagePreview, ControlPanel, and ImageDownloadButton', () => {
        render(<ImageEditor imageId="123" />)
        expect(screen.getByTestId('image-preview')).toBeInTheDocument()
        expect(screen.getByTestId('control-panel')).toBeInTheDocument()
        expect(screen.getByTestId('image-downloader')).toBeInTheDocument()
    })
})
