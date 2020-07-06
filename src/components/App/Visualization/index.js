import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import mostRecentDataSelector from '../../../redux/selectors/most.recent.data.selector';
import Contours from './Contours';
import { retrieveData } from '../../../redux/modules/global';
import { ReactComponent as OfficeFloorPlan } from '../../../assets/data/sample-office-floor-plan-with-path-01.svg';
import { select } from 'd3-selection';
import { HEIGHT, WIDTH } from '../../../constant';

const Visualization = ({ margin }) => {
  const [width, height] = [WIDTH, HEIGHT];
  const pathRef = useRef(null);
  const data = useSelector(mostRecentDataSelector);
  const getInnerWidth = () => width - margin.left - margin.right;
  const getInnerHeight = () => height - margin.top - margin.bottom;

  const dispatch = useDispatch();
  const getData = useCallback(node => dispatch(retrieveData(node)), [dispatch]);

  useEffect(() => {
    if (pathRef) {
      const node = select(pathRef.current).select('.way__finding');
      node.style('stroke', 'none');
      getData(node.node());
    }
  }, [pathRef, getData]);

  return (
    <div className="visualization">
      <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height}>
        <g transform={`translate(${margin.left},${margin.right})`}>
          <Contours items={data} size={[getInnerWidth(), getInnerHeight()]} />
        </g>
        <OfficeFloorPlan ref={pathRef} />
      </svg>
    </div>
  );
};

Visualization.defaultProps = {
  margin: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
};
export default Visualization;
