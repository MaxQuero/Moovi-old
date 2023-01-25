import React, { PropsWithChildren } from 'react';
import './ScrollbarHorizontal.scss';
import {Movie, TvShow} from "../../generated/graphql";

interface ScrollbarMediaProps {
  children: any
}

function ScrollbarHorizontal({children}: ScrollbarMediaProps) {
  return <div className="scrollbar-horizontal">{children}</div>;
}

export default ScrollbarHorizontal;
