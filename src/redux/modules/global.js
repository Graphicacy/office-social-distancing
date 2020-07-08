import { initialState } from '../state/global';
import { getData } from '../api';
import { DATE_TIME_FORMAT } from '../../constant';
import { nest } from 'd3-collection';
import { dateAccessor } from '../../utils';
import { ascending } from 'd3-array';
import moment from 'moment';

// Actions
const TOGGLE_LOADING_ICON = 'TOGGLE_LOADING_ICON';
export const TIMER_TICK = 'TIMER_TICK';
export const UPDATE_CURRENT_INDEX = 'UPDATE_CURRENT_INDEX';
const UPDATE_DATA = 'UPDATE_DATA';
const SHOW_ERROR = 'SHOW_ERROR';

const handleCurrentIndex = state => {
  if (state.currentIndex < state.timePeriods.length - 1) {
    return {
      ...state,
      currentIndex: state.currentIndex + 1,
    };
  } else {
    return {
      ...state,
      currentIndex: 0,
    };
  }
};

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_DATA:
      const nestedData = nest()
        .key(dateAccessor)
        .entries(action.data);
      const timePeriods = nestedData.map(d => moment(d.key, DATE_TIME_FORMAT)).sort(ascending);
      return {
        ...state,
        data: action.data,
        nestedData: nestedData,
        timePeriods,
      };
    case TIMER_TICK:
      return handleCurrentIndex(state);
    case UPDATE_CURRENT_INDEX:
      return {
        ...state,
        currentIndex: action.value,
      };
    case SHOW_ERROR:
      return {
        ...state,
        showError: true,
      };
    case TOGGLE_LOADING_ICON:
      return {
        ...state,
        showError: false,
        isLoading: action.x,
      };
    default:
      return state;
  }
}

function toggleLoadingIcon(x) {
  return {
    type: TOGGLE_LOADING_ICON,
    x,
  };
}

export function retrieveData(node) {
  return async dispatch => {
    dispatch(toggleLoadingIcon(true));

    try {
      const data = await getData(node);
      dispatch({
        type: UPDATE_DATA,
        data,
      });
    } catch (err) {
      console.log(err);
      dispatch({ type: SHOW_ERROR });
    }

    dispatch(toggleLoadingIcon(false));
  };
}
