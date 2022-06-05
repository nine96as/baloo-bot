const fs = require('fs');

const getFiles = (path, endings) => {
    return fs.readdirSync(path).filter(f => f.endsWith(endings));
}

module.exports = {
    getFiles
}