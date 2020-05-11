import React from 'react';
import { idAccessor, useDimensions } from '../../../utils';
import { useSelector } from 'react-redux';
import mostRecentDataSelector from '../../../redux/selectors/most.recent.data.selector';
import Marker from './Marker';
import Contours from './Contours';
import WayFinding from './WayFinding';

const Visualization = ({ margin }) => {
  const [chartRef, { width, height }] = useDimensions({ width: 800, height: 800 });
  const data = useSelector(mostRecentDataSelector);
  const getInnerWidth = () => width - margin.left - margin.right;
  const getInnerHeight = () => height - margin.top - margin.bottom;

  return (
    <div className="visualization" ref={chartRef}>
      <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height}>
        <g transform={`translate(${margin.left},${margin.right})`}>
          <Contours items={data} size={[getInnerWidth(), getInnerHeight()]} />
          {data.map(d => {
            return <Marker key={idAccessor(d)} item={d} />;
          })}
          <WayFinding />
        </g>
      </svg>
    </div>
  );
};

Visualization.defaultProps = {
  margin: {
    left: 20,
    right: 20,
    top: 20,
    bottom: 20,
  },
};
export default Visualization;
