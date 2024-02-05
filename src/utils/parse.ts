import { HeaderLinks } from '@/api/getImageList'

/**
 * Parses the Link header from HTTP headers and returns an object mapping link names to URLs.
 *
 * The Link header is expected to be in the format:
 * `<url>; rel="name", <url>; rel="name"`
 *
 * @param {Headers} httpHeaders - The HttpHeaders object containing the Link header.
 * @returns {HeaderLinks} An object where each key is the link's name and the value is the corresponding URL.
 * @throws Will return an empty object if a section of the Link header cannot be split on ";".
 */
export function parseHeaderLinks(httpHeaders: Headers): HeaderLinks {
    if (!httpHeaders) {
        return {}
    }
    const linkHeader = httpHeaders.get('Link')

    if (!linkHeader || linkHeader.length === 0) {
        return {}
    }

    // Split parts by comma and parse each part into a named link
    return linkHeader.split(',').reduce((links: HeaderLinks, part: string) => {
        const section = part.split(';')

        if (section.length !== 2) {
            return {}
        }

        const url = section[0].trim().replace(/<(.*)>/, '$1')
        const name = section[1].trim().replace(/rel="(.*)"/, '$1')

        links[name] = url

        return links
    }, {})
}
