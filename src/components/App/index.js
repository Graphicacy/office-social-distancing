import React from 'react';
import Tooltip from './Tooltip';
import Brush from './Brush';
import Visualization from './Visualization';
import { NUM_PEOPLE } from '../../constant';

const App = () => {
  return (
    <div className="main">
      <Tooltip />
      <h3>{`An examination of ${NUM_PEOPLE} individuals moving throughout a sample floor plan over a 10 minute period`}</h3>
      <Visualization />
      <div className="footer">
        <Brush />
      </div>
    </div>
  );
};

export default App;
