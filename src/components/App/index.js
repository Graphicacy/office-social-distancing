import React, { useEffect, useCallback } from 'react';
import Spinner from './Spinner';
import Tooltip from './Tooltip';
import { useDispatch, useSelector } from 'react-redux';
import { retrieveData } from '../../redux/modules/global';
import Brush from './Brush';
import Visualization from './Visualization';

const App = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.global.isLoading);
  const getData = useCallback(() => dispatch(retrieveData()), [dispatch]);

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="main">
      <Tooltip />
      {!isLoading ? (
        <>
          <Visualization />
          <div className="footer">
            <p className="citation">Data Source: [Insert data source here]</p>
            <Brush />
          </div>
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default App;
