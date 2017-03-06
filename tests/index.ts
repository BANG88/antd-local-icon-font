/**
 * use a cdn version for test purpose.
 */
// const antCss = 'https://unpkg.com/antd@2.7.4/dist/antd.css'

import runner from '../';
console.log(process.cwd());
runner({
    baseDir: './',
    cssPath: 'tests/css/',
    fontsSavedPath: 'tests/fonts/',
    fontsPath: '../fonts/'
})