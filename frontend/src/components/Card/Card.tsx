import React from "react";
import "./Card.scss";
import unknown from '../../assets/img/unknown.svg' // relative path to image

interface Props {
    title: string;
    subtitle: string
    photo: string;
}

function Card(props: Props) {

    return (
        <div className="card">
            <img className="card__photo" src={props.photo ? `https://image.tmdb.org/t/p/w300_and_h450_bestv2/${props.photo}` : unknown} alt="Card img"/>
            <div className="card__infos">
                <p className="card__title">{props.title}</p>
                <p className="card__subtitle">{props.subtitle}</p>
            </div>

        </div>
    )
}

export default Card;