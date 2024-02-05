import '@testing-library/jest-dom'
import { describe, it, expect } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { ImageItem } from './ImageItem'

describe('ImageItem', () => {
    it('should display loading icon initially and hide it after image loads', async () => {
        render(
            <MemoryRouter>
                <ImageItem id="1" author="Author Name" />
            </MemoryRouter>
        )

        // Check that the loading icon is initially displayed
        expect(screen.getByTestId('SyncIcon')).toBeInTheDocument()

        // Simulate image load
        fireEvent.load(screen.getByAltText('image'))

        // Check that the loading icon is no longer displayed
        expect(screen.queryByTestId('SyncIcon')).not.toBeInTheDocument()
    })

    it('should display the correct author name', () => {
        render(
            <MemoryRouter>
                <ImageItem id="1" author="Author Name" />
            </MemoryRouter>
        )

        expect(screen.getByText('Author Name')).toBeInTheDocument()
    })

    it('should set the correct ID for the image source and link to the editor', () => {
        const { getByRole } = render(
            <MemoryRouter>
                <ImageItem id="12" author="Author Name" />
            </MemoryRouter>
        )

        const image = getByRole('img')

        expect(image).toHaveAttribute('src', 'https://picsum.photos/id/12/200')
    })
})
