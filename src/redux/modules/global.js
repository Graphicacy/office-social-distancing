import { initialState } from '../state/global';
import { getData } from '../api';
import { IS_CLICKED } from '../../constant';

// Actions
const TOGGLE_LOADING_ICON = 'TOGGLE_LOADING_ICON';
export const UPDATE_TOOLTIP = 'UPDATE_TOOLTIP';
export const TIMER_TICK = 'TIMER_TICK';
export const UPDATE_CURRENT_INDEX = 'UPDATE_CURRENT_INDEX';
const UPDATE_DATA = 'UPDATE_DATA';
const SHOW_ERROR = 'SHOW_ERROR';

const handleTooltip = (state, item) => {
  if (state.tooltip && state.tooltip[IS_CLICKED]) {
    if (item && item[IS_CLICKED]) {
      if (item.id === state.tooltip.id) {
        return null;
      } else {
        return item;
      }
    } else {
      return state.tooltip;
    }
  } else {
    return item;
  }
};

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
      return {
        ...state,
        data: action.data,
      };
    case UPDATE_TOOLTIP:
      return {
        ...state,
        tooltip: handleTooltip(state, action.item),
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

export function retrieveData() {
  return async dispatch => {
    dispatch(toggleLoadingIcon(true));

    try {
      const data = await getData();
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
