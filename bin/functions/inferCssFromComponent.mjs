import { convertHexToRgba } from './convertHexToRgba.mjs';

export function inferCssFromComponent(component) {
  if (component.type !== 'COMPONENT') return;

  let temp = ``;

  // Background color, single fill
  const fill = component.backgroundColor;
  if (fill) {
    // TODO: Make sure the strings don't mess anything up!
    const COLOR_STRING = convertHexToRgba(`${fill.r}`, `${fill.g}`, `${fill.b}`, `${fill.a}`);
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
  // Set text styling on base component
  // Will assume that a level 1 child with TEXT type is the base text style
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

  // This is to avoid failure if temp is empty
  if (temp.length === 0) temp += ' ';

  return temp;
}
