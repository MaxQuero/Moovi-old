import React, { useState } from 'react';
import './ToggleButton.scss';
import { v4 as uuidv4 } from 'uuid';
import ToggleTransition from '../ToggleTransition/ToggleTransition';

interface Props {
  config: string[];
  setElementsFilteredFunc: any;
  children: any;
}

function ToggleButton({ config, setElementsFilteredFunc, children } : Props) {
  const [activeTab, setActiveTab] = useState(config[0])
  const [stateChanged, setStateChanged] = useState(true);

  const getClasses = (index: number, el: string) => {
    let classes = 'toggle__tab-item';
    if (el === activeTab) {
      classes += ' active';
    } else if (config[index + 1] === activeTab) {
      classes += ' before';
    }
    return classes;
  };

  const toggleTab = async (tabClicked: string) => {
    setActiveTab(tabClicked)
    setStateChanged(!stateChanged);
    await setElementsFilteredFunc(tabClicked);
  };

  return (
    <div className="toggle__button">
      <div className="toggle__tabs">
        {config.map((tab: string, i: number) => (
          <div className={getClasses(i, tab)} key={uuidv4()} role="presentation" onClick={() => toggleTab(tab)}>
            {tab}
          </div>
        ))}
      </div>
      <ToggleTransition stateChanged={stateChanged}>{children}</ToggleTransition>
    </div>
  );
}

export default ToggleButton;
