import { createStore, applyMiddleware } from 'redux';

const SET_SCROLL_TO_TOP = 'SET_SCROLL_TO_TOP';

export const setScrollToTop = flag => ({
  type: SET_SCROLL_TO_TOP,
  payload: flag,
});

const initialState = {
  scrollToTop: false,
};

export const reducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_SCROLL_TO_TOP:
      return {
        ...state,
        scrollToTop: action.payload,
      }
  }
  return state;
}

export default () => createStore(reducer, initialState);
