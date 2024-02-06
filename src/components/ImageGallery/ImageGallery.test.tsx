import { afterEach, describe, expect, it, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import * as ReactRouter from 'react-router-dom'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { ImageGallery } from './ImageGallery'

// Mocks
vi.mock('./ImageItem/ImageItem', () => ({
    ImageItem: ({ id, author }: { id: string; author: string }) => (
        <div data-testid="mock-image-item">{`ImageItem: ${id} ${author}`}</div>
    ),
}))

vi.mock('./Pagination/Pagination', () => ({
    Pagination: ({ onPageChange }: { onPageChange: (url: string) => void }) => (
        <button
            onClick={() => onPageChange('http://example.com/gallery?page=3')}
            data-testid="mock-pagination"
        >
            Next Page
        </button>
    ),
}))

describe('ImageGallery', () => {
    afterEach(() => {
        vi.restoreAllMocks()
    })

    it('renders the images correctly', () => {
        // Arrange
        const images = [
            { id: '1', author: 'Author 1' },
            { id: '2', author: 'Author 2' },
        ]
        const links = {
            next: 'url',
        }

        render(
            <MemoryRouter>
                <ImageGallery images={images} links={links} />
            </MemoryRouter>
        )

        const imageItems = screen.getAllByTestId('mock-image-item')

        expect(imageItems).toHaveLength(images.length)
        expect(screen.getByText('ImageItem: 1 Author 1')).toBeInTheDocument()
        expect(screen.getByText('ImageItem: 2 Author 2')).toBeInTheDocument()
    })

    it('triggers handlePageChange and sets the URL params correctly', async () => {
        // Arrange
        const initialPage = '2'
        const setSearchParams = vi.fn()

        vi.spyOn(ReactRouter, 'useSearchParams').mockReturnValue([
            new URLSearchParams({ page: initialPage }),
            setSearchParams,
        ])

        const images = [{ id: '1', author: 'Author 1' }]
        const links = {
            next: 'http://example.com/gallery?page=3',
            prev: 'http://example.com/gallery?page=1',
        }

        // Act
        render(
            <MemoryRouter initialEntries={[`/gallery?page=${initialPage}`]}>
                <ImageGallery images={images} links={links} />
            </MemoryRouter>
        )
        const nextPageButton = screen.getByTestId('mock-pagination')
        nextPageButton.click()

        // Assert
        expect(setSearchParams).toHaveBeenCalledWith(
            expect.objectContaining({ page: '3' })
        )
    })
})
