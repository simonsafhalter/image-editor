import '@testing-library/jest-dom'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { SizeControl } from './SizeControl'

// Mocks
const testLabel = 'Size'
const initialValue = 100
const onSizeChange = vi.fn()

describe('SizeControl', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('renders with correct label and value', () => {
        // Act
        render(
            <SizeControl
                label={testLabel}
                value={initialValue}
                onSizeChange={onSizeChange}
            />
        )

        // Assert
        expect(screen.getByLabelText(testLabel)).toBeInTheDocument()
        expect(screen.getByLabelText(testLabel)).toHaveValue(initialValue)
    })

    it('calls onSizeChange with the new value when changed', () => {
        // Act
        render(
            <SizeControl
                label={testLabel}
                value={initialValue}
                onSizeChange={onSizeChange}
            />
        )
        const input = screen.getByLabelText(testLabel)
        fireEvent.change(input, { target: { value: 300 } })

        // Assert
        expect(onSizeChange).toHaveBeenCalledWith(300)
    })

    it('corrects the value to the maximum size (5000) if the entered value exceeds the maximum', () => {
        // Act
        render(
            <SizeControl
                label={testLabel}
                value={initialValue}
                onSizeChange={onSizeChange}
            />
        )
        const input = screen.getByLabelText(testLabel)
        fireEvent.change(input, { target: { value: 5001 } }) // Enter a value greater than MAX_SIZE (5000)

        // Assert
        expect(onSizeChange).toHaveBeenCalledWith(5000) // Expect the callback to be called with MAX_SIZE
    })
})
