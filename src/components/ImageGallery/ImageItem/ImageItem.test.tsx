import '@testing-library/jest-dom'
import { describe, it, expect } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { ImageItem } from './ImageItem'

describe('ImageItem', () => {
    it('should display loading icon initially and hide it after image loads', async () => {
        // Act
        render(
            <MemoryRouter>
                <ImageItem id="1" author="Author Name" />
            </MemoryRouter>
        )

        // Assert
        expect(screen.getByRole('progressbar')).toBeInTheDocument()

        // Act
        fireEvent.load(screen.getByAltText('Image 1 from Author Name'))

        // Assert
        expect(screen.queryByTestId('SyncIcon')).not.toBeInTheDocument()
    })

    it('should display the correct author name', () => {
        // Act
        render(
            <MemoryRouter>
                <ImageItem id="1" author="Author Name" />
            </MemoryRouter>
        )

        // Assert
        expect(screen.getByText('Author Name')).toBeInTheDocument()
    })

    it('should set the correct ID for the image source and link to the editor', () => {
        // Act
        render(
            <MemoryRouter>
                <ImageItem id="12" author="Author Name" />
            </MemoryRouter>
        )

        // Assert
        expect(screen.getByRole('img')).toHaveAttribute(
            'src',
            'https://picsum.photos/id/12/200'
        )
    })
})
