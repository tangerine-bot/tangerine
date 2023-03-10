const diccionary = require('./dictionary');

const parseItems = (rawdata) => {
    if (!typeof rawdata?.playerstats?.stats === 'array') throw new Error('expected array')
    return (rawdata.playerstats.stats).map(item => {
        if (diccionary[item.name]) {
            const { key, name, category, transform } = diccionary[item.name];
            return {
                key,
                name,
                category,
                value: transform(item.value)
            }
        }
        else {
            return {
                key: item.name,
                name: item.name,
                category: 'Unknown',
                value: item.value
            }
        }
    }).filter(Boolean);
}

module.exports = {
    parseItems,
}