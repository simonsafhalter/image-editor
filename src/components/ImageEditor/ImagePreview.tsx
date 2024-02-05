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

    // Note: img.onLoad doesn't fire if the image is loaded from cache because it's already loaded.
    // We can fix this by manually setting the "src" property. It still gets the image from the cache and fires onLoad.
    useEffect(() => {
        setIsEditing(true)
        const image = document.getElementById(
            'image-element'
        ) as HTMLImageElement
        image.src = imageUrl
    }, [imageUrl])

    return (
        <StyledPaper>
            <h3>IMAGE</h3>
            {isEditing && <CircularProgress />}
            <ImageContainer>
                <StyledImage
                    id="image-element"
                    onLoad={() => setIsEditing(false)}
                    hidden={isEditing}
                    alt="Image preview"
                />
            </ImageContainer>
        </StyledPaper>
    )
}
