import React from "react";
import "./ScrollbarHorizontal.scss";

interface Props {
    children: any
}

function ScrollbarHorizontal(props:Props) {
    return (
        <div className="scrollbar-horizontal">
            {props.children}
        </div>
    )
}

export default ScrollbarHorizontal;