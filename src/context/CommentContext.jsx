import { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

export const CommentContext = createContext();
export const CommentDispatch = createContext();

const CommentProvider = ({ children }) => {
  const [comment, dispatch] = useReducer(CommentReducer, []);

  return (
    <CommentContext.Provider value={{ comment }}>
      <CommentDispatch.Provider value={dispatch}>{children}</CommentDispatch.Provider>
    </CommentContext.Provider>
  );
};

const CommentReducer = (comment, action) => {
  switch (action.type) {
    case 'SET_COMMENT':
      return action.payload;
    case 'ADD_COMMENT':
      return [...comment, action.payload];
  }
};

CommentProvider.propTypes = {
  children: PropTypes.node,
};

export default CommentProvider;
