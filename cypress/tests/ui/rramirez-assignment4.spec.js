const apiBankAccounts = `${Cypress.env("apiUrl")}/bankaccounts`;

describe("API assignment 4", function () {
  let bankAccountIDs = [];


  beforeEach(function () {
    cy.login("Katharina_Bernier", "s3cret", { rememberUser: true });

    for (let i = 0; i < 5; i++) {
      const UUID = '1' + Math.random().toString();
      const bankName = 'Auto Test Bank Account ' + UUID;

      cy.request("POST", `${apiBankAccounts}`, {
        bankName: bankName,
        accountNumber: "123456789",
        routingNumber: "123123123",
      }).then((response) => {
        const bankAccountID = response.body.account.id;
        expect(response.status).to.eq(200);
        bankAccountIDs.push(bankAccountID);
      });
    }
  });

  afterEach(() => {
    cy.get('span.MuiTypography-root').contains('Logout').click();
  });

  it("List bank accounts", function () {
    cy.wrap(bankAccountIDs).each((bankAccountID) => {
      cy.request("GET", `${apiBankAccounts}/${bankAccountID}`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.account.id).to.eq(bankAccountID);
      });
    });
  });

  it("Delete all bank accounts", function () {
    cy.wrap(bankAccountIDs).each((bankAccountID) => {
      cy.request("DELETE", `${apiBankAccounts}/${bankAccountID}`).then(
        (response) => {
          expect(response.status).to.eq(200);
        }
      );
    });
  });
});