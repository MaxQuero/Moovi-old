import React from 'react';
import './Casting.scss';
import Card from '../Card/Card';
import ScrollbarHorizontal from '../ScrollbarHorizontal/ScrollbarHorizontal';
import { v4 as uuid } from 'uuid';
interface Props {
  cast: any;
  crew: any;
}

function Casting(props: Props) {
  return (
    <div className="casting">
      <div className="casting__directors">
        <span className="casting__directors__text">Réalisateurs</span>
        <ScrollbarHorizontal>
          {props.crew.map((director: any) => (
            <Card title={director.name} key={uuid()} subtitle={director.job} photo={director.profile_path} />
          ))}
        </ScrollbarHorizontal>
      </div>
      <div className="casting__actors">
        <span className="casting__directors__text">Distribution</span>
        <ScrollbarHorizontal>
          {props.cast.map((actor: any) => (
            <Card title={actor.name} key={uuid()} subtitle={actor.character} photo={actor.profile_path} />
          ))}
        </ScrollbarHorizontal>
      </div>
    </div>
  );
}

export default Casting;
