import React from 'react';
import PropTypes from 'prop-types';

import ButtonWarningStyled from './ButtonWarningStyled';

const ButtonWarning = props => <ButtonWarningStyled onClick={props.onClick}>{props.children}</ButtonWarningStyled>;

ButtonWarning.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default ButtonWarning;
