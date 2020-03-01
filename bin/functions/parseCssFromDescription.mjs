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

  // TODO: Hardcoded for spacing, currently
  console.log('replacedMatches', replacedMatches);
  replacedMatches.forEach(token => {
    const _TOKEN = token.slice(1, token.length);

    tokens.forEach(frame => {
      frame.forEach(f => {
        const _MATCH = Object.entries(f).find(item => {
          if (item[0] === _TOKEN) {
            return item[1];
          }
        });

        console.log(_MATCH);
      });

      /*
			if (!frame.spacing) return;

      const _MATCH = Object.entries(frame.spacing).find(spacing => {
        if (spacing[0] === _TOKEN) {
          return spacing[1];
        }
			});
			*/

      const MATCH = _MATCH[1];
      desc = desc.replace(token, MATCH); //desc += `${match}`;
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
