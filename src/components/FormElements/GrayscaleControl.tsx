import { Switch } from '@mui/material'
import styled from '@emotion/styled'

// Styles
const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

// Types
type GrayscaleControlProps = {
    grayscale: boolean
    onGrayscaleChange: (grayscale: boolean) => void
}

/**
 * Provides a switch for toggling grayscale effect on an image.
 *
 * @param {boolean} grayscale - The current grayscale state (true for grayscale, false for normal).
 * @param {Function} onGrayscaleChange - The function to call when the grayscale state changes.
 * @returns {JSX.Element} A React component that renders a switch for toggling grayscale effect.
 */
export function GrayscaleControl({
    grayscale,
    onGrayscaleChange,
}: GrayscaleControlProps) {
    return (
        <Container>
            <div>Grayscale</div>
            <Switch
                checked={grayscale}
                onChange={(e) => onGrayscaleChange(e.target.checked)}
            />
        </Container>
    )
}
