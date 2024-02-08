import '@testing-library/jest-dom'
import { describe, it, expect, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { BlurControl } from './BlurControl'

// Mocks
const onBlurChange = vi.fn()

describe('BlurControl', () => {
    it('renders correctly with initial blur value', () => {
        // Act
        render(<BlurControl blur={5} onBlurChange={onBlurChange} />)
        const slider = screen.getByRole('slider')

        // Assert
        expect(slider).toBeInTheDocument()
        expect(slider).toHaveValue('5')
    })

    it('should update blur value when slider changes', () => {
        render(<BlurControl blur={5} onBlurChange={onBlurChange} />)

        const slider = screen.getByRole('slider')
        fireEvent.change(slider, { target: { value: 8 } })

        expect(onBlurChange).toHaveBeenCalledWith(8)
    })
})
