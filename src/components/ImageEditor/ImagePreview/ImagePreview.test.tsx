import '@testing-library/jest-dom'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import { ImagePreview } from './ImagePreview'

describe('ImagePreview', () => {
    it('renders without crashing', () => {
        // Act
        render(<ImagePreview imageUrl="test-image-url.jpg" />)

        // Assert
        expect(screen.getByText('IMAGE')).toBeInTheDocument()
    })

    it('shows loading indicator when editing', () => {
        // Act
        render(<ImagePreview imageUrl="test-image-url.jpg" />)

        // Assert
        expect(screen.getByRole('progressbar')).toBeInTheDocument()
    })

    it('hides loading indicator and shows the image after loading', async () => {
        // Act
        render(<ImagePreview imageUrl="test-image-url.jpg" />)

        await act(async () => {
            const image = screen.getByAltText(
                'Image preview'
            ) as HTMLImageElement
            // Manually trigger the onLoad event to simulate image loading
            image.onload?.({} as any)
        })

        // Assert
        expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
        expect(screen.getByAltText('Image preview').src).toContain(
            'test-image-url.jpg'
        )
    })
})
