const common = require('../common.js');

/**
 *  Get the name of the player at a given date.
 *  Due to API limitations anything before the first name change will be the accounts original name.
 * @async
 * @param {Object} player_string Player Object or a Uuid as a string
 * @param {Date} date The Date to get the name at
 * @returns {Promise<String>} The name in plain Text
 */
function getNameAtDate(player_string, date) {
    return new Promise((resolve, reject) => {
        common.getUuid(player_string).then(uuid => {
            common
                .get(`https://api.mojang.com/user/profiles/${uuid}/names`)
                .then(data => {
                    data = JSON.parse(data);
                    let name = data[0].name;
                    data.forEach(e => {
                        if (typeof e.changedToAt !== 'undefined')
                            e.changedToAt = new Date(e.changedToAt);
                        if (e.changedToAt <= date) name = e.name;
                    });
                    resolve(name);
                })
                .catch(err => reject(err));
        });
    });
}

module.exports = {
    name: 'getNameAtDate',
    process: getNameAtDate
};
