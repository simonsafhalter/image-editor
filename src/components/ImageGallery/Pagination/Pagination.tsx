import { Button, ButtonGroup } from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'

// Types
type PaginationLinks = {
    prev?: string
    next?: string
}

type PaginationProps = {
    links: PaginationLinks
    onPageChange: (url: string) => void
}

/**
 * Represents pagination links and provides buttons to navigate through pages.
 * The component renders two buttons: one for navigating to the previous page and another for the next page.
 * Each button is enabled or disabled based on the availability of the corresponding link.
 *
 * @param {PaginationLinks} links - Object containing 'prev' and 'next' links for pagination.
 * @param {function} onPageChange - Callback function that is called with the URL of the new page when a pagination button is clicked.
 * @returns {JSX.Element} A React component that renders a group of buttons for pagination.
 */
export function Pagination({ links, onPageChange }: PaginationProps) {
    return (
        <ButtonGroup variant="contained">
            <Button
                aria-label="Previous Page"
                data-cy="Previous Page"
                disabled={!links?.prev}
                onClick={() => onPageChange(links.prev!)}
            >
                <ArrowBackIosIcon />
            </Button>
            <Button
                aria-label="Next Page"
                data-cy="Next Page"
                disabled={!links?.next}
                onClick={() => onPageChange(links.next!)}
            >
                <ArrowForwardIosIcon />
            </Button>
        </ButtonGroup>
    )
}
