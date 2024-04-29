import { useContext } from 'react';
import { CommentContext, CommentDispatch } from '../context/CommentContext';

export const useCommentContext = () => {
  return useContext(CommentContext);
};

export const useCommentDispatch = () => {
  return useContext(CommentDispatch);
};
