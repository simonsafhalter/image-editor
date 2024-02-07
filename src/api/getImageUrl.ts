import { ImageEditorSettings } from '@/components/ImageEditor/ImageEditor'

// Constants
const BASE_URL: string = 'https://picsum.photos'
const DEFAULT_SIZE: string = '100'

/**
 * Generates a URL for retrieving an image for the gallery based on the provided id and imageSize.
 *
 * @param {string} id - The unique identifier of the image.
 * @param {string} [imageSize=DEFAULT_SIZE] - The size of the image to retrieve. Defaults to a predefined default size.
 * @returns {string} The URL to access the specified image for the gallery with the given size.
 */
export function getImageUrlForGallery(
    id: string,
    imageSize: string = DEFAULT_SIZE
): string {
    return `${BASE_URL}/id/${id}/${imageSize}`
}

/**
 * Generates a URL for retrieving an image for the editor based on the provided id and editing settings.
 *
 * @param {string} id - The unique identifier of the image.
 * @param {ImageEditorSettings} settings - The settings to apply to the image.
 * @returns {string} The URL to access the specified image for the editor with the applied settings.
 */
export function getImageUrlForEditor(
    id: string,
    settings: ImageEditorSettings
): string {
    return `${BASE_URL}/id/${id}/${settings.width}/${settings.height}?${settings.grayscale ? 'grayscale&' : ''}blur=${settings.blur}`
}
