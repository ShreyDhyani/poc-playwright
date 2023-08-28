describe('template spec', () => {
  it('tests the flow', () => {
    
    cy.intercept({url: 'https://prueba.fpappstest.io/config',method: 'GET'}).as('config');
    cy.intercept({url: 'https://prueba.fpappstest.io/banks_config',method: 'GET'}).as('banksConfig');
    cy.intercept({url: 'https://prueba.fpappstest.io/amsc_config_sandbox',method: 'GET'}).as('amscConfig');
    cy.intercept({url: 'https://s.finprim.com/v2/auth/prueba/token',method: 'POST'}).as('token');
    cy.intercept({url: 'https://s.finprim.com/api/oms/fund_schemes/*',method: 'POST'}).as('fundSchemes');
    cy.intercept({url: 'https://api.segment.io/v1/m',method: 'POST'}).as('segment');

    cy.visit('https://prueba.fpappstest.io/')
    .wait('@config')
    .wait('@banksConfig')
    .get('.pb-9 > .flex-col > :nth-child(2) > :nth-child(2)').contains('Invest').click()
    .wait('@token')
    .get('.rounded-5').contains('Continue').click()
    .get('form').get('form > :nth-child(4)').contains('Copy').click()
    .get('.rounded-5').contains('Continue').click()
    .get('.py-3').contains('Copy').click()
    .get('.rounded-5').contains('Continue').click()
    .get('.justify-between > ul.flex > :nth-child(2)').click()
    cy.get('#orderForm > .mb-8').find('input').type('5000')
    cy.get('.rounded-5').click()
    cy.get('.flex > .text-primary').click()
    cy.get('.rounded-5').click()
    cy.get('.rounded-5').click()

    // .get('.option > .block').click()
  })
})