const path = require('path');
const fs = require('fs');


const source = path.join(__dirname, 'styles/');
const ext = '.css';

const bundle = path.join(__dirname, 'project-dist', 'bundle.css');
const output = fs.createWriteStream(bundle);

fs.readdir(source, { withFileTypes: true }, (err, data) => {
    if (err) console.log(err.message);
    data.forEach(file => {
        if (path.extname(file.name).toLowerCase() == ext) {
            console.log(`${file.name} was recorded to bundle.css`);
            const input = fs.createReadStream(source + file.name, 'utf-8');
            input.pipe(output);
        }
    })
});