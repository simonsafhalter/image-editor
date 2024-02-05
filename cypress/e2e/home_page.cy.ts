describe('Image Editor', () => {
    it('Browse, select, edit and download an image', () => {
        cy.visit('/')

        // Click the next page button
        cy.get('button[aria-label="Next Page"]').click()

        // Click on the 2nd element in the image list
        cy.get('ul>li').eq(2).click()

        // Edit the image to grayscale
        cy.get('input[type="checkbox"]').click()

        // Download the image
        cy.contains('button', 'Download image').click()
    })
})
