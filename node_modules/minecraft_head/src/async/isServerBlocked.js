const common = require('./../common');
const net = require('net');

/**
 * Checks if a minecraft server url / ip is blocked
 * @async
 * @param {String} server - Server Url / Ip
 * @returns {Promise<Boolean>} True / False
 */
function isServerBlocked(server) {
    return new Promise((resolve, reject) => {
        common
            .get('https://sessionserver.mojang.com/blockedservers')
            .then(data => {
                let blocked = data.split('\n');
                let parts = server.split('.');
                let isBlocked = false;

                if (net.isIP(server) === 4) {
                    isBlocked =
                        common.checkIfBlocked(parts.join('.'), blocked) ||
                        isBlocked;
                    for (let i = 0; i <= parts.length; i++) {
                        parts.pop();
                        isBlocked =
                            common.checkIfBlocked(
                                `${parts.join('.')}.*`,
                                blocked
                            ) || isBlocked;
                    }
                    resolve(isBlocked);
                }

                isBlocked =
                    common.checkIfBlocked(parts.join('.'), blocked) ||
                    isBlocked;
                for (let i = 0; i <= parts.length; i++) {
                    isBlocked =
                        common.checkIfBlocked(
                            `*.${parts.join('.')}`,
                            blocked
                        ) || isBlocked;
                    parts.shift();
                }
                resolve(isBlocked);
            })
            .catch(err => reject(err));
    });
}

module.exports = {
    name: 'isServerBlocked',
    process: isServerBlocked
};
