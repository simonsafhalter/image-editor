import { UseQueryResult, useQuery } from '@tanstack/react-query'

// Constants
const URL = (imageId: string): string => {
    return `https://picsum.photos/id/${imageId}/info`
}

// Types
type ImageDetailsResponse = {
    id: string
    author: string
    width: number
    height: number
    url: string
    download_url: string
}

/**
 * Custom hook for fetching single image information.
 *
 * @param {string} imageId - The ID of the image.
 * @returns {UseQueryResult} A query object containing the status of the query.
 */
export function useImageDetails(
    imageId: string
): UseQueryResult<ImageDetailsResponse> {
    const url = URL(imageId)

    return useQuery({
        queryKey: ['imageDetails', url],
        queryFn: () => getImageDetails(url),
        // Don't retry on 404 from Picsum. By default useQuery retries on every error.
        retry: (failureCount, error) => error.message !== '404',
    })
}

/**
 * Fetches a single image information
 *
 * @param {string} url - Url to fetch the image info from.
 * @returns {Promise<ImageDetailsResponse>} A promise that resolves to the ImageDetailsResponse.
 */
export async function getImageDetails(
    url: string
): Promise<ImageDetailsResponse> {
    const response = await fetch(url)

    if (!response.ok) {
        throw new Error(response.status.toString())
    }

    return response.json()
}
