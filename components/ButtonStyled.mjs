import styled from 'styled-components';

import ButtonCss from './NAME_CSS.mjs'

// Dynamic import block
import fontSizes from 'tokens/fontSizes.mjs';
{{TOKEN_IMPORTS}}

const ButtonStyled = styled.button`
	${ButtonCss},
  width: 100%;
  font-size: ${fontSizes.m};
`;

export default ButtonStyled;
