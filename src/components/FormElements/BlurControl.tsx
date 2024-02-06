import { FormLabel, Slider } from '@mui/material'
import styled from '@emotion/styled'

// Styles
const Container = styled.div`
    display: flex;
    align-items: center;
`

const Label = styled(FormLabel)`
    padding-right: 20px;
`

// Types
type BlurControlProps = {
    blur: number
    onBlurChange: (value: number) => void
}

/**
 * Provides a slider for adjusting the blur level of an image.
 *
 * @param {number} blur - The current blur level.
 * @param {Function} onBlurChange - The function to call when the blur level changes.
 * @returns {JSX.Element} A React component that renders a slider for adjusting blur level.
 */
export function BlurControl({ blur, onBlurChange }: BlurControlProps) {
    return (
        <Container>
            <Label>Blur</Label>
            <Slider
                aria-label="Blur"
                valueLabelDisplay="auto"
                step={1}
                marks
                min={1}
                max={10}
                value={blur}
                onChange={(e) => onBlurChange(e.target?.value)}
            />
        </Container>
    )
}
