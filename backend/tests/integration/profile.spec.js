const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('Incidents', () => {
    const incidentTest = {
        title: "incidentTest",
        description: "incident test integration",
        value: 99
    };
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
        await connection('incidents').insert({ong_id: '12345678',...incidentTest});
        await connection('incidents').insert({ong_id: '12345678',...incidentTest});

    });
    afterAll(async () => {
        await connection.destroy();
    });

    it('deve listar os casos de uma ong', async () =>{
        const response = await request(app)
            .get('/profile')
            .set('authorization', '12345678');

        expect(response.body).toHaveLength(2);
        expect(response.body[0].id).toBe(1);
        expect(response.body[1].id).toBe(2);
    })
})