import '@testing-library/jest-dom'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BlurControl } from './BlurControl'

describe('BlurControl', () => {
    const blurValue = 5
    const onBlurChange = vi.fn()

    it('renders correctly with initial blur value', () => {
        render(<BlurControl blur={blurValue} onBlurChange={onBlurChange} />)

        const slider = screen.getByRole('slider', { name: 'Blur' })
        expect(slider).toBeInTheDocument()
        expect(slider).toHaveValue(String(blurValue))
    })
})
