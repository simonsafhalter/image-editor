// Constants
const DEFAULT_SIZE: string = '100'

export function getImageUrl(
    id: string,
    imageSize: string = DEFAULT_SIZE
): string {
    return `https://picsum.photos/id/${id}/${imageSize}`
}
