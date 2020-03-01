import { writeFile } from './writeFile.mjs';
import { inferCssFromComponent } from './inferCssFromComponent.mjs';
import { parseCssFromDescription } from './parseCssFromDescription.mjs';
//import { toPascalCase } from './toPascalCase.mjs';

// Returns array of objects
export function setupComponents(components, componentSheet, tokens) {
  //console.log(componentSheet.children[0].absoluteBoundingBox); ---> { x: -287, y: -367, width: 480, height: 500 }

  const COMPONENTS = (() => {
    const _MATCHES = [];

    //const CREATED_COMPONENTS = [];

    //componentSheet.children[0].children.forEach(component => {
    componentSheet.children.forEach(frame => {
      frame.children.forEach(component => {
        const newComponent = {
          ...component
        };

        const ID = component.id;
        let css = inferCssFromComponent(component);
        if (components[ID]) {
          const { cssString, componentMetadata } = parseCssFromDescription(
            components[ID].description,
            tokens
          );

          css += cssString;

          newComponent.componentMetadata = componentMetadata;
        }

        newComponent.css = css;

        _MATCHES.push(newComponent);
      });
    });

    return _MATCHES;
  })();

  COMPONENTS.forEach(comp => {
    const CSS = comp.css;
    //const NAME = toPascalCase(comp.name);
    const FOLDER = 'components'; //`components/${NAME}`;

    // Write React component
    writeFile(CSS, FOLDER, comp.name, 'component', 'jsx');
    // Write Styled component
    // Pass metadata
    writeFile(CSS, FOLDER, comp.name, 'style', 'jsx', comp.componentMetadata);
    // Write CSS
    writeFile(CSS, FOLDER, comp.name, 'css', 'mjs');
    // Write Storybook component
    //writeFile(CSS, FOLDER, comp.name, 'storybook', 'js');
  });
}
