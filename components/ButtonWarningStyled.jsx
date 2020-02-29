import styled from 'styled-components';

import ButtonWarningCss from './ButtonWarningCss.mjs'

// Then do your regular imports like:
// import fontSizes from 'tokens/fontSizes.mjs';

// TODO: Set element with code, now it's hardcoded as a button
const ButtonWarningStyled = styled.button`
	${ButtonWarningCss};
  width: 100%;
`;

export default ButtonWarningStyled;
