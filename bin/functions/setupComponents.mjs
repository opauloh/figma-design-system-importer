import { writeFile } from './writeFile.mjs';
import { convertHexToRgba } from './convertHexToRgba.mjs';
//import { toPascalCase } from './toPascalCase.mjs';

// Returns array of objects
export function setupComponents(components, componentSheet, tokens) {
  //console.log(componentSheet.children[0].absoluteBoundingBox); ---> { x: -287, y: -367, width: 480, height: 500 }

  const COMPONENTS = (() => {
    const _MATCHES = [];

    componentSheet.children[0].children.forEach(component => {
      const newComponent = {
        ...component
      };

      const ID = component.id;
      let css = inferCssFromComponent(component);
      css += parseCssFromDescription(components[ID].description, tokens);

      newComponent.css = css; //components[ID].description;
      //console.log('Component CSS:\n', newComponent.css);

      //console.log(newComponent);

      _MATCHES.push(newComponent);
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
    writeFile(CSS, FOLDER, comp.name, 'style', 'jsx');
    // Write CSS
    writeFile(CSS, FOLDER, comp.name, 'css', 'mjs');
  });
}

function inferCssFromComponent(component) {
  if (component.type !== 'COMPONENT') return;

  let temp = ``;

  // Background color, single fill
  const fill = component.backgroundColor;
  if (fill) {
    const COLOR_STRING = convertHexToRgba(fill.r, fill.g, fill.b, fill.a);
    temp += `
background-color: ${COLOR_STRING};
`;
  }

  // Set size
  temp += `width: ${component.absoluteBoundingBox.width}px;
height: ${component.absoluteBoundingBox.height}px;
`;

  // Set borders
  temp += `border-radius: ${component.cornerRadius}px;
`; //${component.rectangleCornerRadii}`;

  // DEMO
  if (component.children.length > 0) {
    if (component.children[0].type === 'TEXT') {
      const style = component.children[0].style;
      temp += `font-family: '${style.fontFamily}';
font-weight: ${style.fontWeight};
font-size: ${style.fontSize}px;
letter-spacing: ${style.letterSpacing};
text-align: ${style.textAlignHorizontal};
line-height: ${style.lineHeightPx}px;
`;
    }
  }

  //console.log('Component:', component.name);
  //console.log(component);
  //console.log('constraints', component.constraints.vertical, component.constraints.horizontal);

  // This is to avoid failure if temp is empty
  if (temp.length === 0) temp += ' ';

  return temp;
}

function parseCssFromDescription(desc, tokens) {
  if (desc === '') return '';

  // Remove newlines
  desc = desc.replace(/\n/gi, '');
  //desc = desc.replace(/\$/gi, '#');

  // Find all tokens using "#" character
  let regex = /(?:^|\s)(#[a-z0-9]\w*)/gi;
  let matches,
    foundTokens = [];
  while ((matches = regex.exec(desc))) {
    foundTokens.push(matches[1]);
  }

  // Split per line-of-code
  // let snippets = desc.split(';');
  // console.log('snippets:', snippets);

  // TODO: Hardcoded for spacing, currently
  foundTokens.forEach(token => {
    const _TOKEN = token.slice(1, token.length);

    tokens.forEach(frame => {
      if (!frame.spacing) return;

      const _MATCH = Object.entries(frame.spacing).find(spacing => {
        if (spacing[0] === _TOKEN) {
          return spacing[1];
        }
      });

      const MATCH = _MATCH[1];
      desc = desc.replace(token, MATCH); //desc += `${match}`;
    });
  });

  return desc;
}

/*
// import colors from "tokens/colors.mjs";
// ${colors.gray1}
// Find color match and its token key
tokens.forEach(frame => {
	if (frame.colors) {
		const _color = Object.entries(frame.colors).find(color => {
			if (color[1] === COLOR_STRING) {
				return color[0];
			}
		});

		const color = _color[0];
		temp += `${color}`;
	}
});
*/
