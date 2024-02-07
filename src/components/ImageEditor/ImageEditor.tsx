import { useState, useCallback } from 'react'
import { Grid } from '@mui/material'
import Paper from '@mui/material/Paper'
import styled from '@emotion/styled'
import { useDebouncedCallback } from 'use-debounce'
import { useStoredState } from '@/hooks/useStoredState'
import { setInStorage } from '@/utils/storage'
import { getImageUrlForEditor } from '@/api/getImageUrl'
import { ImageDownloadButton } from './ImageDownloadButton/ImageDownloadButton'
import { ImagePreview } from './ImagePreview/ImagePreview'
import { ControlPanel } from './ControlPanel/ControlPanel'

// Constants
const DEBOUNCE_TIME_MS: number = 500 // Debounce time between image edit operations
const EDITOR_DEFAULT_SETTINGS: ImageEditorSettings = {
    grayscale: false,
    blur: 1,
    height: 200,
    width: 300,
}

// Styles
const StyledPaper = styled(Paper)({
    padding: '20px',
})

// Types
export type ImageEditorSettings = {
    grayscale: boolean
    blur: number
    height: number
    width: number
}

type ImageEditorProps = {
    imageId: string
}

/**
 * The ImageEditor component allows users to apply various settings to an image and download the edited image.
 * The component updates the storage whenever the settings change.
 *
 * @returns {JSX.Element} A React component that renders the image editing interface.
 */
export function ImageEditor({ imageId }: ImageEditorProps) {
    // Initialize storage and image states
    const storageKey = `ImageEditor_${imageId}`
    const [settings, setSettings] = useStoredState(
        storageKey,
        EDITOR_DEFAULT_SETTINGS
    )
    const [imageUrl, setImageUrl] = useState('')

    // Debounce logic so it's not saving to storage and requesting a new image too quickly
    const debouncedUpdate = useDebouncedCallback(() => {
        setInStorage(storageKey, settings)
        setImageUrl(getImageUrlForEditor(imageId, settings))
    }, DEBOUNCE_TIME_MS)

    const handleSettingsChange = useCallback(
        (newSettings: ImageEditorSettings) => {
            setSettings((previousSettings: ImageEditorSettings) => {
                return { ...previousSettings, ...newSettings }
            })
            debouncedUpdate()
        },
        [setSettings, debouncedUpdate]
    )

    debouncedUpdate()

    return (
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2 }}>
            <Grid item xs={12} sm={7}>
                <ImagePreview imageUrl={imageUrl} />
            </Grid>
            <Grid item xs={12} sm={5}>
                <StyledPaper>
                    <h3>SETTINGS</h3>
                    <ControlPanel
                        settings={settings}
                        onSettingsChange={handleSettingsChange}
                    />
                    <ImageDownloadButton
                        downloadUrl={imageUrl}
                        imageName={imageId}
                    />
                </StyledPaper>
            </Grid>
        </Grid>
    )
}
