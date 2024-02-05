/**
 * Asynchronously downloads an image from the provided URL and saves it with the specified file name.
 *
 * The function fetches the image as a blob, creates a URL for it, and then triggers a download
 * operation in the browser using an anchor (`<a>`) element.
 *
 * @param {string} imageUrl - The URL of the image to be downloaded.
 * @param {string} imageName - The name to be used for the downloaded image file.
 * @returns {Promise<boolean>} A promise that resolves to 'true' if the download was successful, or 'false' otherwise.
 */
export async function downloadImage(
    imageUrl: string,
    imageName: string
): Promise<boolean> {
    let url = ''
    const a = document.createElement('a')
    document.body.appendChild(a)

    try {
        const response = await fetch(imageUrl)
        if (!response.ok) {
            throw new Error(
                `Network response error: ${response.status} ${response.statusText}`
            )
        }
        const blob = await response.blob()
        url = window.URL.createObjectURL(blob)

        a.href = url
        a.download = imageName
        a.click()

        return true
    } catch (error) {
        console.error('Download failed:', error)
        return false
    } finally {
        // Cleanup
        if (url) {
            window.URL.revokeObjectURL(url)
        }
        document.body.removeChild(a)
    }
}
