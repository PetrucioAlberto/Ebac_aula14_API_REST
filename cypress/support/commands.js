// Login

Cypress.Commands.add('token', (email, senha) => {
    cy.request({
        method: 'POST',
        url: 'login',
        body: {
            "email": email,
            "password": senha 
        }
    }).then((response) => {
        expect(response.status).to.equal(200)
        return response.body.authorization
    })
 })


 // Produtos

 Cypress.Commands.add('cadastrarProduto' , (token, produto, preco, descricao, quantidade) =>{
    cy.request({
        method: 'POST', 
        url: 'produtos',
        headers: {authorization: token}, 
        body: {
            "nome": produto,
            "preco": preco,
            "descricao": descricao,
            "quantidade": quantidade
          }, 
          failOnStatusCode: false
    })
 })

 
  // Usuarios

 Cypress.Commands.add('cadastrarUsuario' , (nome, email, senha, administrador) =>{
    cy.request({
        method: 'POST', 
        url: 'usuarios',
        body: {
            "nome": nome,
            "email": email,
            "password": senha,
            "administrador": administrador
          },
          failOnStatusCode: false
    })
 })

 Cypress.Commands.add('BuscarUsuario', (metodo, url) => {
    cy.request({
        method: metodo,
        url: url,
      })
 })

 Cypress.Commands.add('DeletarUsuario', (metodo, url, id) => {
    cy.request({
        method: metodo,
        url: `${url}/${id}`,
      })
 })
 
 
 


 


 