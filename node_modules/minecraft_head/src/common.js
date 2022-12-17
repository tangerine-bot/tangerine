const crypto = require('crypto');
const https = require('https');

/**
 * Send a Get Request
 * @async
 * @param uri {String} The Uri to get
 * @returns {Promise<String>} Response
 */
function get(uri) {
    return new Promise((resolve, reject) => {
        let req = https.get(uri, response => {
            let data = '';
            response.on('data', chunk => (data += chunk));
            response.on('end', () => resolve(data));
        });
        req.on('error', reject);
    });
}

/**
 * Send a POST request
 * @async
 * @param data {String} Json Data
 * @param hostname {string} Server Hostname
 * @param port {Number} Server Port
 * @param path {String} Resource Path
 * @returns {Promise<String>} Response
 */
function post(data, hostname, port, path) {
    return new Promise((resolve, reject) => {
        data = JSON.stringify(data);
        const options = {
            hostname: hostname,
            port: port,
            path: path,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length
            }
        };

        const req = https.request(options, res => {
            let todo = '';
            res.on('data', d => (todo += d));
            res.on('end', () => resolve(todo));
        });
        req.on('error', reject);
        req.write(data);
        req.end();
    });
}

/**
 * Decode a Base64 encoded string
 * @param base64 {String} String to Decode
 * @returns {string}
 */
function base64Decode(base64) {
    let buff = Buffer.from(base64, 'base64');
    return buff.toString('utf-8');
}

/**
 * Create a uuid in hex
 * @returns {String} Hex Uuid as a string
 */
function uuidHex() {
    return crypto.randomBytes(16).toString('hex');
}

/**
 * Check if a url / ip is in the server Blocklist.
 * Not really a common function but you cant stop me!
 * @param url {String} Url / Ip to Check
 * @param blocked {Array<String>} Hashed Array of blocked servers
 * @returns {boolean} True / False
 */
function checkIfBlocked(url, blocked) {
    let shaSum = crypto.createHash('sha1');
    shaSum.update(url);
    url = shaSum.digest('hex');
    return blocked.indexOf(url) > -1;
}

/**
 * Get The Uuid for a Player Object / Uuid String
 * @param player_string {Object} Player Object / Uuid String
 * @returns {Promise<String>} Uuid
 */
function getUuid(player_string) {
    return new Promise(resolve => {
        if (typeof player_string === 'object') player_string.uuid.then(resolve);
        else resolve(player_string);
    });
}

/**
 * Get player name from a Player object / Name string
 * @param player_string {Object} Player Object / Name String
 * @returns {Promise<String>} Player Name
 */
function getName(player_string) {
    return new Promise(resolve => {
        if (typeof player_string === 'object') player_string.name.then(resolve);
        else resolve(player_string);
    });
}

module.exports = {
    checkIfBlocked: checkIfBlocked,
    base64Decode: base64Decode,
    getName: getName,
    getUuid: getUuid,
    uuidHex: uuidHex,
    post: post,
    get: get
};
