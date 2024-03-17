import axios from 'axios';
import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer, useRef, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useUserContext } from '../hooks/useUserContext';
import { getAllPost, getUserPostById, getUserPostByUserId } from '../constant/api';

export const PostContext = createContext(null);

export const PostDispatch = createContext(null);

export const PostProvider = ({ children }) => {
  const [search, setSearch] = useState({ search: '', category_name: '' });
  const [post, dispatch] = useReducer(PostReducer, []);

  const [loadingPost, setLoadingPost] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams({ search: '', category_name: '' });
  const [postInputData, setPostInputData] = useState({
    title: '',
    category_name: '',
    description: '',
  });
  const [postByUser, setPostByUser] = useState([]);
  const [postById, setPostById] = useState([]);
  console.log('🚀 ~ PostProvider ~ postById:', postById);
  const { user } = useUserContext();

  const imageInputRef = useRef(null);

  const { id } = useParams();

  useEffect(() => {
    const getPostById = async () => {
      setLoadingPost(true);
      try {
        let data = await getUserPostById(id);
        setPostById(data);
        setLoadingPost(false);
      } catch (error) {
        console.error(error);
        setLoadingPost(false);
      }
    };
    getPostById();
  }, [id]);

  useEffect(() => {
    const handleGetPost = async () => {
      setLoadingPost(true);
      try {
        const data = await getAllPost();
        setLoadingPost(false);
        return dispatch({ type: 'SET_POST_DATA', payload: data });
      } catch (error) {
        console.error(error);
        setLoadingPost(false);
      }
    };
    handleGetPost();
  }, []);

  useEffect(() => {
    const handleGetPostByUser = async () => {
      setLoadingPost(true);
      try {
        const data = await getUserPostByUserId(id);
        setLoadingPost(false);
        setPostByUser(data);
      } catch (error) {
        console.error(error);
        setLoadingPost(false);
      }
    };
    handleGetPostByUser();
  }, [id]);

  const handleCreatePost = async (e) => {
    e.preventDefault();
    const image = imageInputRef.current.files[0];

    if (image) {
      const formData = new FormData();
      formData.append('image', image);
      formData.append('title', postInputData.title);
      formData.append('description', postInputData.description);
      formData.append('category_name', postInputData.category_name);
      // Append user id based on the role condition
      if (user[0].role === 'dosen') {
        formData.append('dosen_id', user[0].id);
        formData.append('mahasiswa_id', null);
        formData.append('admin_id', null);
      } else if (user[0].role === 'mahasiswa') {
        formData.append('dosen_id', null);
        formData.append('mahasiswa_id', user[0].id);
        formData.append('admin_id', null);
      } else if (user[0].role === 'admin') {
        formData.append('dosen_id', null);
        formData.append('mahasiswa_id', null);
        formData.append('admin_id', user[0].id);
      }

      try {
        const { data } = await axios.post(`${import.meta.env.VITE_BASE_URL}/post/create-post`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        dispatch({ type: 'ADD_NEW_POST', payload: data.result });
        console.log('image uploaded', data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <PostContext.Provider
      value={{
        loadingPost,
        post,
        setSearch,
        search,
        searchParams,
        setSearchParams,
        handleCreatePost,
        imageInputRef,
        postInputData,
        postByUser,
        postById,
        setPostInputData,
      }}
    >
      <PostDispatch.Provider value={dispatch}>{children}</PostDispatch.Provider>
    </PostContext.Provider>
  );
};

const PostReducer = (post, action) => {
  switch (action.type) {
    case 'SET_POST_DATA':
      return action.payload;
    case 'ADD_NEW_POST':
      return [...post, action.payload];
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
