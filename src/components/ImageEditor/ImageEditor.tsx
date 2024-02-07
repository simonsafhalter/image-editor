import { useState, useEffect } from 'react'
import { Grid } from '@mui/material'
import Paper from '@mui/material/Paper'
import styled from '@emotion/styled'
import { useStoredState } from '@/hooks/useStoredState'
import { setInStorage } from '@/utils/storage'
import { getImageUrlForEditor } from '@/api/getImageUrl'
import { ImageDownloadButton } from './ImageDownloadButton/ImageDownloadButton'
import { ImagePreview } from './ImagePreview/ImagePreview'
import { ControlPanel } from './ControlPanel/ControlPanel'

// Constants
const DEBOUNCE_VALUE: number = 500 // Debounce value between image edit operations
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
    // Initialize storage key and image url.
    const storageKey = `ImageEditor_${imageId}`
    const [imageUrl, setImageUrl] = useState('')

    // Initialize state from the storage or default values
    const [settings, setSettings] = useStoredState(
        storageKey,
        EDITOR_DEFAULT_SETTINGS
    )

    function handleSettingsChange(newSettings: ImageEditorSettings) {
        // Store values to persist
        setSettings((previousSettings: ImageEditorSettings) => {
            return { ...previousSettings, ...newSettings }
        })
    }

    // Update when settings change
    useEffect(() => {
        // Debounce so it's not saving to storage and requesting a new image too quickly
        const debounce = setTimeout(() => {
            setInStorage(storageKey, settings)
            setImageUrl(getImageUrlForEditor(imageId, settings))
        }, DEBOUNCE_VALUE)

        // Clear timeout if the effect re-runs
        return () => clearTimeout(debounce)
    }, [settings])

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
