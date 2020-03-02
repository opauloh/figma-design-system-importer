import React from 'react';
import PropTypes from 'prop-types';

import HeadingSStyled from './HeadingSStyled';

//const HeadingS = props => <HeadingSStyled onClick={props.onClick}>{props.children}</HeadingSStyled>;

const HeadingS = props => <HeadingSStyled onClick={props.onClick}>{props.children}>undefined</HeadingSStyled>;

HeadingS.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default HeadingS;
