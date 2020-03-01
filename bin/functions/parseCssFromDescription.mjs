import { replaceMediaQuery } from './replaceMediaQuery.mjs';

/*
		Replacement patterns:
		@ - media query replacement
		{{x}} - element replacement
		# - token replacement
	*/
export function parseCssFromDescription(desc, tokens) {
  if (desc === '') return '';

  let componentMetadata = {
    element: 'div'
  };

  // Remove newlines
  desc = desc.replace(/\n/gi, '');

  // Find and replace elements
  if (desc.match(/\{\{(.*?)\}\}/)) componentMetadata.element = desc.match(/\{\{(.*?)\}\}/)[1];

  // Fix media queries
  if (desc.includes('@min')) desc = replaceMediaQuery(desc, '@min');
  if (desc.includes('@upto')) desc = replaceMediaQuery(desc, '@upto');

  // Find all tokens using "#" character
  let matches,
    replacedMatches = [];
  let regex = /(?:^|\s)(#[a-z0-9]\w*)/gi;
  while ((matches = regex.exec(desc))) {
    replacedMatches.push(matches[1]);
  }

  replacedMatches.forEach(token => {
    const _TOKEN = token.slice(1, token.length);

    tokens.forEach(frame => {
      const FRAME_NAME = Object.keys(frame);

      const MATCH = Object.entries(frame[FRAME_NAME]).find(item => {
        console.log('item', item, _TOKEN);
        if (item[0] === _TOKEN) {
          return item[1];
        }
      });

      if (!MATCH) return;

      desc = desc.replace(token, MATCH[1]);
    });
  });

  console.log(desc);

  return {
    cssString: desc,
    componentMetadata
  };
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
