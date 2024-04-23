import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home/index.jsx';
import NotFound from './pages/NotFound/index.jsx';
import Login from './pages/Login/index.jsx';
import Register from './pages/Register/index.jsx';
import RoleChoose from './pages/Login/RoleChoose.jsx';
import FormLogin from './pages/Login/FormLogin.jsx';
import DetailPost from './pages/Post/index.jsx';
import Logbook from './pages/Logbook/index.jsx';
import Profile from './pages/Profile/index.jsx';
import CreatePost from './pages/Post/CreatePost/index.jsx';
import LogbookDetail from './pages/Logbook/LogbookDetail/index.jsx';
import Internship from './pages/Internship/index.jsx';
import InternshipActivity from './pages/Internship/InternshipActivity.jsx';
import CreateInternship from './pages/Internship/CreateInternship/index.jsx';
import DetailInternship from './pages/Internship/DetailInternship/index.jsx';
import ReportForm from './pages/Report/Upload/index.jsx';
import Report from './pages/Report/index.jsx';
import DetailReport from './pages/Report/Detail/index.jsx';
import UpdateProfile from './pages/Profile/Update/index.jsx';
import ForgotPassword from './pages/ForgetPassword/index.jsx';
import ResetPassword from './pages/ResetPassword/index.jsx';
import LogbookDosen from './pages/Logbook/Dosen/index.jsx';

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
        path: '/detail-post/:slug',
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
            path: '/kegiatan-magang/detail/:internship_id',
            element: <DetailInternship />,
          },
        ],
      },
      {
        path: '/kegiatan-magang/logbook/:mahasiswa_id/:internship_id',
        element: <Logbook />,
      },
      {
        path: '/kegiatan-magang/logbook/aktivitas/:internship_id/:mahasiswa_id/:logbook_id',
        element: <LogbookDetail />,
      },
      {
        path: '/report',
        element: <Report />,
      },
      {
        path: '/report/upload/:internship_id',
        element: <ReportForm />,
      },
      {
        path: '/report/detail/:report_id',
        element: <DetailReport />,
      },
      {
        path: '/profile/:roleUrl/:slug',
        element: <Profile />,
      },
      {
        path: '/profile/:roleUrl/:slug/edit',
        element: <UpdateProfile />,
      },
      {
        path: '/logbook-mahasiswa',
        element: <LogbookDosen />,
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
  {
    path: '/lupa-password',
    element: <ForgotPassword />,
  },
  {
    path: '/reset-password/:mahasiswa_id/:tokenResetPassword',
    element: <ResetPassword />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(<RouterProvider router={router} />);
