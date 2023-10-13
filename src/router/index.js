const fs = require('fs');
const { promisify }  = require('util');
const path = require('path');
const { checkJwt } = require('../services/auth')

const readFilePromise = promisify(fs.readdir)

const notIndexjs = 'index.js'

const readFolder = async () => {
    const file = path.join(__dirname, '../', 'controller');
    const result = await readFilePromise(file);
    return {
        folders: result.filter(val => val !== notIndexjs),
        dirFile: file
    }
}

const rulesCreateRouter = (folders, dirFile, app) => {
    for (let index = 0; index < folders.length; index++) {
        const controller = require(`${dirFile}/${folders[index]}`)
        let middlewares = controller?.middlewares
        if (controller.auth) middlewares = [checkJwt, ...middlewares]
        if (controller?.middlewares?.length > 0) {
            app[controller.method](controller.path, ...middlewares, controller.handler) 
        } else  app[controller.method](controller.path, controller.handler) 
    }
}

const routerAuto = (readFolder, rulesCreateRouter) => async (app) => {
    const { folders, dirFile } = await readFolder()
    rulesCreateRouter(folders, dirFile, app)
}

module.exports = routerAuto(readFolder, rulesCreateRouter)