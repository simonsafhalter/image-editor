import { ImageEditorSettings } from '@/components/ImageEditor/ImageEditor'

// Constants
const BASE_URL: string = 'https://picsum.photos'
const DEFAULT_SIZE: string = '100'

export function getImageUrlForGallery(
    id: string,
    imageSize: string = DEFAULT_SIZE
): string {
    return `${BASE_URL}/id/${id}/${imageSize}`
}

export function getImageUrlForEditor(
    id: string,
    settings: ImageEditorSettings
): string {
    return `${BASE_URL}/id/${id}/${settings.width}/${settings.height}?${settings.grayscale ? 'grayscale&' : ''}blur=${settings.blur}`
}
