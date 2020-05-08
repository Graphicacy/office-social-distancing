import React, { useEffect, useCallback } from 'react';
import Spinner from './Spinner';
import Tooltip from './Tooltip';
import { useDispatch, useSelector } from 'react-redux';
import { retrieveData } from '../../redux/modules/global';
import Brush from './Brush';
import Visualization from './Visualization';
import Legend from './Legend';

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
      <h3>An examination of individuals moving throughout an office space over 10 minutes</h3>
      {!isLoading ? (
        <>
          <Legend />
          <Visualization />
          <div className="footer">
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
