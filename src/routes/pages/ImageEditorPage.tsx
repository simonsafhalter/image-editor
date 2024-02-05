import { Link, useSearchParams } from 'react-router-dom'
import { CircularProgress } from '@mui/material'
import { useImageDetails } from '@/api/getImageDetails'
import { ImageEditor } from '@/components/ImageEditor/ImageEditor'

/**
 * Component that checks the existence of an image by the provided image ID.
 *
 * @returns {JSX.Element} Depending on the state of the image fetch operation, it returns either:
 * - A loading indicator if the image details are still being fetched.
 * - A message and link to the gallery if an error occurs or the image data is not found.
 * - The `ImageEditor` component for editing the image if the image details are successfully fetched.
 */
export function ImageEditorPage() {
    const [searchParams] = useSearchParams()
    const imageId = searchParams.get('imageId') || ''

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
