/**
 * use a cdn version for test purpose.
 */
// const antCss = 'https://unpkg.com/antd/dist/antd.min.css'

import runner from '../';

runner({
    baseDir: process.cwd(),
    cssPath: 'tests/css/',
    fontsPathToSave: 'tests/fonts/',
    newFontsPath: '../fonts/'
})