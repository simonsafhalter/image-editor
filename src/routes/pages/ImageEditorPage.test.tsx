import '@testing-library/jest-dom'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ImageEditorPage } from './ImageEditorPage'
import * as ReactRouter from 'react-router-dom'
import * as getImageDetails from '@/api/getImageDetails'

describe('ImageEditorPage', () => {
    beforeEach(() => {
        vi.mock('@/components/ImageEditor/ImageEditor', () => ({
            ImageEditor: () => <div>Mocked Image Editor</div>,
        }))

        vi.spyOn(ReactRouter, 'useSearchParams').mockReturnValue([
            new URLSearchParams('imageId=123'),
            vi.fn(),
        ])
    })

    afterEach(() => {
        vi.restoreAllMocks()
    })

    it('renders loading indicator while fetching image details', () => {
        // Arrange
        vi.spyOn(getImageDetails, 'useImageDetails').mockReturnValueOnce({
            data: null,
            error: null,
            isLoading: true,
        })

        // Act
        render(
            <MemoryRouter>
                <ImageEditorPage />
            </MemoryRouter>
        )

        // Assert
        expect(screen.getByRole('progressbar')).toBeInTheDocument()
    })

    it('renders error message and link when image details cannot be fetched', () => {
        // Arrange
        vi.spyOn(getImageDetails, 'useImageDetails').mockReturnValueOnce({
            data: null,
            error: new Error('Fetch error'),
            isLoading: false,
        })

        // Act
        render(
            <MemoryRouter>
                <ImageEditorPage />
            </MemoryRouter>
        )

        // Assert
        expect(screen.getByRole('link')).toHaveTextContent(
            "Image doesn't exist, go to gallery and select a new one"
        )
        expect(screen.getByRole('link')).toHaveAttribute('href', '/')
    })

    it('should render the ImageEditor component when image details are successfully fetched', () => {
        // Arrange
        vi.spyOn(getImageDetails, 'useImageDetails').mockReturnValueOnce({
            data: { id: '123', author: 'Author Name' },
            error: null,
            isLoading: false,
        })

        // Act
        render(
            <MemoryRouter>
                <ImageEditorPage />
            </MemoryRouter>
        )

        // Assert
        expect(screen.getByText('Mocked Image Editor')).toBeInTheDocument()
    })
})
