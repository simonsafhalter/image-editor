import '@testing-library/jest-dom'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BlurControl } from './BlurControl'

// Mocks
const blurValue = 5
const onBlurChange = vi.fn()

describe('BlurControl', () => {
    it('renders correctly with initial blur value', () => {
        // Act
        render(<BlurControl blur={blurValue} onBlurChange={onBlurChange} />)
        const slider = screen.getByRole('slider')

        // Assert
        expect(slider).toBeInTheDocument()
        expect(slider).toHaveValue(String(blurValue))
    })
})
