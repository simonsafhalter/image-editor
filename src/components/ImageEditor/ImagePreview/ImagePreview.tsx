import { useEffect, useState } from 'react'
import { CircularProgress, Paper } from '@mui/material'
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

const StyledPaper = styled(Paper)({
    padding: '20px',
})

// Types
type ImagePreviewProps = {
    imageUrl: string
}

export function ImagePreview({ imageUrl }: ImagePreviewProps) {
    const [isEditing, setIsEditing] = useState(true)

    useEffect(() => {
        setIsEditing(true)
    }, [imageUrl])

    return (
        <StyledPaper>
            <h3>IMAGE</h3>
            {isEditing && <CircularProgress />}
            <ImageContainer>
                <StyledImage
                    key={imageUrl} // Forces to re-render because onLoad doesn't fire for a cached image (https://stackoverflow.com/questions/67969732/onload-doesnt-fire-on-cached-images)
                    src={imageUrl}
                    id="image-element"
                    onLoad={() => setIsEditing(false)}
                    hidden={isEditing}
                    alt="Image preview"
                />
            </ImageContainer>
        </StyledPaper>
    )
}
