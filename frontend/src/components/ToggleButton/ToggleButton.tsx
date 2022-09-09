import React, { useState } from 'react';
import './ToggleButton.scss';
import { v4 as uuidv4 } from 'uuid';
import ToggleTransition from '../ToggleTransition/ToggleTransition';

interface Props {
  config: string[];
  selectedItem: string;
  setElementsFilteredFunc: any;
  children: any;
}

function ToggleButton(props: Props) {
  const [stateChanged, setStateChanged] = useState(true);

  const getClasses = (index: number, el: string) => {
    let classes = 'toggle__tab-item';
    if (el === props.selectedItem) {
      classes += ' active';
    } else if (props.config[index + 1] === props.selectedItem) {
      classes += ' before';
    }
    return classes;
  };

  const toggleTab = async (tabClicked: string) => {
    setStateChanged(!stateChanged);
    await props.setElementsFilteredFunc(tabClicked);
  };

  return (
    <div className="toggle__button">
      <div className="toggle__tabs">
        {props.config.map((tab: string, i: number) => (
          <div className={getClasses(i, tab)} key={uuidv4()} role="presentation" onClick={() => toggleTab(tab)}>
            {tab}
          </div>
        ))}
      </div>
      <ToggleTransition stateChanged={stateChanged}>{props.children}</ToggleTransition>
    </div>
  );
}

export default ToggleButton;
