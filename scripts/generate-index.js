import {
    copyDirAsync,
    readFileAsync,
    writeFileAsync,
    templateAsync,
    unlinkAsync,
    execAsync,
    emptyDir,
    glob
} from 'grimoirejs-build-env-base';
import {
    getFileNameBody,
    getRelativePath
} from './pathUtil';
import txt2js from './txt2js';
import {argv} from 'yargs';

export default async function(config) {
    await copyDirAsync('./src', './lib-ts', true);
    let index = await readFileAsync('./src/index.ts');
    if(argv.b){
      index = "import 'babel-polyfill';" + index;
    }
    const files = await glob('./lib-ts/**/*.ts');
    await writeFileAsync('./lib-ts/entry_files', files.join('\n'));
}
