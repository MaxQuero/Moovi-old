import React from "react";
import "./Skeleton.scss";
import unknownMedia from '../../assets/img/unknownMedia.svg' // relative path to image

function Skeleton() {

    return (
        <div className="skeleton">
            <img className="skeleton__img" src={unknownMedia} alt="Skeleton" />
            <div className="shimmer-container">
                <div className="shimmer" />
            </div>
        </div>
    )
}

export default Skeleton;