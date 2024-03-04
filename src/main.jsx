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
import LogbookDetail from './pages/LogbookDetail/index.jsx';

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
        path: '/detail-post',
        element: <DetailPost />,
      },
      {
        path: '/logbook',
        element: <Logbook />,
      },
      {
        path: '/logbook/:weekParam',
        element: <LogbookDetail />,
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
