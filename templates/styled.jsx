import styled from 'styled-components';

import {{NAME_CSS}} from './{{NAME_CSS}}.mjs'

// Then do your regular imports like:
// import fontSizes from 'tokens/fontSizes.mjs';

// TODO: Set element with code, now it's hardcoded as a button
const {{NAME_STYLED}} = styled.button`
	${{{NAME_CSS}}};
  width: 100%;
`;

export default {{NAME_STYLED}};
