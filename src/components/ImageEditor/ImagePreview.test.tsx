import '@testing-library/jest-dom'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import { ImagePreview } from './ImagePreview'

describe('ImagePreview', () => {
    it('renders without crashing', () => {
        render(<ImagePreview imageUrl="test-image-url.jpg" />)
        expect(screen.getByText('IMAGE')).toBeInTheDocument()
    })

    it('shows loading indicator when editing', () => {
        render(<ImagePreview imageUrl="test-image-url.jpg" />)
        expect(screen.getByRole('progressbar')).toBeInTheDocument()
    })

    it('hides loading indicator and shows the image after loading', async () => {
        render(<ImagePreview imageUrl="test-image-url.jpg" />)

        // Since the image loading is simulated with an effect, you need to trigger it and wait
        await act(async () => {
            const image = screen.getByAltText(
                'Image preview'
            ) as HTMLImageElement
            // Manually trigger the onLoad event to simulate image loading
            image.onload?.({} as any)
        })

        expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
        expect(screen.getByAltText('Image preview').src).toContain(
            'test-image-url.jpg'
        )
    })
})
