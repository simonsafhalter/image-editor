import { UseQueryResult, useQuery } from '@tanstack/react-query'
import { parseHeaderLinks } from '@/utils/parse'

// Constants
const BASE_URL = 'https://picsum.photos/v2/list'
const PAGE_ITEMS = 18

// Types
type ImageData = {
    id: string
    author: string
}

export type HeaderLinks = {
    prev?: string
    next?: string
}

export type ImageListResponse = {
    images: ImageData[]
    links: HeaderLinks
}

/**
 * Custom hook for fetching a list of images.
 *
 * @param {string} pageNumber - The current page number to fetch.
 * @returns {UseQueryResult} A query object containing the status of the query.
 */
export function useImageList(
    pageNumber: string
): UseQueryResult<ImageListResponse> {
    const url = `${BASE_URL}?page=${pageNumber}&limit=${PAGE_ITEMS}`

    return useQuery({
        queryKey: ['images', url],
        queryFn: () => getImageList(url),
    })
}

/**
 * Fetches images on with the provided URL.
 * Parses the header Links for the pagination data.
 *
 * @param {string} url - Url to fetch the images from.
 * @returns {Promise<ImageListResponse>} A promise that resolves to the ImageListResponse.
 */
export async function getImageList(url: string): Promise<ImageListResponse> {
    const response = await fetch(url)

    if (!response.ok) {
        throw new Error(
            `Error fetching images: ${response.status} ${response.statusText}`
        )
    }

    // Extract headers for pagination
    const links: HeaderLinks = parseHeaderLinks(response.headers)

    return {
        images: await response.json(),
        links,
    }
}
