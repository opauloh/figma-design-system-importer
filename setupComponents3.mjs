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

          recurseNew(component, markup);

          /* eslint-disable no-inner-declarations */
          function recurseNew(item, html) {
            console.log(html);

            const CHILD_COUNT = (() => {
              if (item.children) {
                return item.children.length;
              } else return 0;
            })();

            if (item.children) {
              item.children.forEach(x => {
                console.log('\n', x.id, x.name, CHILD_COUNT, '\n');
                const name = x.name.replace(/\//gi, '');

                // Add new element
                const newMarkup = `<div class="${name}>__ASDF__</div>`;
                markup += newMarkup;

                let z = markup;
                z = z.replace(/__ASDF__/i, newMarkup);

                // Set final HTML
                //markup = z;

                recurseNew(x, z);

                /*
                let z = html;
                html.replace('a', '∞');
                markup += `<div class="${name}">__ASDF__</div>`;
								recurseNew(x, z);
								*/
              });
            } else {
              console.log('BOOOOM');
              markup += `XXXX</div>`;
              //markup.replace('__ASDF__', `<div class="${item.name}"></div>`);
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
