const fs = require('fs');
const path = require('path');

const source = path.join(__dirname, 'files/');
const target = path.join(__dirname, 'filesCopy/');

async function createFolder() {
    try {
        const createDir = await fs.promises.mkdir(target, { recursive: true });
        if (createDir) {
            console.log(`created ${createDir}`);
        }
    } catch (err) {
        console.error(err.message);
    }
}


async function copyFiles() {
    try {
        fs.readdir(source, { withFileTypes: true }, (err, data) => {
            if (err) console.log(err.message);
            data.forEach(file => {
                fs.copyFile(source + file.name, target + file.name, (err) => {
                    if (err) console.log(err.message);
                });
                console.log(`Copied ${source + file.name} to ${target + file.name}`);
            })
        });
    } catch (err) {
        console.error(err.message);
    }
}
createFolder()
copyFiles()