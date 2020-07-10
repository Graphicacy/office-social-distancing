import React from 'react';
import { xAccessor, yAccessor } from '../../../../utils';
import { contourDensity } from 'd3-contour';
import { geoPath } from 'd3-geo';
import { max } from 'd3-array';
import Contour from './Contour';
import { useSelector } from 'react-redux';

const Contours = ({ items, size }) => {
  let colorScale = useSelector(state => state.global.colorScale);
  const p = geoPath();

  const xs = contourDensity()
    .x(xAccessor)
    .y(yAccessor)
    .size(size)(items);

  colorScale.domain([0, max(xs, x => x.value)]); // Points per square pixel.

  return (
    <g className="contours">
      {xs.map((x, i) => {
        return <Contour key={`contour-${i}`} d={p(x)} fill={colorScale(x.value)} />;
      })}
    </g>
  );
};

export default Contours;
