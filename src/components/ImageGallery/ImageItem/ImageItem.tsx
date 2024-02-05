import { useState } from 'react'
import { ImageListItemBar } from '@mui/material'
import SyncIcon from '@mui/icons-material/Sync'

// Constants
const IMAGE_WIDTH = 200

// Types
type ImageItemProps = {
    id: string
    author: string
}

/**
 * Displays an image from a specified source along with the image's author.
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
            {isLoading && <SyncIcon />}
            <img
                src={`https://picsum.photos/id/${id}/${IMAGE_WIDTH}`}
                width="100%"
                alt="image"
                loading="lazy"
                onLoad={() => setIsLoading(false)}
            ></img>
            <ImageListItemBar title={author} />
        </>
    )
}
