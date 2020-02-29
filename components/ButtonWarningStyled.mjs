import styled from 'styled-components';

import ButtonWarningCss from './NAME_CSS.mjs'

// Dynamic import block
import fontSizes from 'tokens/fontSizes.mjs';
{{TOKEN_IMPORTS}}

const ButtonWarningStyled = styled.button`
	${ButtonWarningCss},
  width: 100%;
  font-size: ${fontSizes.m};
`;

export default ButtonWarningStyled;
