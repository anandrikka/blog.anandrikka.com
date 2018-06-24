import { createStore, applyMiddleware } from 'redux';

const SET_SCROLL_TO_TOP = 'SET_SCROLL_TO_TOP';
const TOGGLE_MENU = 'TOGGLE_MENU';

export const setScrollToTop = flag => ({
  type: SET_SCROLL_TO_TOP,
  payload: flag,
});

export const toggleMenu = () => ({
  type: TOGGLE_MENU,
})

const initialState = {
  scrollToTop: false,
  toggleMenu: false,
};

export const reducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_SCROLL_TO_TOP:
      return {
        ...state,
        scrollToTop: action.payload,
      }
    case TOGGLE_MENU:
      return {
        ...state,
        toggleMenu: !state.toggleMenu
      }
  }
  return state;
}

export default () => createStore(reducer, initialState);
