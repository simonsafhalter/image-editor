import { useState } from 'react'
import { CircularProgress, ImageListItemBar } from '@mui/material'
import { getImageUrlForGallery } from '@/api/getImageUrl'

// Constants
const IMAGE_SIZE: string = '200' // Image width and height (square) for the gallery

// Types
type ImageItemProps = {
    id: string
    author: string
}

/**
 * Displays an image from Picsum for the provided ID along with the image's author.
 * It initially shows a loading icon until the image has fully loaded.
 *
 * @param {number} props.id - The unique identifier for the image.
 * @param {string} props.author - The author's name of the image.
 * @returns {JSX.Element} The `ImageItem` component with a loading icon, the image, and the image author's name.
 *
 * @example
 * <ImageItem id={1} author="John Doe" />
 */
export function ImageItem({ id, author }: ImageItemProps) {
    const [isLoading, setIsLoading] = useState(true)

    return (
        <>
            {isLoading && <CircularProgress />}
            <img
                src={getImageUrlForGallery(id, IMAGE_SIZE)}
                width="100%"
                alt={`Image ${id} from ${author}`}
                loading="lazy"
                onLoad={() => setIsLoading(false)}
            />
            <ImageListItemBar title={author} />
        </>
    )
}
