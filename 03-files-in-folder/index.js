const path = require('path');
const fs = require('fs');

const dir = path.join(__dirname, 'secret-folder')

const files = fs.readdir(dir, { withFileTypes: true }, (err, data) => {
    data.forEach(file => {
        if (file.isFile()) {
            const sizeFile = (data) => fs.stat(path.join(__dirname, 'secret-folder', data), (err, stats) => {
                console.log(`${path.basename(file.name, path.extname(file.name))} - ${path.extname(file.name).slice(1)} - ${stats.size}`);
            })
            sizeFile(file.name)
        }
    })
});
