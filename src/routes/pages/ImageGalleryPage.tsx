import { useSearchParams } from 'react-router-dom'
import { CircularProgress } from '@mui/material'
import { useImageList } from '@/api/getImageList'
import { ImageGallery } from '@/components/ImageGallery/ImageGallery'

/**
 * Fetches a list of images based on the current page number obtained from the URL parameters.
 *
 * @returns {JSX.Element} 'ImageGallery' component that displays a gallery of images.
 */
export function ImageGalleryPage() {
    const [searchParams] = useSearchParams()
    const pageNumber = searchParams.get('page') || '1'

    // Get list of images
    const { data, error, isLoading } = useImageList(pageNumber)

    if (isLoading) {
        return <CircularProgress />
    }

    if (error) {
        return <div>An error occurred: {error.message}</div>
    }

    if (!data?.images?.length) {
        return <div>No images available.</div>
    }

    return <ImageGallery {...data} />
}
