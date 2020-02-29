import styled from 'styled-components';

import {{NAME_CSS}} from './NAME_CSS.mjs'

// Dynamic import block
import fontSizes from 'tokens/fontSizes.mjs';
{{TOKEN_IMPORTS}}

const {{NAME_STYLED}} = styled.button`
	${{{NAME_CSS}}},
  width: 100%;
  font-size: ${fontSizes.m};
`;

export default {{NAME_STYLED}};
