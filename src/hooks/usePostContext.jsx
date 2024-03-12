import { useContext } from 'react';
import { PostContext, PostDispatch } from '../context/PostContext';

export const usePostContext = () => {
  return useContext(PostContext);
};

export const usePostDispatch = () => {
  return useContext(PostDispatch);
};
