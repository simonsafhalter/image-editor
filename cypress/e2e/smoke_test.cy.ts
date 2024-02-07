describe('Smoke test', () => {
    it('Browse, select, edit and download an image', () => {
        cy.visit('/')

        // Click the next page button
        cy.get('[data-cy="Next Page"]').click()

        // Click the previous page button
        cy.get('[data-cy="Previous Page"]').click()

        // Click on the 3rd element in the image list
        cy.get('[data-cy="Image List"] > li').eq(2).click()

        // Edit the image to grayscale
        cy.get('[data-cy="Grayscale Control"]').click()

        // Download the image
        cy.get('[data-cy="Download Image"]').click()
    })
})
