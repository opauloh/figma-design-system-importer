import fs from 'fs';

import { createFolder } from './createFolder.mjs';
import { loadFile } from './loadFile.mjs';

import { errorWriteFile, errorWrite } from '../meta/errors.mjs';

/**
 * Exposed function that handles writing files to disk
 *
 * @exports
 * @function
 * @param {string} file - File contents
 * @param {string} path - File path minus file name
 * @param {string} name - File name
 * @param {string} type - What type of file is going to be written
 * @param {string} format - File format
 */
export function writeFile(file, path, name, type, format = 'mjs') {
  if (!file || !path || !name || !type) throw new Error(errorWriteFile);

  createFolder(path);
  write(file, path, name, type, format);
}

/**
 * Local helper that does most of the actual formatting and writing of the file
 *
 * @async
 * @function
 * @param {string} file - File contents
 * @param {string} path - File path minus file name
 * @param {string} name - File name
 * @param {string} type - What type of file is going to be written
 * @param {string} format - File format
 * @returns {Promise} - Returns promise from wrapped fs.writeFile
 */
async function write(file, path, name, type, format) {
  const _TYPE = type.toLowerCase();
  if (_TYPE !== 'token' && _TYPE !== 'component' && _TYPE !== 'style' && _TYPE !== 'css') return;

  let fileContent = file;
  let filePath = `${path}/${name}`;

  console.log(type);

  if (type.toLowerCase() === 'token') {
    fileContent = `const ${name} = ${JSON.stringify(file, null, ' ')}\n\nexport default ${name};`;
    filePath += `.${format}`;
  }

  if (type.toLowerCase() === 'component') {
    const suffix = 'Styled';

    let reactTemplate = await loadFile('templates/react.mjs', true);
    reactTemplate = reactTemplate.replace(/{{NAME}}/g, name);
    reactTemplate = reactTemplate.replace(/{{NAME_STYLED}}/g, `${name}${suffix}`);
    fileContent = `${reactTemplate}`;
    filePath += `.${format}`;

    // Works for an object-type component
    /*
    let component = JSON.stringify(file, null, ' ');
    component = component.slice(1, component.length);
    component = component.slice(0, component.length - 1);
    fileContent = `const ${name} = \`${component}\`\n\nexport default ${name};`;
		filePath += `.${format}`;
		*/
  }

  if (type.toLowerCase() === 'style') {
    const suffix = 'Styled';

    let cssTemplate = await loadFile('templates/styled.mjs', true);
    cssTemplate = cssTemplate.replace(/{{NAME_CSS}}/g, `${name}Css`);
    cssTemplate = cssTemplate.replace(/{{NAME_STYLED}}/g, `${name}${suffix}`);
    fileContent = `${cssTemplate}`;
    filePath += `${suffix}.${format}`;
  }

  if (type.toLowerCase() === 'css') {
    const suffix = 'Css';
    fileContent = `const ${name}${suffix} = \`${file}\`\n\nexport default ${name}${suffix};`;
    filePath += `${suffix}.${format}`;
  }

  return await new Promise((resolve, reject) => {
    try {
      fs.writeFile(filePath, fileContent, 'utf-8', error => {
        if (error) throw new Error(`${errorWrite}: ${error}`);
        resolve(true);
      });
    } catch (error) {
      reject(error);
    }
  });
}
