import { NewTransactionPage } from "../../page-objects/pages/newTransaction"

describe('Real World app tests', () => {
    let contact = 'Arely Kertzmann'
    let amount = 100
    let note = 'Testing'

    before (() => {
        cy.visit('/')
        cy.get('#username').clear().type('Katharina_Bernier')
        cy.get('#password').clear().type('s3cret')
        cy.get('.MuiButton-label').click()
        cy.get('h6[data-test="sidenav-username"]').should('have.text', '@Katharina_Bernier')
    })

    it ('Creates a new pay request', () => {
        NewTransactionPage.addNew(contact, amount, note)
        NewTransactionPage.elements.getSuccessMsg().should('have.text', `${contact}Paid $${amount}.00 for ${note}`) 
    }) 

    afterEach(() => {
        cy.get('span.MuiTypography-root').contains('Logout').click()
    })

})