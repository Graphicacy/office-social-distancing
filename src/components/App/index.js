import React from 'react';
import Tooltip from './Tooltip';
import Brush from './Brush';
import Visualization from './Visualization';

const App = () => {
  return (
    <div className="main">
      <Tooltip />
      <h3>An examination of individuals moving throughout the White House over 10 minutes</h3>
      <Visualization />
      <div className="footer">
        <Brush />
      </div>
    </div>
  );
};

export default App;
