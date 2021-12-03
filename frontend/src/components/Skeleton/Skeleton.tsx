import React from "react";
import "./Skeleton.scss";
import unknownMedia from '../../assets/img/unknownMedia.svg' // relative path to image

interface Props {

}

function Skeleton(props: Props) {

    return (
        <div className="skeleton">
            <img className="skeleton__img" src={unknownMedia} />
            <div className="shimmer-container">
                <div className="shimmer" />
            </div>
        </div>
    )
}

export default Skeleton;