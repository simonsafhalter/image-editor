import { describe, it, expect, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { GrayscaleControl } from './GrayscaleControl'

describe('GrayscaleControl', () => {
    it('renders correctly with grayscale off', () => {
        const onGrayscaleChange = vi.fn()
        render(
            <GrayscaleControl
                grayscale={false}
                onGrayscaleChange={onGrayscaleChange}
            />
        )

        expect(screen.getByText('Grayscale')).toBeInTheDocument()
        expect(screen.getByRole('checkbox')).not.toBeChecked()
    })

    it('renders correctly with grayscale on', () => {
        const onGrayscaleChange = vi.fn()
        render(
            <GrayscaleControl
                grayscale={true}
                onGrayscaleChange={onGrayscaleChange}
            />
        )

        expect(screen.getByText('Grayscale')).toBeInTheDocument()
        expect(screen.getByRole('checkbox')).toBeChecked()
    })

    it('calls onGrayscaleChange with correct value when toggled', async () => {
        const onGrayscaleChange = vi.fn()
        render(
            <GrayscaleControl
                grayscale={false}
                onGrayscaleChange={onGrayscaleChange}
            />
        )

        await fireEvent.click(screen.getAllByRole('checkbox')[0])

        expect(onGrayscaleChange).toHaveBeenCalledWith(true)
        expect(onGrayscaleChange).toHaveBeenCalledTimes(1)
    })
})
