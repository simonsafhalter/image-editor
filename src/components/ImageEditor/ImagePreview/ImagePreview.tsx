import { useState } from 'react'
import { CircularProgress } from '@mui/material'
import styled from '@emotion/styled'

// Styles
const ImageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const StyledImage = styled.img`
    max-width: 100%;
    max-height: 50vh;
    object-fit: contain;
`

// Types
type ImagePreviewProps = {
    imageUrl: string
}

export function ImagePreview({ imageUrl }: ImagePreviewProps) {
    const [isEditing, setIsEditing] = useState(true)

    return (
        <>
            {isEditing && <CircularProgress />}
            <ImageContainer>
                <StyledImage
                    src={imageUrl}
                    id="image-element"
                    onLoad={() => setIsEditing(false)}
                    hidden={isEditing}
                    alt="Image preview"
                />
            </ImageContainer>
        </>
    )
}
