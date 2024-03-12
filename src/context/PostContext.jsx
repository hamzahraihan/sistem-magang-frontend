import axios from 'axios';
import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export const PostContext = createContext(null);

export const PostDispatch = createContext(null);

export const PostProvider = ({ children }) => {
  const [search, setSearch] = useState({ search: '', category_name: '' });
  console.log('🚀 ~ PostProvider ~ search:', search);

  const [post, dispatch] = useReducer(PostReducer, []);

  const [loadingPost, setLoadingPost] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams({ search: '', category_name: '' });

  useEffect(() => {
    const getAllPost = async () => {
      setLoadingPost(true);
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/post`);
        dispatch({ type: 'SET_POST_DATA', payload: data.result });
        setLoadingPost(false);
      } catch (error) {
        console.error(error);
      }
    };
    getAllPost();
  }, []);

  return (
    <PostContext.Provider value={{ loadingPost, post, setSearch, search, searchParams, setSearchParams }}>
      <PostDispatch.Provider value={dispatch}>{children}</PostDispatch.Provider>
    </PostContext.Provider>
  );
};

const PostReducer = (post, action) => {
  switch (action.type) {
    case 'SET_POST_DATA':
      return action.payload;
    case 'DELETE_POST_BY_ID':
      return action.payload;
    case 'SEARCH_POST':
      return post.filter((item) => item.title.toLowerCase().includes(action.payload.toLowerCase()));
    default:
      return post;
  }
};

PostProvider.propTypes = {
  children: PropTypes.node,
};

export default PostProvider;
