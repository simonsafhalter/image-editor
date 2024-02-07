import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { GrayscaleControl } from '@/components/FormElements/GrayscaleControl'
import { BlurControl } from '@/components/FormElements/BlurControl'
import { SizeControl } from '@/components/FormElements/SizeControl'
import { ImageEditorSettings } from '../ImageEditor'

// Styles
const SizeContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin: 20px;
`

type ControlPanelProps = {
    settings: ImageEditorSettings
    onSettingsChange: React.Dispatch<ImageEditorSettings>
}

export function ControlPanel({
    settings,
    onSettingsChange,
}: ControlPanelProps) {
    const [grayscale, setGrayscale] = useState(settings.grayscale)
    const [blur, setBlur] = useState(settings.blur)
    const [height, setHeight] = useState(settings.height)
    const [width, setWidth] = useState(settings.width)

    useEffect(() => {
        onSettingsChange({
            grayscale,
            blur,
            height,
            width,
        })
    }, [grayscale, blur, height, width])

    return (
        <>
            <GrayscaleControl
                grayscale={grayscale}
                onGrayscaleChange={setGrayscale}
            />
            <BlurControl blur={blur} onBlurChange={setBlur} />
            <SizeContainer>
                <SizeControl
                    label="Height"
                    value={height}
                    onSizeChange={setHeight}
                />
                <SizeControl
                    label="Width"
                    value={width}
                    onSizeChange={setWidth}
                />
            </SizeContainer>
        </>
    )
}
