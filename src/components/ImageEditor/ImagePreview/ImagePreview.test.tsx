import '@testing-library/jest-dom'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ImagePreview } from './ImagePreview'

describe('ImagePreview', () => {
    it('shows loading indicator when editing', () => {
        // Act
        render(<ImagePreview imageUrl="test-image-url.jpg" />)

        // Assert
        expect(screen.getByRole('progressbar')).toBeInTheDocument()
    })

    it('hides loading indicator and shows the image after loading', async () => {
        // Act
        render(<ImagePreview imageUrl="test-image-url.jpg" />)

        screen.getByAltText('Image preview').onload?.({} as Event)

        // Assert
        expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
        expect(screen.getByAltText('Image preview').src).toContain(
            'test-image-url.jpg'
        )
    })
})
