import styled from 'styled-components';

import ButtonErrorCss from './NAME_CSS.mjs'

// Dynamic import block
import fontSizes from 'tokens/fontSizes.mjs';
{{TOKEN_IMPORTS}}

const ButtonErrorStyled = styled.button`
	${ButtonErrorCss},
  width: 100%;
  font-size: ${fontSizes.m};
`;

export default ButtonErrorStyled;
