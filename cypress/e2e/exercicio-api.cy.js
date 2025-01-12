/// <reference types="cypress" />

import contrato from '../contracts/usuario.contract'

let  num = Math.floor(Math.random() * 100000000)

describe('Testes da Funcionalidade Usuários', () => {
 
  let id;
 
  it('Deve validar contrato de usuários', () => {
    cy.request('usuarios').then(response => {
      return contrato.validateAsync(response.body)
  })
    
  });

  it('Deve listar usuários cadastrados', () => {
    cy.request({
      method: 'GET',
      url: 'usuarios'
    }).then((response) => {
      expect(response.status).to.equal(200);
    });
  });

  it('Deve cadastrar um usuário com sucesso', () => {
    cy.request({
      method: 'POST',
      url: 'usuarios',
      body: {
        "nome": `pedro_063_${num}`,
        "email": `pedro-063_${num}@qa.com.br`,
        "password": `pedro063_${num}`,
        "administrador": "true"
      },
    }).then((response) => {
      expect(response.status).to.equal(201);
      id = response.body._id;
      
    });
  });

  it('Deve validar um usuário com email inválido', () => {
    cy.request({
      method: 'POST',
      url: 'usuarios',
      failOnStatusCode: false,
      body: {
        "nome": "pedro_016",
        "email": "pedro-016qa.com",
        "password": "pedro016",
        "administrador": "true"
      },
    }).then((response) => {
      expect(response.status).to.equal(400);
    });
  });

  it('Deve editar um usuário previamente cadastrado', () => {
    cy.request({
      method: 'PUT', 
      url: `usuarios/${id}`,
      body: {
        "nome": `pedro_056_${num}`,
        "email": `pedro-056_${num}@qa.com.br`,
        "password": `pedro056_${num}`,
        "administrador": "true"
      }
    }).then((response) => {
      expect(response.status).to.equal(200); 
    });
  });

  it('Deve deletar um usuário previamente cadastrado', () => {
    cy.request({
      method: 'DELETE',
      url: `usuarios/${id}`,
    }).then((response) => {
      expect(response.status).to.equal(200)
    })
    
  });

});

