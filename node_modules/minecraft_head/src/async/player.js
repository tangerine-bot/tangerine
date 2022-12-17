const nameToUuid = require('./nameToUuid').process;
const uuidToName = require('./uuidToName').process;

/** Player Object */
class player {
    /**
     * @param name_uuid - A Player Name or Player Uuid
     */
    constructor(name_uuid) {
        this.NAME = null;
        this.UUID = null;
        if (name_uuid.length <= 16) this.NAME = name_uuid;
        else this.UUID = name_uuid;
    }

    /**
     * Get the Uuid for a player
     * @returns {Promise<string>}
     */
    get uuid() {
        let player = this;
        return new Promise((resolve, reject) => {
            if (player.UUID !== null) resolve(player.UUID);
            else
                nameToUuid(player.NAME)
                    .then(d => resolve(d.uuid))
                    .catch(e => reject(e));
        });
    }

    /**
     * Get the Name for a Player
     * @returns {Promise<string>}
     */
    get name() {
        let player = this;
        return new Promise((resolve, reject) => {
            if (player.NAME !== null) resolve(player.NAME);
            else
                uuidToName(player.UUID)
                    .then(d => resolve(d.name))
                    .catch(e => reject(e));
        });
    }
}

module.exports = {
    name: 'player',
    process: player
};
