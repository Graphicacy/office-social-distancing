import { scaleSequential } from 'd3-scale';
import { interpolateYlOrBr } from 'd3-scale-chromatic';

export const initialState = {
  data: null,
  nestedData: null,
  isLoading: true,
  showError: false,
  currentIndex: 0,
  timePeriods: [],
  colorScale: scaleSequential(interpolateYlOrBr),
};
