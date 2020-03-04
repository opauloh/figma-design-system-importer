import { writeFile } from './writeFile.mjs';
import { createHtml } from './createHtml.mjs';
import { generateHtml } from './generateHtml.mjs';
import { inferCssFromComponent } from './inferCssFromComponent.mjs';
import { parseCssFromDescription } from './parseCssFromDescription.mjs';
//import { toPascalCase } from './toPascalCase.mjs';

// Returns array of objects
export function setupComponents(components, componentSheet, tokens) {
  //console.log(componentSheet.children[0].absoluteBoundingBox); ---> { x: -287, y: -367, width: 480, height: 500 }

  const COMPONENTS = (() => {
    const _MATCHES = [];

    //const CREATED_COMPONENTS = [];

    // Check all frames
    componentSheet.children.forEach(frame => {
      // Check all components in frame
      frame.children.forEach(component => {
        if (component.name === 'TestComponent') {
          const newComponent = {
            ...component
          };

          let css = '';
          let markup = '';
          let depth = 0;
          let branchElements = 0;
          let depthBeforeLastChild = 0;
          let elementStack = [];

          recurse(component, null, null, depth);

          /* eslint-disable no-inner-declarations */
          function recurse(comp, parentName, parentId, depth) {
            comp.children.forEach(item => {
              css += inferCssFromComponent(item);

              //markup += generateHtml(css);
              let { html, createdElement } = createHtml(item);
              markup += html;

              elementStack[depth] = [createdElement];
              elementStack[depth][branchElements] = [createdElement];

              if (item.children) {
                markup += `% REC @ D${depth}, B${branchElements}; ${createdElement} %`;
                depth += 1;
                depthBeforeLastChild += 1;
                recurse(item, comp.name, comp.id, depth);
              } else if (!item.children) {
                //let name = comp.name.replace(/\//gi, '');
                for (let x = 0; x < elementStack[depth][branchElements].length; x++) {
                  markup += `% CLOSE ${elementStack[depth][branchElements][x]} @ D${depth} %`;
                  markup += `</${elementStack[depth][branchElements][x]}>`;
                }

                if (depthBeforeLastChild > 0) {
                  for (let d = 0; d < depth - depthBeforeLastChild; d++) {
                    for (let z = 0; z < elementStack[depth][branchElements].length; z++) {
                      markup += `% CLOSING PREV ${elementStack[depth][branchElements][d]} @ D${depth} %`;
                      markup += `</${elementStack[depth][branchElements][d]}>`; //? no [d]?
                    }
                  }
                }
              } else {
                console.log('ASDF ASDF ASDF');
              }
            });
          }

          const ID = component.id;

          if (components[ID]) {
            const { cssString, metadata } = parseCssFromDescription(
              components[ID].description,
              tokens
            );

            css += cssString;

            newComponent.metadata = metadata;
          }

          // HACK, REMOVE LATER?
          newComponent.metadata = {};

          newComponent.css = css;
          newComponent.metadata.markup = markup;

          _MATCHES.push(newComponent);
        }
      });
    });

    return _MATCHES;
  })();

  COMPONENTS.forEach(comp => {
    const CSS = comp.css;

    // TODO: Add folder support, e.g. `components/${NAME}`
    //const NAME = toPascalCase(comp.name);
    const FOLDER = 'components';

    // Write React component
    writeFile(CSS, FOLDER, comp.name, 'component', 'jsx', comp.metadata);

    // Write Styled component, and pass metadata
    writeFile(CSS, FOLDER, comp.name, 'style', 'jsx', comp.metadata);

    // Write CSS
    writeFile(CSS, FOLDER, comp.name, 'css', 'mjs');

    // Write Storybook component
    //writeFile(CSS, FOLDER, comp.name, 'storybook', 'js');
  });
}
