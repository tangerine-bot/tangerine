const common = require('../common');

/**
 * Get the Player Name from a minecraft player UUID
 * @async
 * @param {Object} player_string - Player Object or a Uuid as a string
 * @returns {Promise<Object>} {name, uuid}
 */
async function uuidToName(player_string) {
    return new Promise((resolve, reject) => {
        common.getUuid(player_string).then(uuid => {
            common
                .get(
                    `https://sessionserver.mojang.com/session/minecraft/profile/${uuid}`
                )
                .then(data => {
                    let json = JSON.parse(data);
                    if (!json.error)
                        resolve({ name: json.name, uuid: json.id });
                    reject(new Error('UUID not Valid'));
                })
                .catch(err => reject(err));
        });
    });
}

module.exports = {
    name: 'uuidToName',
    process: uuidToName
};
