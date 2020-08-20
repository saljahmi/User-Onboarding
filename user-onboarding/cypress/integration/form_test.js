// write tests here
describe('User Onboarding', () => {

  beforeEach(() => {
    // automate cleanup
  })

  describe('Inputs, terms of service, submit button', () => {
    
    it('can navigate to http://localhost:3000', () => {
      cy.visit('http://localhost:3000')
      cy.url().should('include', 'localhost')
    })

    it('can type something in the name input', () => {
      cy.get("input[name='name']")
        .type('Sarah')
        .should('have.value', 'Sarah')
    })

    it('can type something in the email input', () => {
        cy.get("input[name='email']")
          .type('s@ljahmi.com')
          .should('have.value', 's@ljahmi.com')
      })

      it('can type something in the password input', () => {
        cy.get("input[name='password']")
          .type('password')
          .should('have.value', 'password')
      })
  
      it('can check terms of service box', () => {
        cy.get('[type="checkbox"]')
        .check()  
      })

      it('can submit the form data', () => {
          cy.get("input[name='name']").type('Sarah')
          cy.get("input[name='email']").type('s@ljahmi.com')
          cy.get("input[name='password']").type('password')
          cy.get('[type="checkbox"]').check()
          cy.get("button[id='submit']").click()
          cy.contains('Sarah (s@ljahmi.com)').should('exist')
      })

   })
})