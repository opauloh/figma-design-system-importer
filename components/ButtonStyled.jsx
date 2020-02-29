import styled from 'styled-components';

import ButtonCss from './ButtonCss.mjs'

// Then do your regular imports like:
// import fontSizes from 'tokens/fontSizes.mjs';

// TODO: Set element with code, now it's hardcoded as a button
const ButtonStyled = styled.button`
	${ButtonCss};
  width: 100%;
`;

export default ButtonStyled;
