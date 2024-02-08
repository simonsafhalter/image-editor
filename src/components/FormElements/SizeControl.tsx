import { TextField } from '@mui/material'

// Constants
const MAX_SIZE: number = 5000 // Picsum API can offer a maximum size of 5000.

// Types
type SizeControlProps = {
    label: string
    value: number
    onSizeChange: (value: number) => void
}

/**
 * Renders a numeric input field for controlling size-related properties.
 * It allows users to input a number within a specified range and ensures that the value does not exceed the maximum allowed size.
 *
 * @param {string} label - The label for the input field.
 * @param {number} value - The current value of the input field.
 * @param {Function} onSizeChange - The function to call when the value changes.
 * @returns {JSX.Element} Component that renders a controlled input field for size adjustments.
 */
export function SizeControl({ label, value, onSizeChange }: SizeControlProps) {
    // Correct to MAX_SIZE if user entered more than allowed.
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let newValue = Number(e.target.value)
        if (newValue > MAX_SIZE) {
            newValue = MAX_SIZE
        }
        onSizeChange(newValue)
    }

    return (
        <TextField
            type="number"
            label={label}
            value={value}
            onChange={handleChange}
            inputProps={{ min: 1, max: MAX_SIZE }}
        />
    )
}
