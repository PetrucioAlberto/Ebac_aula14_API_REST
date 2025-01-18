/// <reference types="cypress" />

import { faker } from '@faker-js/faker'; 

import contrato from '../contracts/usuario.contract';

let num = Math.floor(Math.random() * 100000000);

describe('Testes da Funcionalidade Usuários', () => {
 
  it('Deve validar contrato de usuários', () => {
    cy.request('usuarios').then((response) => {
      return contrato.validateAsync(response.body);
    });
  });

  it('Deve listar usuários cadastrados', () => {
    cy.BuscarUsuario('GET','usuarios').then((response) => {
      expect(response.status).to.equal(200);
    })
  });

  it('Deve cadastrar um usuário com sucesso', () => {
    const Name = faker.name.firstName() + num; 
    const Email = `${faker.name.firstName()}@${num}qa.com.br`;
    const Password = faker.internet.password();
    const Admin = "true";
    cy.cadastrarUsuario(Name, Email, Password, Admin).then((response) => {
      expect(response.status).to.equal(201);
    });
  });

  it('Deve validar um usuário com email inválido', () => {
    cy.request({
      method: 'POST',
      url: 'usuarios',
      failOnStatusCode: false,
      body: {
        nome: 'pedro_016',
        email: 'pedro-016qa.com',
        password: 'pedro016',
        administrador: 'true',
      },
    }).then((response) => {
      expect(response.status).to.equal(400);
    });
  });

  it('Deve editar um usuário previamente cadastrado', () => {
    const Name = faker.name.firstName() + num;
    const Email = `${faker.name.firstName()}@${num}qa.com.br`;
    const Password = faker.internet.password();
    const Admin = "true";
  
    cy.cadastrarUsuario(Name, Email, Password, Admin).then((response) => {
      let id = response.body._id;

      cy.request({
        method: 'PUT',
        url: `usuarios/${id}`,
        body: {
          nome: Name,
          email: Email,
          password: Password,
          administrador: 'true',
        },
      }).then((response) => {
        expect(response.status).to.equal(200);
      }); 
    }); 
  });

 
  it('Deve deletar um usuário previamente cadastrado', () => {

    const Name = faker.name.firstName() + num;
    const Email = `${faker.name.firstName()}@${num}qa.com.br`;
    const Password = faker.internet.password();
    const Admin = "true";
  
    cy.cadastrarUsuario(Name, Email, Password, Admin).then((response) => {
      let id = response.body._id;
      
      cy.DeletarUsuario('DELETE','usuarios',id).then((response) => {
        expect(response.status).to.equal(200);
      })
      
    });
  });
});

