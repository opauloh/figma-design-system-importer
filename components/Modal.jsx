import React from 'react';
import PropTypes from 'prop-types';

import ModalStyled from './ModalStyled';

//const Modal = props => <ModalStyled onClick={props.onClick}>{props.children}</ModalStyled>;

const Modal = props => <ModalStyled onClick={props.onClick}>{props.children}><div class="ModalText">|||RECURSING at depth 0; div|||<div class="Paragraph">|||CLOSING div at depth 1|||</div><HeadingS>|||RECURSING at depth 0; HeadingS|||<div class="HeadingS">|||CLOSING HeadingS at depth 1|||</HeadingS><div class="ModalImage">|||RECURSING at depth 1; div|||<div class="Image">|||CLOSING undefined at depth 2|||</undefined><div class="Icon">|||CLOSING undefined at depth 1|||</undefined><Button>|||RECURSING at depth 2; Button|||<div class="Some kind of button">|||CLOSING undefined at depth 3|||</undefined>|||CLOSING undefined at depth 2|||</undefined></ModalStyled>;

Modal.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default Modal;
