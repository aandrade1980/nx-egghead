describe('store-ui-shared: Spinner component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=spinner--primary'));

  it('should render the component', () => {
    cy.get('.MuiCircularProgress-svg').should('exist');
  });
});
