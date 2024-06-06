import { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

export const CategoryContext = createContext(null);
export const CategoryDispatch = createContext(null);

const CategoryProvider = ({ children }) => {
  const [category, dispatch] = useReducer(CategoryReducer, []);
  return (
    <CategoryContext.Provider value={category}>
      <CategoryDispatch.Provider value={dispatch}>{children}</CategoryDispatch.Provider>
    </CategoryContext.Provider>
  );
};

export default CategoryProvider;

const CategoryReducer = (category, action) => {
  switch (action.type) {
    case 'SET_CATEGORY':
      return action.payload;
    case 'ADD_CATEGORY':
      return [...category, action.payload];
    default:
      return category;
  }
};

CategoryProvider.propTypes = {
  children: PropTypes.node,
};
