describe('The Home Page', () => {
    it('successfully loads', () => {
        cy.visit('/')

        cy.findByRole('button', {
            name: /Next Page/i,
        }).click()
    })
})
