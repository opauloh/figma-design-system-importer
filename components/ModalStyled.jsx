import styled from 'styled-components';

import ModalCss from './ModalCss.mjs'

// Then do your regular imports like:
// import fontSizes from 'tokens/fontSizes.mjs';

// TODO: Set element with code, now it's hardcoded as a button
const ModalStyled = styled.div`
	${ModalCss};
  width: 100%;
`;

export default ModalStyled;
