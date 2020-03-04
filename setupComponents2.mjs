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

          //recurse(component, null, null, depth);

          let elementStack = [];
          let depth = 0;
          let depthToLastChild = 0;

          markup = recurseNew(component, elementStack, depth, markup);

          /* eslint-disable no-inner-declarations */
          function recurseNew(item, elements, d, parent, html) {
            if (parent) {
              if (parent.children) {
                console.log('Parent has children?', parent.children.length > 0);
              }
              depthToLastChild++;
            }

            const CHILD_LENGTH = (() => {
              if (item.children) {
                return item.children.length;
              } else return 0;
            })();

            console.log('\n');
            console.log(item.id, item.name);
            console.log('Elements length', elements.length, 'Children', CHILD_LENGTH);
            console.log('Depth To Last Child', depthToLastChild);

            if (item.children) {
              item.children.forEach(x => {
                const name = x.name.replace(/\//gi, '');
                html += `<div class="${name}">`;

                if (item.children) {
                  elementStack.push('div');
                  return recurseNew(x, elementStack, depthToLastChild, item, html);
                }
              });
            } else {
              console.log('BOOOOM');
              const els = elements.reverse();

              for (let z = 0; z < d; z++) {
                html += `XXX</${els[z]}>`;
                depthToLastChild--;
                console.log('updated depthToLastChild', depthToLastChild);
              }

              console.log('html', html);

              elementStack = [];
              return html;
              //depthToLastChild = 0;
            }
          }

          console.log('markup', markup);

          /*
          function recurse(comp, parentName, parentId, depth) {
            comp.children.forEach(item => {
              css += inferCssFromComponent(item);
              let { html, createdElement } = createHtml(item); //generateHtml(css);
              markup += html;
            });
					}
					*/

          /*
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
					*/
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
    //writeFile(CSS, FOLDER, comp.name, 'component', 'jsx', comp.metadata);

    // Write Styled component, and pass metadata
    //writeFile(CSS, FOLDER, comp.name, 'style', 'jsx', comp.metadata);

    // Write CSS
    //writeFile(CSS, FOLDER, comp.name, 'css', 'mjs');

    // Write Storybook component
    //writeFile(CSS, FOLDER, comp.name, 'storybook', 'js');
  });
}
