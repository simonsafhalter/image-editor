import { describe, expect, test } from 'vitest'
import { parseHeaderLinks } from './parse'

describe('parseHeaderLinks', () => {
    test('should parse the "Link" headers and return the expected object', () => {
        // Mock
        const headers = new Headers()
        headers.append(
            'Link',
            '<https://picsum.photos/v2/list?page=2&limit=18>; rel="prev", <https://picsum.photos/v2/list?page=4&limit=18>; rel="next"'
        )

        // Call the function
        const result = parseHeaderLinks(headers)

        // Assertions
        expect(result).toStrictEqual({
            prev: 'https://picsum.photos/v2/list?page=2&limit=18',
            next: 'https://picsum.photos/v2/list?page=4&limit=18',
        })
    })

    test('should retrun an empty object if the "Link" cannot be parsed', () => {
        // Mock
        const headers = new Headers()
        headers.append('Link', 'Not parsable')

        // Call the function
        const result = parseHeaderLinks(headers)

        // Assertions
        expect(result).toStrictEqual({})
    })

    test('should return an empty object if the "Link" headers are not present', () => {
        // Mock
        const headers = new Headers()

        // Call the function
        const result = parseHeaderLinks(headers)

        // Assertions
        expect(result).toStrictEqual({})
    })
})
