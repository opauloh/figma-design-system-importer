import styled from 'styled-components';

import ButtonErrorCss from './ButtonErrorCss.mjs'

// Then do your regular imports like:
// import fontSizes from 'tokens/fontSizes.mjs';

// TODO: Set element with code, now it's hardcoded as a button
const ButtonErrorStyled = styled.button`
	${ButtonErrorCss};
  width: 100%;
`;

export default ButtonErrorStyled;
