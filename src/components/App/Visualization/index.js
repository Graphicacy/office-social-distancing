import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import mostRecentDataSelector from '../../../redux/selectors/most.recent.data.selector';
import Contours from './Contours';
import { retrieveData } from '../../../redux/modules/global';
import { ReactComponent as WhiteHouse } from '../../../assets/data/White_House_West_Wing_FloorPlan1-updated-02-01.svg';
import { select } from 'd3-selection';

const Visualization = ({ margin }) => {
  const [width, height] = [900, 600];
  const pathRef = useRef(null);
  const data = useSelector(mostRecentDataSelector);
  const getInnerWidth = () => width - margin.left - margin.right;
  const getInnerHeight = () => height - margin.top - margin.bottom;

  const dispatch = useDispatch();
  const getData = useCallback(node => dispatch(retrieveData(node)), [dispatch]);

  useEffect(() => {
    if (pathRef) {
      const node = select(pathRef.current);
      node.style('stroke', 'none');
      getData(node.node());
    }
  }, [pathRef]);

  return (
    <div className="visualization">
      <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height}>
        <g transform={`translate(${margin.left},${margin.right})`}>
          <Contours items={data} size={[getInnerWidth(), getInnerHeight()]} />
        </g>
        <WhiteHouse />
        <g id="way-finding-path">
          <path
            ref={pathRef}
            className="cls-13"
            d="M203.21,251.17v146.1h13.46v47H470V418.67L432.83,381.5h-87.2V312.4H495.18V220.56h13.66V203.47H645.37V150.4H843.19"
          />
        </g>
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
