const fs = require('fs');
const { readFile } = require('fs/promises');
const path = require('path');


// CREATE INDEX.HTML
const sourceHtml = path.join(__dirname, 'template.html');
const targetHtml = path.join(__dirname, 'project-dist', 'index.html')
const components = path.join(__dirname, 'components');

async function createHtml() {
    try {
        let dataTemplate = await fs.promises.readFile(sourceHtml, 'utf-8');
        const componentsHtml = await fs.promises.readdir(components);
        for (let i = 0; i < componentsHtml.length; i++) {
            let basenameFile = componentsHtml[i].split('.')[0];
            let componentData = await readFile(path.join(components, componentsHtml[i]), 'utf-8');
            dataTemplate = dataTemplate.replace(`{{${basenameFile}}}`, componentData);
            await fs.promises.writeFile(targetHtml, dataTemplate)
        }
    } catch (error) {
        console.log(error.message);
    }
}





// COPY STYLES IN BUNDLE STYLE.CSS
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
createHtml()

const bundleCss = path.join(__dirname, 'project-dist', 'style.css');
const cssSource = path.join(__dirname, 'styles')

async function bundleCssF() {
    const cssData = await fs.promises.readdir(cssSource);
    for (let i = 0; i < cssData.length; i++) {
        let fileCssContent = await fs.promises.readFile(path.join(cssSource, cssData[i]), 'utf-8');
        await fs.promises.appendFile(bundleCss, fileCssContent);
    }
}

bundleCssF()

//COPY ASSETS
const assetsSource = path.join(__dirname, 'assets')
const assetsTarget = path.join(__dirname, 'project-dist', 'assets')



async function copyAssets(source, target) {
    try {
        await fs.promises.rm(target, { recursive: true, force: true });
        await fs.promises.mkdir(target, { recursive: true });
        const assetsContent = await fs.promises.readdir(source, { withFileTypes: true });
        for (let i = 0; i < assetsContent.length; i++) {
            if (assetsContent[i].isFile()) {
                await fs.promises.copyFile(path.join(source, assetsContent[i].name), path.join(target, assetsContent[i].name));
            } else {
                copyAssets(path.join(source, assetsContent[i].name), path.join(target, assetsContent[i].name))
            }

        }

    } catch (error) {
        console.log(error.message);
    }
}

copyAssets(assetsSource, assetsTarget)