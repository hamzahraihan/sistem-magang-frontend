import { createContext, useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useUserContext } from '../hooks/useUserContext';
import toast from 'react-hot-toast';

export const CategoryContext = createContext(null);
export const CategoryDispatch = createContext(null);

const CategoryProvider = ({ children }) => {
  const [category, dispatch] = useReducer(CategoryReducer, []);
  const [loadingCategory, setLoadingCategory] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState({});
  const { accessToken } = useUserContext();

  const handleCreateCategory = async ({ category }) => {
    setLoadingCategory(true);
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/category`,
        {
          category,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      dispatch({ type: 'ADD_CATEGORY', payload: data.result });
      toast.success('Berhasil ditambah');
      setLoadingCategory(false);
    } catch (error) {
      toast.error(error.message);
      setLoadingCategory(false);
    }
  };

  const handleDeleteCategory = async (id) => {
    setLoadingDelete((prevState) => ({
      ...prevState,
      [id]: true,
    }));
    try {
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/category/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      dispatch({ type: 'DELETE_CATEGORY', payload: id });
      setLoadingDelete((prevState) => ({
        ...prevState,
        [id]: false,
      }));
      toast.success('Berhasil dihapus');
    } catch (error) {
      toast.success(error.message);
      setLoadingDelete((prevState) => ({
        ...prevState,
        [id]: false,
      }));
    }
  };

  return (
    <CategoryContext.Provider value={{ category, handleCreateCategory, handleDeleteCategory, loadingCategory, loadingDelete }}>
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
    case 'DELETE_CATEGORY':
      return category.filter((c) => c.category_id !== action.payload);
    default:
      return category;
  }
};

CategoryProvider.propTypes = {
  children: PropTypes.node,
};
