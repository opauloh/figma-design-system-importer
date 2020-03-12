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

          let cont = ``;

          let css = '';
          let markup = '';

          //buildTree(frame.children, cont);

          /* eslint-disable no-inner-declarations */
          function buildTree(tree, container) {
            tree.forEach(function(node) {
              /*
              var el = `<${node.name}>`; //document.createElement(node.tag);

              if (Array.isArray(node.children)) {
                buildTree(node.children, el);
              } else if (typeof node.content == 'object') {
                console.log('zzz');
                buildTree([node.content], el);
              } else {
                console.log('el', el);
                el += `</${node.name}>`;
                //el.innerHTML = node.content;
              }

							container += el; //container.appendChild(el);
							*/
            });

            console.log('xxx', container);
          }

          let lastDepthBeforeChild = 0;

          recurseNew(component, markup, 0);

          function recurseNew(item, html, initialChildDepth, lastDepthBeforeChild) {
            let _childDepth = initialChildDepth;

            //console.log('initialChildDepth', initialChildDepth, 'for', item.id, item.name);
            console.log(html);

            const CHILD_COUNT = (() => {
              if (item.children) {
                return item.children.length;
              } else return 0;
            })();

            if (item.children) {
              function getChildNames() {
                let names = ``;
                item.children.forEach(n => (names += `${n.id} ${n.name}, `));
                names = names.slice(0, names.length - 2);
                return names;
              }

              let _lastDepthBeforeChild = lastDepthBeforeChild;
              _lastDepthBeforeChild = initialChildDepth;

              //console.log('Has', item.children.length, 'children:', getChildNames());

              item.children.forEach(x => {
                //console.log('\n', 'Child:', x.id, x.name, 'with child count:', CHILD_COUNT, '\n');
                const name = x.name.replace(/\//gi, '');

                const newMarkup = `<div class="${name}>`;
                markup += newMarkup;

                let z = markup;
                //z = z.replace(/__ASDF__/i, newMarkup);

                _childDepth++;

                recurseNew(x, z, _childDepth, _lastDepthBeforeChild);
              });
            } else {
              console.log('||||| No more children');
              console.log('initialChildDepth', initialChildDepth);
              console.log('lastDepthBeforeChild', lastDepthBeforeChild);
              console.log('calced distance', initialChildDepth - lastDepthBeforeChild);

              for (let a = 0; a < initialChildDepth - lastDepthBeforeChild; a++) {
                markup += `XXXX</div>`;
              }
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
