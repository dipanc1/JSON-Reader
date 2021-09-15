const fs = require('fs');
const path = require('path')

const jsonsInDir = fs.readdirSync('json').filter(file => path.extname(file) === '.json');

jsonsInDir.forEach(file => {
    const fileData = fs.readFileSync(path.join('json', file));
    const json = JSON.parse(fileData.toString());
});