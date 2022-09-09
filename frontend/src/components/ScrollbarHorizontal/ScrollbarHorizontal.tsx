import React, { PropsWithChildren } from 'react';
import './ScrollbarHorizontal.scss';

function ScrollbarHorizontal(props: PropsWithChildren<React.ReactNode>) {
  return <div className="scrollbar-horizontal">{props.children}</div>;
}

export default ScrollbarHorizontal;
