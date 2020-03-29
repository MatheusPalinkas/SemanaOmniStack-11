const generateUniqueId = require('../../src/utils/generateUniqueId');

describe('Gerar ID unico', () => {
    it('Deve gerar um ID unico', () => {
        const id = generateUniqueId();

        expect(id).toHaveLength(8);
    });
});