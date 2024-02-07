import { useSearchParams } from 'react-router-dom'
import { CircularProgress } from '@mui/material'
import { useImageList } from '@/api/getImageList'
import { ImageGallery } from '@/components/ImageGallery/ImageGallery'

/**
 * Fetches a list of images based on the current page number obtained from the URL parameters.
 * Handles loading, error, and no images available states.
 *
 * @returns {JSX.Element} A React component that displays a paginated gallery of images.
 */
export function ImageGalleryPage() {
    const [searchParams] = useSearchParams()
    const pageNumber = searchParams.get('page') || '1'

    // Get the images
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
