import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home/index.jsx';
import NotFound from './pages/NotFound/index.jsx';
import 'primereact/resources/themes/tailwind-light/theme.css';
import 'primereact/resources/primereact.min.css';
import Login from './pages/Login/index.jsx';
import Register from './pages/Register/index.jsx';
import RoleChoose from './pages/Login/RoleChoose.jsx';
import FormLogin from './pages/Login/FormLogin.jsx';
import DetailPost from './pages/Post/index.jsx';
import Logbook from './pages/Logbook/index.jsx';

import UploadIntern from './pages/UploadIntern/index.jsx';
import Profile from './pages/Profile/index.jsx';
import CreatePost from './pages/Post/CreatePost/index.jsx';
import LogbookDetail from './pages/Logbook/LogbookDetail/index.jsx';
import Internship from './pages/Internship/index.jsx';
import InternshipActivity from './pages/Internship/InternshipActivity.jsx';
import CreateInternship from './pages/Internship/CreateInternship/index.jsx';
import DetailInternship from './pages/Internship/DetailInternship/index.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/detail-post/:id',
        element: <DetailPost />,
      },
      {
        path: '/create-post',
        element: <CreatePost />,
      },
      {
        path: '/kegiatan-magang',
        element: <Internship />,
        children: [
          {
            path: '/kegiatan-magang',
            element: <InternshipActivity />,
          },
          {
            path: '/kegiatan-magang/daftar-magang',
            element: <CreateInternship />,
          },
          {
            path: '/kegiatan-magang/detail/',
            element: <DetailInternship />,
          },
        ],
      },
      {
        path: '/logbook',
        element: <Logbook />,
      },
      {
        path: '/logbook/:date',
        element: <LogbookDetail />,
      },
      {
        path: '/upload-report',
        element: <UploadIntern />,
      },
      {
        path: '/profile/:roleUrl/:id',
        element: <Profile />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
    children: [
      {
        path: '/login',
        element: <RoleChoose />,
      },
      {
        path: '/login/:roleUrl',
        element: <FormLogin />,
      },
    ],
  },
  {
    path: '/register',
    element: <Register />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(<RouterProvider router={router} />);
