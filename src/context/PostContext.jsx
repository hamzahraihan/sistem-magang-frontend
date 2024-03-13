import axios from 'axios';
import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer, useRef, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

export const PostContext = createContext(null);

export const PostDispatch = createContext(null);

export const PostProvider = ({ children }) => {
  const [search, setSearch] = useState({ search: '', category_name: '' });
  const [post, dispatch] = useReducer(PostReducer, []);
  const [loadingPost, setLoadingPost] = useState(false);
  console.log('🚀 ~ PostProvider ~ loadingPost:', loadingPost);
  const [searchParams, setSearchParams] = useSearchParams({ search: '', category_name: '' });

  const imageInputRef = useRef(null);

  const { id } = useParams();

  useEffect(() => {
    const getAllPost = async () => {
      setLoadingPost(true);
      try {
        if (id) {
          const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/post/user/${id}`);
          setLoadingPost(false);
          return dispatch({ type: 'SET_POST_BY_USER', payload: data.result });
        }
        const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/post`);
        dispatch({ type: 'SET_POST_DATA', payload: data.result });
        setLoadingPost(false);
      } catch (error) {
        console.error(error);
      }
    };
    getAllPost();
  }, [id]);

  const handleImageUpload = async (e) => {
    e.preventDefault();
    const image = imageInputRef.current.files[0];

    if (image) {
      const formData = new FormData();
      formData.append('image', image);
      try {
        const { data } = await axios.post(`${import.meta.env.VITE_BASE_URL}/post/create-post`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('image uploaded', data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <PostContext.Provider value={{ loadingPost, post, setSearch, search, searchParams, setSearchParams, handleImageUpload, imageInputRef }}>
      <PostDispatch.Provider value={dispatch}>{children}</PostDispatch.Provider>
    </PostContext.Provider>
  );
};

const PostReducer = (post, action) => {
  switch (action.type) {
    case 'SET_POST_DATA':
      return action.payload;
    case 'SET_POST_BY_USER':
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
