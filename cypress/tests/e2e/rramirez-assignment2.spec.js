
describe('Real World app tests', () => {
    before (() => {
        cy.visit('http://localhost:3000/signin')
        cy.get('#username').clear().type('Katharina_Bernier')
        cy.get('#password').clear().type('s3cret')
        cy.get('.MuiButton-label').click()
        cy.get('h6[data-test="sidenav-username"]').should('have.text', '@Katharina_Bernier')
    })

    it ('Creates a Bank Account and delete it', () => {
        const BANKNAME = 'RRamirez Test Bank Account'
        const ROUTINGNUMBER = '555555555'
        const ACCOUNTNUMBER = '777777777'
        cy.get('a span.MuiTypography-root').contains('Bank Accounts').click()
        cy.get('a span.MuiButton-label').contains('Create').click()
        cy.get('#bankaccount-bankName-input').type(BANKNAME)
        cy.get('#bankaccount-routingNumber-input').type(ROUTINGNUMBER)
        cy.get('#bankaccount-accountNumber-input').type(ACCOUNTNUMBER)
        cy.get('button span.MuiButton-label').click()
        cy.get('li[data-test*="bankaccount-list-item"] p').last().should('have.text', BANKNAME + ' ')
        .parents('li.MuiListItem-root').find('span.MuiButton-label').contains('Delete').should('be.visible').click()
        cy.get('li[data-test*="bankaccount-list-item"] p').last().should('have.text', BANKNAME + ' (Deleted)')
    })        

    after(() => {
        cy.get('span.MuiTypography-root').contains('Logout').click()
    })

})