import * as http from 'http';
import * as fs from 'fs';
import * as path from 'path';
export const formatUrl = (url: string) => url.replace(/https:/g, 'http:')
/**
 * download file 
 * @param url res should be download
 * @param dest where should we put the downloaded file interface
 * @param cb when the download task is done or has en error occured
 */
export const downloader = function (url: string, dest: string, cb: Function) {
    const file = fs.createWriteStream(dest)
    url = formatUrl(url)

    console.log(`Downloading ${url}...`);

    const request = http.get(url, function (response) {
        response.pipe(file)
        file.on('finish', function () {
            file.close(); // close() is async, call cb after close completes.
            cb(null, file);
            console.log(`Download ${url} done.`);
        })
    }).on('error', function (err) { // Handle errors
        fs.unlink(dest); // Delete the file async. (But we don't check the result)
        if (cb) cb(err.message)
        console.log(`Download ${url} fail.`);
    })
}
/**
 * find file 
 * @param input destination 
 * @param cb 
 */
export const finder = function (input: string, cb: (content: Buffer, filePath: string) => void) {
    const files = fs.readdirSync(input)
    files.forEach(function (file) {
        if (file && path.extname(file) === '.css') {
            const filePath = input + '/' + file
            const content = fs.readFileSync(filePath)
            cb(content, filePath)
        }
    })
}
const reg = /((\w+:\/\/)[-a-zA-Z0-9:@;?&=\/%\+\.\*!'\(\),\$_\{\}\^~\[\]'#|]+)/g

export interface RunnerOptions {
    /**
     * base dir
     * 
     * @type {string}
     * @memberOf RunnerOptions
     */
    baseDir?: string
    /**
     * path to css folder 
     * 
     * @type {string}
     * @memberOf RunnerOptions
     */
    cssPath?: string
    /**
     * 
     * 
     * @type {string}
     * @memberOf RunnerOptions
     */
    fontsPathToSave?: string
    newFontsPath?: string
    /**
     * regexp for match fonts url 
     * the default reg is: /((\w+:\/\/)[-a-zA-Z0-9:@;?&=\/%\+\.\*!'\(\),\$_\{\}\^~\[\]'#|]+)/g
     * 
     * @type {RegExp}
     * @memberOf RunnerOptions
     */
    urlReg?: RegExp
    fontReg?: RegExp
    iconUrl?: string
}
const getPath = (...p) => path.resolve(...p)
// finding files and replace it 
const runner = (
    {
        baseDir,
        fontsPathToSave = process.cwd() + '/build/static/fonts/',
        iconUrl = 'https://at.alicdn.com/t/',
        fontReg = /@font-face{font-family:anticon;src:url(.*)}$/g,
        urlReg = reg,
        cssPath =  process.cwd() + '/build/static/css/',
        newFontsPath = '/static/fonts/'
    }: RunnerOptions = {}) => {
    if (baseDir !== '') {
        fontsPathToSave = getPath(baseDir, fontsPathToSave)
        cssPath = getPath(baseDir, cssPath)
    }

    return finder(cssPath, function (content, filePath) {
        const cssContents = content.toString()
        const m = cssContents.match(urlReg)
        if (m) {
            // create fonts folder if not exists
            if (!fs.existsSync(fontsPathToSave)) {
                fs.mkdir(fontsPathToSave, function (err) {
                    if (err) {
                        throw err
                    }
                    console.log(`mkdir ${fontsPathToSave} success`)
                })
            }
            m.forEach(function (item) {
                const itemInfo = path.parse(item)

                const shortname = itemInfo.base.replace(/((\?|#).*)/g, '')

                downloader(item, fontsPathToSave + '/' + shortname, function (err, c) {
                    if (err) {
                        throw err
                    }
                    const replacedContents = cssContents.replace(new RegExp(iconUrl, 'gi'), newFontsPath)
                    fs.writeFile(filePath, replacedContents, function (err) {
                        if (err) {
                            throw err
                        }
                        console.log('replace ' + shortname + ' done.')
                    })
                })
            })
        } else {
            console.log('no results founded.')
        }
    })
}

export default runner