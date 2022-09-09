import React from 'react';
import './ToggleTransition.scss';
import { CSSTransition } from 'react-transition-group';

interface Props {
  children: any;
  stateChanged?: boolean;
}

function ToggleTransition(props: Props) {
  return (
    <CSSTransition in={props.stateChanged} appear={true} timeout={2000} classNames="fadein" unmountOnExit={false}>
      <div>{props.children}</div>
    </CSSTransition>
  );
}

export default ToggleTransition;
