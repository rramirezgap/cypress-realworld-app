import { BankAccountPage } from "../../page-objects/pages/bankAccount";

describe('Real World App Bank Account Tests', () => {
    let UUID = '1' + Math.random().toString();
    let bankName = 'Auto Test Bank Account ' + UUID;
    //let bankName = 'Auto Test Bank Account '
    let routingNumber = '987654321';
    let accountNumber = '123456789';
  
    beforeEach(() => {
      cy.visit('/');
      cy.get('#username').clear().type('Katharina_Bernier');
      cy.get('#password').clear().type('s3cret');
      cy.get('.MuiButton-label').click();
    });
   
    afterEach(() => {
      cy.get('span.MuiTypography-root').contains('Logout').click();
    });
  
    it('should create a new bank account', () => {
      BankAccountPage.create(bankName, routingNumber, accountNumber)
      BankAccountPage.elements.getBankAccountLbl().last().should('have.text', `${bankName} `)    
    });

    it('should delete an existing bank account', () => {
      BankAccountPage.delete(bankName)
      BankAccountPage.elements.getBankAccountLbl().last().should('have.text', `${bankName} (Deleted)`)   

    });
    

  });