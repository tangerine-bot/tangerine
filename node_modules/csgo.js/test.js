const { API } = require('./index');
const { STEAM_KEY } = require('./keys.json')

m = (async () => {

    try {
        const user = await API.fetchUser('iFraan_', STEAM_KEY);
        const info = user.info();
        console.log('Info', info)
        const maps = user.maps()
        console.log('Maps: ', maps);
        const stats = user.stats()
        console.log('Stats: ', stats);
        const weapons = user.weapons()
        console.log('Weapons: ', weapons);
        const lastMatch = user.lastMatch()
        console.log('lastMatch: ', lastMatch);
        const unknown = user.unknown()
        console.log('unknown: ', unknown);
        // const raw = user.raw;
        // console.log('raw: ', raw);
    } catch (e) {
        console.log(e)
    }

})

m()