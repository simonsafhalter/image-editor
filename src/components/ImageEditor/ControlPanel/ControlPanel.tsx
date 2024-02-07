import { useState } from 'react'
import styled from '@emotion/styled'
import { GrayscaleControl } from '@/components/FormElements/GrayscaleControl'
import { BlurControl } from '@/components/FormElements/BlurControl'
import { SizeControl } from '@/components/FormElements/SizeControl'
import { ImageEditorSettings } from '@/components/ImageEditor/ImageEditor'

// Styles
const SizeContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin: 20px;
`

const Label = styled.div`
    margin-bottom: 20px;
    color: grey;
`

type ControlPanelProps = {
    settings: ImageEditorSettings
    onSettingsChange: React.Dispatch<ImageEditorSettings>
}

type SettingsValue = boolean | number

export function ControlPanel({
    settings,
    onSettingsChange,
}: ControlPanelProps) {
    const [localSettings, setLocalSettings] = useState(settings)

    // Update any part of the settings and notify parent
    const handleSettingChange =
        (settingName: string) => (newValue: SettingsValue) => {
            const updatedSettings = {
                ...localSettings,
                [settingName]: newValue,
            }
            setLocalSettings(updatedSettings)
            onSettingsChange(updatedSettings)
        }

    return (
        <>
            <GrayscaleControl
                grayscale={localSettings.grayscale}
                onGrayscaleChange={handleSettingChange('grayscale')}
            />
            <BlurControl
                blur={localSettings.blur}
                onBlurChange={handleSettingChange('blur')}
            />
            <SizeContainer>
                <SizeControl
                    label="Width"
                    value={localSettings.width}
                    onSizeChange={handleSettingChange('width')}
                />
                <SizeControl
                    label="Height"
                    value={localSettings.height}
                    onSizeChange={handleSettingChange('height')}
                />
            </SizeContainer>
            <Label>The maximum width or height for the images is 5000px</Label>
        </>
    )
}
