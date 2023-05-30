export class BankAccount {
    url = 'http://localhost:3000/transaction/new';
  


    elements = {
      getBankAccountsBtn: () => cy.get('.MuiTypography-root').contains('Bank Accounts'),
      getCreateBtn: () => cy.get('[data-test="bankaccount-new"'),
      getBankNameTxt: () => cy.get('#bankaccount-bankName-input'),
      getRoutingNumberTxt: () => cy.get('#bankaccount-routingNumber-input'),
      getAccountNumberTxt: () => cy.get('#bankaccount-accountNumber-input'),
      getSaveBtn: () => cy.get('button[type="submit"]'),
      getBankAccountLbl: () => cy.get('div.MuiGrid-root p'),
    }
  
    create(bankName, routingNumber, accountNumber) {
      this.elements.getBankAccountsBtn().click();
      this.elements.getCreateBtn().click();
      this.elements.getBankNameTxt().clear().type(bankName);
      this.elements.getRoutingNumberTxt().clear().type(routingNumber);
      this.elements.getAccountNumberTxt().clear().type(accountNumber);
      this.elements.getSaveBtn().click();
    }
  

    delete(bankName) {
      this.elements.getBankAccountsBtn().click();
      this.elements.getBankAccountLbl().contains(bankName)
      .parents('[data-test*="bankaccount-list-item-"]')
      .within(() => {
        cy.get('[data-test="bankaccount-delete"]').click();
    })
  }

  

    /*
    it('should delete an existing bank account', () => {
      cy.get('.MuiTypography-root').contains('Bank Accounts').click();
      cy.get('div.MuiGrid-root p').contains(bankName)
        .parents('[data-test*="bankaccount-list-item-"]')
        .within(() => {
          cy.get('[data-test="bankaccount-delete"]').click();
      });
      cy.get('div.MuiGrid-root p').contains(`${bankName} (Deleted)`).should('be.visible');
    });
    */
}
  export const BankAccountPage = new BankAccount();