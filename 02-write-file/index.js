const { stdin, stdout } = process;
const path = require('path');
const fs = require('fs');

const textFile = path.join(__dirname, 'source.txt')
const output = fs.createWriteStream(textFile)

stdout.write('Запись в файл source.txt...\n');
stdin.on('data', data => {
    if (data.toString().trim() === 'exit') {
        process.exit()
    }
    stdout.write('Продолжается запись в source.txt...\n');
    output.write(data)
})
process.on('exit', () => stdout.write('Запись завершена.'));
process.on('SIGINT', () => {
    process.exit()
});
