module.exports = {
    isServerBlocked: require('./async/isServerBlocked').process,
    getNameHistory: require('./async/getNameHistory').process,
    getNameAtDate: require('./async/getNameAtDate').process,
    nameToUuid: require('./async/nameToUuid').process,
    uuidToName: require('./async/uuidToName').process,
    getSkin: require('./async/getSkin').process,

    player: require('./async/player').process
};
