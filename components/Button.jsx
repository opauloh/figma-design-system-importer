import React from 'react';
import PropTypes from 'prop-types';

import ButtonStyled from './ButtonStyled';

//const Button = props => <ButtonStyled onClick={props.onClick}>{props.children}</ButtonStyled>;

const Button = props => <ButtonStyled onClick={props.onClick}>{props.children}><div class="Some kind of button"></ButtonStyled>;

Button.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default Button;
