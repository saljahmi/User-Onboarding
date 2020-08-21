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

      it('submit button is enabled', () => {
        cy.get("button[id='submit']").should('be.enabled')
      })

      it('can submit the form data', () => {
        cy.get("button[id='submit']").click()
        cy.contains('h2','Sarah').should('exist')
        cy.contains('p','Email: s@ljahmi.com').should('exist')
      })

      it('check form validation if input is empty', () => {
        cy.get('input:invalid').should('have.length', 0)
        cy.get('[type="email"]').type('not_an_email')
        cy.get("button[id='submit']").click({force: true})
        cy.get('input:invalid').should('have.length', 1)
        cy.get('[type="email"]').then(($input) => {
          expect($input[0].errors).to.eq('Must include email address')
        })
      })
   })
})