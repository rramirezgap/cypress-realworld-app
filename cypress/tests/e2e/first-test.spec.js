describe('Real World app tests', () => {
    before (() => {
        cy.visit('http://localhost:3000/signin')
        cy.get('#username').clear().type('Katharina_Bernier')
        cy.get('#password').clear().type('s3cret')
        cy.get('.MuiButton-label').click()
        cy.get('h6[data-test="sidenav-username"]').should('have.text', '@Katharina_Bernier')
    })

    it ('Creates a new pay request', () => {
        const AMOUNT = '100.00'
        const DESCRIPTION = 'Testing'
        cy.get('a').contains('New').click()
        cy.get('input[id="user-list-search-input"]').clear().type('Arely Kertzmann')
        cy.get('li[data-test*="user-"]').contains('Arely Kertzmann').click()
        cy.get('#amount').type(AMOUNT)
        cy.get('#transaction-create-description-input').type(DESCRIPTION)
        cy.get('button span.MuiButton-label').contains('Pay').click()
        cy.get('h2').should('have.text', 'Arely KertzmannPaid $' + AMOUNT + ' for ' +DESCRIPTION)
    }) 

    afterEach(() => {
        cy.get('span.MuiTypography-root').contains('Logout').click()
    })

})