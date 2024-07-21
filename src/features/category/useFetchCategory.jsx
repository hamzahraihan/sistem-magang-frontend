import { useEffect, useState } from 'react';
import { useCategoryContext, useCategoryDispatch } from '../../hooks/useCategoryContext';
import { getAllCategoriesAPI } from '../../constant/api';

const useFetchCategory = () => {
  const [loading, setLoading] = useState(false);
  const { category } = useCategoryContext();
  const dispatch = useCategoryDispatch();

  useEffect(() => {
    const getCategoryPost = async () => {
      setLoading(true);
      try {
        const data = await getAllCategoriesAPI();
        dispatch({ type: 'SET_CATEGORY', payload: data });
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    getCategoryPost();
  }, [dispatch]);
  return { category, loading };
};

export default useFetchCategory;
