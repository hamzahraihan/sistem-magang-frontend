import { useContext } from 'react';
import { CategoryContext, CategoryDispatch } from '../context/CategoryContext';

export const useCategoryContext = () => {
  return useContext(CategoryContext);
};

export const useCategoryDispatch = () => {
  return useContext(CategoryDispatch);
};
