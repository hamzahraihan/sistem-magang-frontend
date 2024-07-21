import axios from 'axios';
import PropTypes from 'prop-types';
import { createContext, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useUserContext } from '../hooks/useUserContext';
import { getAllPost, getUserPostById, getUserPostByUserId } from '../constant/api';
import { TOKEN } from '../constant/key';
import toast from 'react-hot-toast';

export const PostContext = createContext(null);

export const PostDispatch = createContext(null);

export const PostProvider = ({ children }) => {
  const [search, setSearch] = useState({ search: '', category_name: '' });
  const [post, dispatch] = useReducer(PostReducer, []);

  const [loadingPost, setLoadingPost] = useState(false);
  const [loadingPostByUser, setLoadingPostByUser] = useState(false);
  const [loadingPostByID, setLoadingPostByID] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams({ search: '', category_name: '' });
  const [postInputData, setPostInputData] = useState({
    title: '',
    category_name: 'magang',
    description: '',
  });
  const [postByUser, setPostByUser] = useState([]);
  const [postById, setPostById] = useState([]);
  const { userLoggedInData } = useUserContext();
  const token = localStorage.getItem(TOKEN);

  const navigate = useNavigate();

  const imageInputRef = useRef(null);

  const { state } = useLocation();

  const id = useMemo(() => {
    return state ? state.userId : null;
  }, [state]);

  const postId = useMemo(() => {
    return state ? state.post_id : null;
  }, [state]);

  useEffect(() => {
    const getPostById = async () => {
      setLoadingPostByID(true);
      try {
        let data = await getUserPostById(postId);
        setPostById(data);
        setLoadingPostByID(false);
      } catch (error) {
        setLoadingPostByID(false);
      }
    };
    getPostById();
  }, [postId]);

  useEffect(() => {
    const handleGetPost = async () => {
      setLoadingPost(true);
      try {
        const data = await getAllPost();
        setLoadingPost(false);
        return dispatch({ type: 'SET_POST_DATA', payload: data });
      } catch (error) {
        setLoadingPost(false);
      }
    };
    handleGetPost();
  }, []);

  useEffect(() => {
    const handleGetPostByUser = async () => {
      setLoadingPostByUser(true);
      try {
        const data = await getUserPostByUserId(id);
        setLoadingPostByUser(false);
        setPostByUser(data);
      } catch (error) {
        setLoadingPostByUser(false);
      }
    };
    handleGetPostByUser();
  }, [id]);

  const handleCreatePost = async (e) => {
    e.preventDefault();
    const image = imageInputRef.current.files[0];

    if (!userLoggedInData) {
      return toast.error('Kamu belum login');
    }

    const formData = new FormData();
    formData.append('author', `${userLoggedInData.first_name} ${userLoggedInData.last_name}`);
    formData.append('role', userLoggedInData.role);
    formData.append('image', image);
    formData.append('title', postInputData.title);
    formData.append('description', postInputData.description);
    formData.append('category_name', postInputData.category_name);
    // Append user id based on the role condition
    if (userLoggedInData?.role === 'dosen') {
      formData.append('dosen_id', userLoggedInData.id);
      formData.append('mahasiswa_id', null);
      formData.append('admin_id', null);
    } else if (userLoggedInData?.role === 'mahasiswa') {
      formData.append('dosen_id', null);
      formData.append('mahasiswa_id', userLoggedInData.id);
      formData.append('admin_id', null);
    } else if (userLoggedInData?.role === 'admin') {
      formData.append('dosen_id', null);
      formData.append('mahasiswa_id', null);
      formData.append('admin_id', userLoggedInData.id);
    }

    setLoadingPost(true);
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_BASE_URL}/post/create-post`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: 'ADD_NEW_POST', payload: data.result });

      setLoadingPost(false);
      navigate('/');
    } catch (error) {
      if (error.response.status == 403) {
        toast.error('Kamu belum login');
      }

      setLoadingPost(false);
    }
  };

  const handleDeletePost = async (id) => {
    setLoadingDelete(true);
    try {
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/post/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success('Berhasil terhapus');
      dispatch({ type: 'DELETE_POST_BY_ID', payload: id });
      setLoadingDelete(false);
    } catch (error) {
      setLoadingDelete(false);
    }
  };

  return (
    <PostContext.Provider
      value={{
        loadingPost,
        loadingPostByUser,
        loadingPostByID,
        loadingDelete,
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
        handleDeletePost,
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
      return post.filter((p) => p.post_id !== action.payload);
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
