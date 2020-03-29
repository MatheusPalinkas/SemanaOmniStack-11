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

    });
    afterAll(async () => {
        await connection.destroy();
    });

    it('Deve criar um caso', async () => {
        const response = await request(app)
            .post('/incidents')
            .set('authorization', '12345678')
            .send(incidentTest);
        
        expect(response.body).toHaveProperty('id');
        expect(typeof response.body.id).toBe('number');
    });
    
    it('Deve listar os casos', async () => {
        const response = await request(app)
            .get('/incidents');
            
        expect(response.body).toHaveLength(1);
        expect(response.body[0].id).toBe(1);
        expect(response.body[0].ong_id).toBe(ongTest.id);
    });

    it('Deve deletar um caso um caso', async () => {
        const response = await request(app)
            .delete('/incidents/1')
            .set('authorization', '12345678');
        

        expect(response.body).toStrictEqual({});
    });
});