import React from 'react';
import { useSelector } from 'react-redux';
import { colorAccessor, nameAccessor } from '../../../utils';

const Legend = () => {
  const data = useSelector(state => state.global.nestedData);

  // Get the unique "types" of users
  const uniqueTypes = [];
  for (let i = 0; i < data[0].values.length; i++) {
    const value = data[0].values[i];
    const match = uniqueTypes.find(d => nameAccessor(d) === nameAccessor(value));
    if (!match) uniqueTypes.push(value);
  }

  return (
    <div id="legend">
      {uniqueTypes.map(t => {
        return (
          <div className="row" key={`legend-item-for-${nameAccessor(t)}`}>
            <div className="block" style={{ backgroundColor: colorAccessor(t) }} />
            <div className="text">{nameAccessor(t)}</div>
          </div>
        );
      })}
    </div>
  );
};
export default Legend;
