const common = require('../common');

/**
 * Get player skin Url from UUID
 * @async
 * @param {Object} uuid_player - Player Object or a Uuid as a string
 * @returns {Promise<Object>} {skin, cape}
 */
function getSkin(uuid_player) {
    return new Promise((resolve, reject) => {
        common.getUuid(uuid_player).then(uuid => {
            common
                .get(
                    `https://sessionserver.mojang.com/session/minecraft/profile/${uuid}`
                )
                .then(data => {
                    let json = JSON.parse(data);
                    if (json.properties) {
                        let properties = JSON.parse(
                            common.base64Decode(json.properties[0].value)
                        );
                        let cape =
                            properties &&
                            properties.textures &&
                            typeof properties.textures.CAPE !== 'undefined'
                                ? properties.textures.CAPE.url
                                : false;
                        resolve({
                            skin: properties.textures.SKIN.url,
                            cape: cape || false
                        });
                    }
                    reject(new Error('UUID not Valid'));
                })
                .catch(err => reject(err));
        });
    });
}

module.exports = {
    name: 'getSkin',
    process: getSkin
};
