export function replaceMediaQuery(str, match) {
  const index = str.indexOf(match);
  if (index === -1) return str;

  // Set media query, assume only "upto" or "min"
  const QUERY_TYPE = match === '@upto' ? 'max' : 'min';

  // Get the right parts
  const SLICE_START = parseInt(match.length + 1);
  const SLICE_LENGTH = SLICE_START + 6;

  // Get query, but make sure to not grab any styling
  let query = str.slice(index, index + SLICE_LENGTH);
  query = query.slice(0, query.indexOf('{') + 1);

  // Get size without spaces and accept only digits
  let size = query.slice(SLICE_START, SLICE_LENGTH);
  size = size.trim();
  size = size.replace(/[^0-9.]/gi, '');

  // TODO: Will this work globally across string?
  str = str.replace(match, `@media query and (${QUERY_TYPE}-width: ${size}px) {`);

  // Clean up the remainder
  const REMAINDER = query.replace(match, '');
  str = str.replace(REMAINDER, '');

  return str;
}
