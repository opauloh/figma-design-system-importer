import { writeFile } from './writeFile.mjs';

// Returns array of objects
export function setupComponents(components, componentSheet) {
  // Match component data with the component metadata
  //console.log('XXXXX', componentSheet.children[0].children);

  const COMPONENTS = (() => {
    const _matches = [];

    componentSheet.children[0].children.forEach(component => {
      const newComponent = {
        ...component
      };

      const id = component.id;
      const css = parseCssFromDescription(components[id].description);
      newComponent.css = css;

      //console.log(component.children);

      _matches.push(newComponent);
    });

    return _matches;
  })();

  COMPONENTS.forEach(comp => {
    // Write React component
    writeFile(comp.css, 'components', comp.name, 'component', 'mjs');
    // Write Styled component
    writeFile(comp.css, 'components', comp.name, 'style', 'mjs');
    // Write CSS
    writeFile(comp.css, 'components', comp.name, 'css', 'mjs');
  });
}

// Return object that can be stringified later
function parseCssFromDescription(desc) {
  // Replace pseudo-code with token values
  desc = desc.replace('$small', '1rem');
  desc = desc.replace('$medium', '2rem');
  desc = desc.replace('$huge', '3rem');

  // Replace newline with literal "new line", via template literal string
  desc = desc.replace(
    /\n/g,
    `;
`
  );

  return desc;

  /*
  // Create an object-type component
  const CSS = {};

  desc.split(/\n/).forEach(el => {
    let parts = el.split(/\n/);

    parts.forEach(elem => {
      const SPLIT = elem.split(/:/);
      CSS[SPLIT[0]] = SPLIT[1];
    });
  });

  console.log(CSS);

	return CSS;
	*/
}
