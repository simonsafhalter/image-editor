import { getImageUrlForEditor, getImageUrlForGallery } from './getImageUrl'

describe('getImageUrlForGallery', () => {
    it('returns a Picsum url with the provided ID and size', async () => {
        // Act
        const url = getImageUrlForGallery('3', '123')

        // Assert
        expect(url).toEqual('https://picsum.photos/id/3/123')
    })

    it('returns a Picsum url with the provided ID and a default size', async () => {
        // Act
        const url = getImageUrlForGallery('3')

        // Assert
        expect(url).toEqual('https://picsum.photos/id/3/100')
    })
})

describe('getImageUrlForEditor', () => {
    it('returns a Picsum url with the provided ID and settings', async () => {
        // Act
        const url = getImageUrlForEditor('3', {
            grayscale: true,
            blur: 2,
            width: 113,
            height: 321,
        })

        // Assert
        expect(url).toEqual(
            'https://picsum.photos/id/3/113/321?grayscale&blur=2'
        )
    })
})
