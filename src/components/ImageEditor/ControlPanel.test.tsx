import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ControlPanel } from './ControlPanel'

// Mocks
vi.mock('@/components/FormElements/GrayscaleControl', () => ({
    GrayscaleControl: vi.fn(() => (
        <div data-testid="grayscale-control">Grayscale</div>
    )),
}))

vi.mock('@/components/FormElements/BlurControl', () => ({
    BlurControl: vi.fn(() => <div data-testid="blur-control">Blur</div>),
}))

vi.mock('@/components/FormElements/SizeControl', () => ({
    SizeControl: vi.fn(({ label }) => (
        <div data-testid={`size-control-${label.toLowerCase()}`}>{label}</div>
    )),
}))

describe('ControlPanel', () => {
    it('render controls', async () => {
        // Initial settings
        const initialSettings = {
            grayscale: false,
            blur: 0,
            height: 100,
            width: 100,
        }

        //
        render(
            <ControlPanel
                settings={initialSettings}
                onSettingsChange={vi.fn()}
            />
        )

        // Verify rendering
        expect(screen.getByTestId('grayscale-control')).toHaveTextContent(
            'Grayscale'
        )
        expect(screen.getByTestId('blur-control')).toHaveTextContent('Blur')
        expect(screen.getByTestId('size-control-height')).toHaveTextContent(
            'Height'
        )
        expect(screen.getByTestId('size-control-width')).toHaveTextContent(
            'Width'
        )
    })
})
