const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    });

    it('Deve criar uma ong', async () => {
        const response = await request(app)
            .post('/ongs')
            .send({
                name: "APAD22",
	            email: "contato@contato.com",
	            city: "Rio do sul",
	            whatsapp: "00000000000",
	            uf: "SC"
            });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
    
    it('Deve listar ongs', async () => {
        
        const ongTest = {
            name: 'OngTeste',
            email: 'contato@ongTeste.com',
            whatsapp: '5513999999999',
            uf: 'SP',
            city : 'São Vicente',
            id: '12345678'
        };

        await connection('ongs').insert(ongTest);

        const response = await request(app)
            .get('/ongs');

        expect(response.body[0]).toStrictEqual(ongTest);
    });
});