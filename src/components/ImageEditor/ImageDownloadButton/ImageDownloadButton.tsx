import { useState } from 'react'
import { CircularProgress } from '@mui/material'
import Button from '@mui/material/Button'
import { downloadImage } from '@/utils/download'

// Types
type ImageDownloadButtonProps = {
    downloadUrl: string
    imageName: string
}

/**
 * Provides a button for downloading an image.
 * When the download button is clicked, it triggers the download of the specified image.
 * The component manages a state to indicate whether the image is currently being downloaded
 * showing a progress indicator during the download process.
 *
 * @param {string} imageUrl - The URL of the image to be downloaded.
 * @returns {JSX.Element} Component that renders a button for downloading an image and a progress indicator.
 */
export function ImageDownloadButton({
    downloadUrl,
    imageName,
}: ImageDownloadButtonProps) {
    const [isDownloading, setIsDownloading] = useState(false)

    const handleDownload = async () => {
        setIsDownloading(true)
        await downloadImage(downloadUrl, imageName)
        setIsDownloading(false)
    }

    if (isDownloading) {
        return <CircularProgress />
    }

    return (
        <Button
            variant="contained"
            data-cy="Download Image"
            onClick={handleDownload}
        >
            Download image
        </Button>
    )
}
