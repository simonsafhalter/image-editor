import { describe, it, expect, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { GrayscaleControl } from './GrayscaleControl'

// Mocks
const onGrayscaleChange = vi.fn()

describe('GrayscaleControl', () => {
    it('renders correctly with grayscale off', () => {
        // Act
        render(
            <GrayscaleControl
                grayscale={false}
                onGrayscaleChange={onGrayscaleChange}
            />
        )

        // Assert
        expect(screen.getByText('Grayscale')).toBeInTheDocument()
        expect(screen.getByRole('checkbox')).not.toBeChecked()
    })

    it('renders correctly with grayscale on', () => {
        // Act
        render(
            <GrayscaleControl
                grayscale={true}
                onGrayscaleChange={onGrayscaleChange}
            />
        )

        // Assert
        expect(screen.getByText('Grayscale')).toBeInTheDocument()
        expect(screen.getByRole('checkbox')).toBeChecked()
    })

    it('calls onGrayscaleChange with correct value when toggled', async () => {
        // Act
        render(
            <GrayscaleControl
                grayscale={false}
                onGrayscaleChange={onGrayscaleChange}
            />
        )
        await fireEvent.click(screen.getAllByRole('checkbox')[0])

        // Assert
        expect(onGrayscaleChange).toHaveBeenCalledWith(true)
        expect(onGrayscaleChange).toHaveBeenCalledTimes(1)
    })
})
