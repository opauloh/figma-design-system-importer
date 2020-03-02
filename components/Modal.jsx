import React from 'react';
import PropTypes from 'prop-types';

import ModalStyled from './ModalStyled';

//const Modal = props => <ModalStyled onClick={props.onClick}>{props.children}</ModalStyled>;

const Modal = props => (
  <ModalStyled onClick={props.onClick}>
    {props.children}><div class="ModalText"></div>
    <div class="ModalImage"></div>
    <div class="Button"></div>
  </ModalStyled>
);

Modal.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default Modal;
