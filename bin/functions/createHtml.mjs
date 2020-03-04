export function createHtml(component) {
  //console.log(component);
  let html = ``;
  let createdElement = ``;
  let name = component.name.replace(/\//gi, '');

  if (component.type.toLowerCase() === 'instance') {
    //console.log(name, 'is INSTANCE');
    createdElement = name;
    html = `<${name}>`;
  } else {
    createdElement = 'div';
    html = `<div class="${name}">`;
  }

  //if (!component.children) {
  //  html += `</div>`;
  //}

  return {
    html,
    createdElement
  };
}
