import '@testing-library/jest-dom'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import * as ReactRouter from 'react-router-dom'
import * as getImageList from '@/api/getImageList'
import { ImageGalleryPage } from './ImageGalleryPage'

// Mocks
vi.mock('@/components/ImageGallery/ImageGallery', () => ({
    ImageGallery: () => <div>Mocked Image Gallery</div>,
}))

// Setup and cleanup
beforeEach(() => {
    // Mock useSearchParams
    vi.spyOn(ReactRouter, 'useSearchParams').mockReturnValue([
        new URLSearchParams('page=1'),
        vi.fn(),
    ])
})

afterEach(() => {
    vi.restoreAllMocks()
})

describe('ImageGalleryPage', () => {
    it('should render the loading state correctly', () => {
        vi.spyOn(getImageList, 'useImageList').mockReturnValue({
            data: null,
            error: null,
            isLoading: true,
        })

        render(
            <MemoryRouter>
                <ImageGalleryPage />
            </MemoryRouter>
        )

        expect(screen.getByRole('progressbar')).toBeInTheDocument()
    })

    it('should render the error state correctly', () => {
        vi.spyOn(getImageList, 'useImageList').mockReturnValue({
            data: null,
            error: { message: 'Failed to fetch' },
            isLoading: false,
        })

        render(
            <MemoryRouter>
                <ImageGalleryPage />
            </MemoryRouter>
        )

        expect(
            screen.getByText('An error occurred: Failed to fetch')
        ).toBeInTheDocument()
    })

    it('should render no images available state correctly', () => {
        vi.spyOn(getImageList, 'useImageList').mockReturnValue({
            data: { images: [] },
            error: null,
            isLoading: false,
        })

        render(
            <MemoryRouter>
                <ImageGalleryPage />
            </MemoryRouter>
        )

        expect(screen.getByText('No images available.')).toBeInTheDocument()
    })

    it('should render ImageGallery with data correctly', () => {
        vi.spyOn(getImageList, 'useImageList').mockReturnValue({
            data: { images: [{ id: '1', author: 'Author' }] },
            error: null,
            isLoading: false,
        })

        render(
            <MemoryRouter>
                <ImageGalleryPage />
            </MemoryRouter>
        )

        expect(screen.getByText('Mocked Image Gallery')).toBeInTheDocument()
    })
})
