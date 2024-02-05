import { describe, it, expect, vi } from 'vitest'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Pagination } from './Pagination'

describe('Pagination', () => {
    it('calls onPageChange with the "next" URL when "next" button is clicked', () => {
        const mockOnPageChange = vi.fn()

        render(
            <Pagination
                links={{ next: 'https://some.url' }}
                onPageChange={mockOnPageChange}
            />
        )

        const prevButton = screen.getByRole('button', {
            name: /Next Page/i,
        })

        fireEvent.click(prevButton)

        expect(mockOnPageChange).toHaveBeenCalledWith('https://some.url')
    })

    it('calls onPageChange with the "prev" URL when "previous" button is clicked', () => {
        const mockOnPageChange = vi.fn()

        render(
            <Pagination
                links={{ prev: 'https://some.url' }}
                onPageChange={mockOnPageChange}
            />
        )

        const prevButton = screen.getByRole('button', {
            name: /Previous Page/i,
        })

        fireEvent.click(prevButton)

        expect(mockOnPageChange).toHaveBeenCalledWith('https://some.url')
    })

    it('disables the "next" button if no "next" link is provided', () => {
        render(
            <Pagination
                links={{ prev: 'https://some.url' }}
                onPageChange={vi.fn()}
            />
        )

        const nextButton = screen.getByRole('button', { name: /Next Page/i })
        expect(nextButton).toBeDisabled()
    })

    it('disables the "prev" button if no "prev" link is provided', () => {
        render(
            <Pagination
                links={{ next: 'https://some.url' }}
                onPageChange={vi.fn()}
            />
        )

        const prevButton = screen.getByRole('button', {
            name: /Previous Page/i,
        })
        expect(prevButton).toBeDisabled()
    })
})
