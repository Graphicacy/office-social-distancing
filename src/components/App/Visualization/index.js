import React, { useCallback, useEffect, useRef } from 'react';
import { idAccessor } from '../../../utils';
import { useDispatch, useSelector } from 'react-redux';
import mostRecentDataSelector from '../../../redux/selectors/most.recent.data.selector';
import Marker from './Marker';
import Contours from './Contours';
import CustomMarker from './CustomMarker';
import { retrieveData } from '../../../redux/modules/global';
import { ReactComponent as WhiteHouse } from '../../../assets/data/White_House_West_Wing_FloorPlan1-updated-01.svg';
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
      getData(select(pathRef.current).node());
    }
  }, [pathRef]);

  return (
    <div className="visualization">
      <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height}>
        <g transform={`translate(${margin.left},${margin.right})`}>
          <Contours items={data} size={[getInnerWidth(), getInnerHeight()]} />
          {/*{data.map(d => {*/}
          {/*  return <Marker key={idAccessor(d)} item={d} />;*/}
          {/*})}*/}
          {data.map(d => {
            return <CustomMarker key={idAccessor(d)} item={d} />;
          })}
        </g>
        <WhiteHouse />
        <g id="way-finding-path">
          <path ref={pathRef} className="cls-13" d="M203.21 251.17 203.21 397.27 216.67 397.27 216.67 444.23 406.28 444.23" />
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
