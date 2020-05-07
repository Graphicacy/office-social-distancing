import React from 'react';
import { useDimensions } from '../../../utils';

const Visualization = ({ margin }) => {
  const [chartRef, { width, height }] = useDimensions({ width: 800, height: 800 });
  // const getInnerWidth = () => width - margin.left - margin.right;
  // const getInnerHeight = () => height - margin.top - margin.bottom;

  return (
    <div className="visualization" ref={chartRef}>
      <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height}>
        <g transform={`translate(${margin.left},${margin.right})`}>
          <circle cx={width / 2} cy={height / 2} r={25} />
        </g>
      </svg>
    </div>
  );
};

Visualization.defaultProps = {
  margin: {
    left: 60,
    right: 60,
    top: 60,
    bottom: 60,
  },
};
export default Visualization;
