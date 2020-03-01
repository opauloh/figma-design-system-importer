import React from 'react';
import PropTypes from 'prop-types';

import ModalStyled from './ModalStyled';

const Modal = props => <ModalStyled onClick={props.onClick}>{props.children}</ModalStyled>;

Modal.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default Modal;
