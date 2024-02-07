import { Link, URLSearchParamsInit, useSearchParams } from 'react-router-dom'
import { Container, ImageList, ImageListItem } from '@mui/material'
import { ImageListResponse } from '@/api/getImageList'
import { ImageItem } from './ImageItem/ImageItem'
import { Pagination } from './Pagination/Pagination'

/**
 * Renders a gallery of images with pagination.
 * The component handles pagination through the `Pagination` component and updates the URL parameters accordingly.
 *
 * @returns {JSX.Element} A React component that displays a paginated gallery of images.
 */
export function ImageGallery({ images, links }: ImageListResponse) {
    const [, setSearchParams] = useSearchParams()

    const handlePageChange = (url: string) => {
        const page = new URL(url).searchParams.get('page')
        setSearchParams({ page } as URLSearchParamsInit)
    }

    return (
        <Container>
            <Pagination links={links} onPageChange={handlePageChange} />
            <ImageList cols={6} data-cy="Image List">
                {images?.map((image) => (
                    <ImageListItem key={image.id}>
                        <Link to={`/image-editor?imageId=${image.id}`}>
                            <ImageItem id={image.id} author={image.author} />
                        </Link>
                    </ImageListItem>
                ))}
            </ImageList>
        </Container>
    )
}
