import styled from 'styled-components';

import TestComponentCss from './TestComponentCss.mjs'

// Then do your regular imports like:
// import fontSizes from 'tokens/fontSizes.mjs';

const TestComponentStyled = styled.div`
	${TestComponentCss};
  width: 100%;
`;

export default TestComponentStyled;
