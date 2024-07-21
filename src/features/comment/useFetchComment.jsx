import { useEffect, useMemo, useState } from 'react';
import { useCommentContext, useCommentDispatch } from '../../hooks/useCommentContext';
import { getCommentByPostAPI } from '../../constant/api';
import { useLocation } from 'react-router-dom';

const useFetchComment = () => {
  const [loading, setLoading] = useState(false);
  const { comment } = useCommentContext();
  const dispatch = useCommentDispatch();

  const { state } = useLocation();

  const postId = useMemo(() => {
    return state ? state.post_id : null;
  }, [state]);

  useEffect(() => {
    const getCommentByPost = async () => {
      setLoading(true);
      try {
        const data = await getCommentByPostAPI(postId);
        dispatch({ type: 'SET_COMMENT', payload: data });
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    getCommentByPost();
  }, [postId, dispatch]);
  return { comment, loading };
};

export default useFetchComment;
