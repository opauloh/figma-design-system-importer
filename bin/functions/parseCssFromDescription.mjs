import { replaceMediaQuery } from './replaceMediaQuery.mjs';

/*
		Replacement patterns:
		@ - media query replacement
		{{x}} - element replacement
		# - token replacement
	*/
export function parseCssFromDescription(desc, tokens) {
  if (desc === '') return '';

  // Remove newlines
  desc = desc.replace(/\n/gi, '');

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

  // Split per line-of-code
  // let snippets = desc.split(';');
  // console.log('snippets:', snippets);

  // TODO: Hardcoded for spacing, currently
  replacedMatches.forEach(token => {
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
