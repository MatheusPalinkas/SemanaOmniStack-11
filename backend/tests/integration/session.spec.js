const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('Incidents', () => {
    const ongTest = {
        name: 'OngTeste',
        email: 'contato@ongTeste.com',
        whatsapp: '5513999999999',
        uf: 'SP',
        city : 'São Vicente',
        id: '12345678'
    };

    beforeAll(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
            
        await connection('ongs').insert(ongTest);
    });
    afterAll(async () => {
        await connection.destroy();
    });

    it('deve listar os casos de uma ong', async () =>{
        const response = await request(app)
            .post('/session')
            .send({
                id: '12345678'
            });
            
        expect(response.body).toHaveProperty('name');
        expect(response.body.name).toBe('OngTeste');
    })
})