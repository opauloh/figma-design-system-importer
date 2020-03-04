import React from 'react';
import PropTypes from 'prop-types';

import TestComponentStyled from './TestComponentStyled';

//const TestComponent = props => <TestComponentStyled onClick={props.onClick}>{props.children}</TestComponentStyled>;

const TestComponent = props => <TestComponentStyled onClick={props.onClick}>{props.children}><div class="Paragraph"><div class="HeadingS"><div class="ModalText"><div class="Image"><div class="Icon"><div class="ModalImage"></TestComponentStyled>;

TestComponent.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default TestComponent;
