import fs from 'fs';

import { setupComponents } from './bin/functions/setupComponents.mjs';

(() => {
  let rawdata = fs.readFileSync('figma/figma.json');
  const DATA = JSON.parse(rawdata);

  const components = DATA.components;
  const componentSheet = DATA.document.children[2];

  setupComponents(components, componentSheet);
})();
