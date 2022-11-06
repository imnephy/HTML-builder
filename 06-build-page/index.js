const fs = require('fs');
const path = require('path');


// CREATE INDEX.HTML
const sourceHtml = path.join(__dirname, 'template.html');
const targetHtml = path.join(__dirname, 'project-dist', 'index.html')
const components = path.join(__dirname, 'components');
 

const inputHtml = fs.createReadStream(sourceHtml, 'utf-8');
const outputHtml = fs.createWriteStream(targetHtml)
inputHtml.pipe(outputHtml)
let indexHtmlContent = fs.createReadStream(targetHtml, 'utf-8');
console.log(indexHtmlContent);
fs.readdir(components, { withFileTypes: true }, (err, data) => {
    if (err) console.log(err.message);
    data.forEach(file => {
        const componentName =  path.basename(file.name, path.extname(file.name));
        switch (componentName){
            case 'articles':{
                // indexHtmlContent.replace()
            };
        };
    })
});





// COPY STYLES IN BUNDLE STYLE.CSS
const sourceCss = path.join(__dirname, 'styles/')
const target = path.join(__dirname, 'project-dist/')


async function createFolder() {
    try {
        const distDir = await fs.promises.mkdir(target, { recursive: true });
        if (distDir) {
            console.log(`created ${distDir}`);
        }
    } catch (err) {
        console.error(err.message);
    }
}
createFolder()


const bundleCss = path.join(__dirname, 'project-dist', 'style.css');
const outputCss = fs.createWriteStream(bundleCss);

fs.readdir(sourceCss, { withFileTypes: true }, (err, data) => {
    if (err) console.log(err.message);
    data.forEach(file => {
        const inputCss = fs.createReadStream(sourceCss + file.name, 'utf-8');
        inputCss.pipe(outputCss);
    })
})

