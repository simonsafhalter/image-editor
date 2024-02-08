import { Link, useSearchParams } from 'react-router-dom'
import { CircularProgress } from '@mui/material'
import { useImageDetails } from '@/api/getImageDetails'
import { ImageEditor } from '@/components/ImageEditor/ImageEditor'

/**
 * Component that checks the existence of an image for the provided image ID.
 *
 * @returns {JSX.Element} 'ImageEditor' component for editing the image.
 */
export function ImageEditorPage() {
    const [searchParams] = useSearchParams()
    const imageId = searchParams.get('imageId') || ''

    // Get image details
    const { data, error, isLoading } = useImageDetails(imageId)

    if (isLoading) {
        return <CircularProgress />
    }

    if (!data || error) {
        return (
            <Link to="/">
                Image doesn't exist, go to gallery and select a new one
            </Link>
        )
    }

    return <ImageEditor imageId={imageId} />
}
