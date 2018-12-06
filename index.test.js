const { describe, it, expect } = require('mocha-sinon-chai')

const data = require('./data');
const search = require('./index');

const complexQuery = require('./complexQuery');
const simpleQuery = require('./simpleQuery');
const allFieldQuery = require('./allFieldQuery');

describe('When searching a tree', () => {
    describe('and the tree is complex', () => {
        it('should find all results', () => {
            expect(search(data, complexQuery))
                .to.deep.have.members([
                    { Manufacturer: 'Opel', transmittionType: 'Manual' },
                    { Manufacturer: 'Audi', transmittionType: 'Manual' },
                    { Manufacturer: 'Vauxhall', transmittionType: 'Manual' },
                    { Manufacturer: 'Audi', transmittionType: 'Automatic' }
                ]);
        });
    });

    describe('and it is a very simple tree', () => {
        it('should find all results', () => {
            expect(search(data, simpleQuery))
                .to.deep.equal([
                    { Manufacturer: 'Opel', transmittionType: 'Manual' }
                ]);
        });
    })

    describe('and it is empty', () => {
        const simpleQuery = [{
            op: "AND",
            leaves: [
            ]
        }];

        it('should find no results', () => {
            expect(search(data, simpleQuery))
                .to.deep.equal([]);
        });
    })

    describe('and field is missing', () => {
        it('should find all results that have a partial match', () => {
            expect(search(data, allFieldQuery))
                .to.deep.equal([
                    {
                        Manufacturer: "Audi",
                        transmittionType: "Manual"
                    },
                    {
                        Manufacturer: "Vauxhall",
                        transmittionType: "Manual"
                    },
                    {
                        Manufacturer: "BMW",
                        transmittionType: "Automatic"
                    },
                    {
                        Manufacturer: "Audi",
                        transmittionType: "Automatic"
                    }
                ]);
        });
    })

    describe('and the operator is invalid', () => {
        const simpleQuery = [{
            op: "BLAH",
            leaves: [
            ]
        }];

        it('should find no results', () => {
            expect(search(data, simpleQuery))
                .to.deep.equal([]);
        });
    })
});