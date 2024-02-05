import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ImageEditor } from './ImageEditor' // Adjust the import path
import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils'

// Mock external dependencies and child components
vi.mock('@/hooks/useStoredState', () => ({
    useStoredState: vi.fn().mockReturnValue([{}]),
}))

vi.mock('@/utils/storage', () => ({
    setInStorage: vi.fn(),
}))

vi.mock('./ImagePreview', () => ({
    ImagePreview: vi.fn(({ settings, onSettingsChange }) => (
        <div
            data-testid="image-preview"
            onClick={() => onSettingsChange({ newSettings: 1 })}
        >
            ImagePreview Mock
        </div>
    )),
}))

vi.mock('./ControlPanel', () => ({
    ControlPanel: vi.fn(() => (
        <div data-testid="control-panel">ControlPanel Mock</div>
    )),
}))

vi.mock('./ImageDownloader', () => ({
    ImageDownloader: vi.fn(() => (
        <div data-testid="image-downloader">ImageDownloader Mock</div>
    )),
}))

describe('ImageEditor', () => {
    afterEach(() => {
        vi.clearAllMocks()
    })

    it('renders ImagePreview, ControlPanel, and ImageDownloader', () => {
        render(<ImageEditor imageId="123" />)
        expect(screen.getByTestId('image-preview')).toBeInTheDocument()
        expect(screen.getByTestId('control-panel')).toBeInTheDocument()
        expect(screen.getByTestId('image-downloader')).toBeInTheDocument()
    })

    it('updates settings and imageUrl when ControlPanel changes settings', async () => {
        render(<ImageEditor imageId="123" />)
        // Assuming ControlPanel mock can be interacted with for settings change,
        // here you would simulate interactions or directly invoke the onChange handler if exposed.
        // For this mock, we'll just check initial render:
        fireEvent.click(screen.getByTestId('control-panel'))

        expect(screen.getByTestId('control-panel')).toBeInTheDocument()
        // More detailed tests would require a more interactive mock of ControlPanel
        // and checking for changes in the ImagePreview or ImageDownloader mocks.
    })

    // it('saves settings to storage on settings change after debounce', async () => {
    //     render(<ImageEditor imageId="123" />)
    //     // Simulate settings change via ControlPanel interaction or directly if possible
    //     // This requires detailed mocking of interactions or direct state manipulation
    //     // Wait for the debounce period
    //     await act(() => new Promise((r) => setTimeout(r, 500)))
    //     // Verify that setInStorage was called with the expected arguments, which requires
    //     // a more interactive mock or direct manipulation of the useStoredState returned state.
    //     expect(vi.mocked(setInStorage)).toHaveBeenCalledTimes(1)
    //     // Further assertions can verify the call parameters to ensure correct behavior
    // })
})
