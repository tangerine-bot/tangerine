const common = require('../common');

/**
 * Get the UUID from a minecraft player name
 * @async
 * @param {Object} player_string - Player Object or a Uuid as a string
 * @returns {Promise<Object>} {name, uuid}
 */
function nameToUuid(player_string) {
    return new Promise((resolve, reject) => {
        common.getName(player_string).then(name => {
            common
                .get(`https://api.mojang.com/users/profiles/minecraft/${name}`)
                .then(data => {
                    if (data === '') reject(new Error('Player Not Found'));
                    let json = JSON.parse(data);
                    resolve({ name: json.name, uuid: json.id });
                })
                .catch(err => reject(err));
        });
    });
}

module.exports = {
    name: 'nameToUuid',
    process: nameToUuid
};
