const axios = require('axios');
const { parseItems } = require('./lib/parseItems');

const URLS = {
    stats: 'http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=730&key={APIKEY}&steamid={STEAMID}',
    player: 'https://playerdb.co/api/player/steam/{PLAYER}'
}

const key = (arr, name) => arr[arr.indexOf(arr.find(x => x.metadata.key == name))].value;

const fetch = (url) => new Promise((resolve, reject) => {

    axios.get(url).then(res => {
        resolve(res.data)
    }).catch(err => {
        reject(err.response.data)
    })

})


class CSAPI {

    /**
     * Use API.fetchUser instead.
     * @param {string} username 
     * @param {string} apiKey 
     * @private // idk if it does something outside of typescript, but there it is
     */
    constructor(username, apiKey) {
        this.username = username;
        this.steamKey = apiKey;
        this._raw = {};
        this.data = {};
    }

    /**
     * Initialize the wrapper
     * @param {string} apiKey 
     * @param {string} username 
     * @returns API instance
     */
    static async fetchUser(username, apiKey) {
        const API = new CSAPI(username, apiKey);
        if (typeof username == 'undefined') throw new Error('You have to provide an username.');
        if (typeof apiKey == 'undefined') throw new Error('You have to provide a Steam API key. You can get one here: https://steamcommunity.com/dev/apikey');
        try {
            /* fetch data */
            API._raw.player = await fetch(URLS.player.replace('{PLAYER}', username))
            if (!API._raw.player?.success) throw new Error(API._raw.player?.message || `Couldn't find a steam user/id with ${username}`)
            API._raw.stats = await fetch(URLS.stats.replace('{STEAMID}', API._raw.player.data.player.id).replace('{APIKEY}', API.steamKey))
            /* parse data */
            API.data = parseItems(API._raw.stats);
        } catch (e) {
            console.log(e)
            if (e?.code == 'steam.invalid_id') throw new Error('Invalid steam username/id.');
            throw new Error(e.message);
        }
        return API;
    }
    /**
     * Get userinfo
     * @returns userinfo
     */
    info() {
        const user = this._raw.player?.data?.player?.meta || {};
        return user;
    }

    /**
     * Get generic stats
     * @returns stats
     */
    stats() {
        const stats = this.data.filter(x => x.category === 'Stats');
        const data = {};
        for (const stat of stats) {
            data[stat.key] = stat.value;
        }
        return data;
    }

    /**
     * Get unkonwn stats
     * @returns stats
     */
    unknown() {
        const stats = this.data.filter(x => x.category === 'Unknown');
        const data = {};
        for (const stat of stats) {
            data[stat.key] = stat.value;
        }
        return data;
    }

    /**
     * Get maps stats
     * @returns maps
     */
    maps() {
        const maps = this.data.filter(x => x.category === 'Maps');
        const wins = maps.filter(x => x.key.endsWith('_wins')).map(x => ({ ...x, key: x.key.replace('_wins', '') }));
        const played = maps.filter(x => x.key.endsWith('_played')).map(x => ({ ...x, key: x.key.replace('_played', '') }));
        const data = {};
        /* just won maps should exist in both won and played rounds  */
        for (const win of wins) {
            const _wins = win.value;
            const _played = played.find(x => x.key == win.key)?.value || 0;
            data[win.key] = {
                wins: _wins,
                played: _played,
                wr: (_wins / _played).toFixed(4),
            };
        }
        return data;
    }

    /**
     * Get weapons stats
     * @returns maps
     */
    weapons() {
        const weapons = this.data.filter(x => x.category === 'Weapons');
        const kills = weapons.filter(x => x.key.endsWith('_kills')).map(x => ({ ...x, key: x.key.replace('_kills', '') }));
        const shots = weapons.filter(x => x.key.endsWith('_shots')).map(x => ({ ...x, key: x.key.replace('_shots', '') }));
        const hits = weapons.filter(x => x.key.endsWith('_hits')).map(x => ({ ...x, key: x.key.replace('_hits', '') }));
        const data = {};
        /* a hit implies a shot */
        for (const hit of hits) {
            const _hits = hit.value;
            const _shots = shots.find(x => x.key == hit.key)?.value || 0;
            const _kills = kills.find(x => x.key == hit.key)?.value || 0;
            data[hit.key] = {
                hits: _hits,
                shots: _shots,
                kills: _kills,
                accuracy: (_hits / _shots).toFixed(4),
                kills_per_shot: (_kills / _shots).toFixed(4),
            };
        }
        return data;
    }

    /**
     * Get last match stats
     * @returns stats
     */
    lastMatch() {
        const stats = this.data.filter(x => x.category === 'LastMatch');
        const data = {};
        for (const stat of stats) {
            data[stat.key] = stat.value;
        }
        return data;
    }

    get raw() { return { ...this._raw, data: this.data } }

}


module.exports = {
    API: CSAPI,
    MAPS: require('./constants/maps'),
    WEAPONS: require('./constants/weapons'),
}