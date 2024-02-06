import { getImageUrl } from './getImageUrl'

describe('getImageUrl', () => {
    it('returns a Picsum url with the provided ID and size', async () => {
        // Act
        const url = getImageUrl('3', '123')

        // Assert
        expect(url).toEqual('https://picsum.photos/id/3/123')
    })

    it('returns a Picsum url with the provided ID and a default size', async () => {
        // Act
        const url = getImageUrl('3')

        // Assert
        expect(url).toEqual('https://picsum.photos/id/3/100')
    })
})
