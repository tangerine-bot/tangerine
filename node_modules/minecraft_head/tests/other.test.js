const mc = require('../src/index');

test('Check Server Block', done => {
    mc.isServerBlocked('playmc.mx')
        .then(data => {
            expect(data).toBe(true);
            done();
        })
        .catch(e => {
            done(e);
        });
});
