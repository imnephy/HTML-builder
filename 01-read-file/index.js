const fs = require('fs');
const path = require('path');
const textFile = path.join(__dirname, 'text.txt')
const readableStream = fs.createReadStream(textFile, 'utf-8');

let data = '';

readableStream.on('data', chunk => data += chunk);
readableStream.on('end', () => console.log(data));