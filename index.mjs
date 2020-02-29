#!/bin/sh
':'; //# ; exec /usr/bin/env node --experimental-modules --no-warnings "$0" "$@"

import trash from 'trash';
import dotenv from 'dotenv';

import { createConfiguration } from './bin/functions/createConfiguration.mjs';
import { createFolder } from './bin/functions/createFolder.mjs';
import { getFromApi } from './bin/functions/getFromApi.mjs';
import { createPage } from './bin/functions/createPage.mjs';
import { writeTokens } from './bin/functions/writeTokens.mjs';
import { writeFile } from './bin/functions/writeFile.mjs';
import { loadFile } from './bin/functions/loadFile.mjs';
import { setupComponents } from './bin/functions/setupComponents.mjs';

import { errorGetData } from './bin/meta/errors.mjs';

(async () => {
  // Setup
  dotenv.config();
  const [, , ...CLI_ARGS] = process.argv;
  const USER_CONFIG_PATH = `${process.cwd()}/.figmagicrc`;
  const CONFIG = await createConfiguration(USER_CONFIG_PATH, ...CLI_ARGS);
  const { token, url, outputFolderBaseFile, outputFolderTokens, outputFileName } = CONFIG;

  // Attempt to get data
  const DATA = await getFromApi(token, url);

  // If there's no data or something went funky, eject
  if (!DATA || DATA.status === 403) throw new Error(errorGetData);

  await trash([`./${outputFolderTokens}`]);
  await trash([`./${outputFolderBaseFile}`]);
  await createFolder(outputFolderTokens);
  await createFolder(outputFolderBaseFile);

  // Write base Figma JSON
  // JSON.stringify(DATA)
  writeFile(DATA, outputFolderBaseFile, outputFileName, 'raw', 'json');

  //console.log(DATA.document.children[2]);

  // Process tokens
  const TOKEN_DATA = createPage(DATA.document.children);
  const TOKENS = writeTokens(TOKEN_DATA.children, CONFIG);

  // Generate components
  let generateComponents = true;

  if (generateComponents) {
    const components = DATA.components;
    const componentSheet = DATA.document.children[2];
    setupComponents(components, componentSheet, TOKENS);
  }
})();
